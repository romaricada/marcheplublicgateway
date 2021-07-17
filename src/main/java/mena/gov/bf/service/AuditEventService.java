package mena.gov.bf.service;

import io.github.jhipster.config.JHipsterProperties;
import mena.gov.bf.config.audit.AuditEventConverter;


import mena.gov.bf.domain.User;
import mena.gov.bf.repository.PersistenceAuditEventRepository;
import mena.gov.bf.repository.UserRepository;

import mena.gov.bf.service.dto.UserDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.actuate.audit.AuditEvent;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service for managing audit events.
 * <p>
 * This is the default implementation to support SpringBoot Actuator {@code AuditEventRepository}.
 */
@Service
@Transactional
public class AuditEventService {

    private final Logger log = LoggerFactory.getLogger(AuditEventService.class);

    private final JHipsterProperties jHipsterProperties;
    @Autowired
    private final UserRepository userRepository;

    private final PersistenceAuditEventRepository persistenceAuditEventRepository;

    private final AuditEventConverter auditEventConverter;

    public AuditEventService(
        PersistenceAuditEventRepository persistenceAuditEventRepository,
        AuditEventConverter auditEventConverter, JHipsterProperties jhipsterProperties, UserRepository userRepository) {

        this.persistenceAuditEventRepository = persistenceAuditEventRepository;
        this.auditEventConverter = auditEventConverter;
        this.jHipsterProperties = jhipsterProperties;

        this.userRepository = userRepository;
    }

    /**
     * Old audit events should be automatically deleted after 30 days.
     *
     * This is scheduled to get fired at 12:00 (am).
     */
    @Scheduled(cron = "0 0 12 * * ?")
    public void removeOldAuditEvents() {
        persistenceAuditEventRepository
            .findByAuditEventDateBefore(Instant.now().minus(jHipsterProperties.getAuditEvents().getRetentionPeriod(), ChronoUnit.DAYS))
            .forEach(auditEvent -> {
                log.debug("Deleting audit data {}", auditEvent);
                persistenceAuditEventRepository.delete(auditEvent);
            });
    }

    public Page<AuditEvent> findAll(Pageable pageable) {
        return persistenceAuditEventRepository.findAll(pageable)
            .map(auditEventConverter::convertToAuditEvent);
    }

    public Page<AuditEvent> findByDates(Instant fromDate, Instant toDate, Pageable pageable) {
        return persistenceAuditEventRepository.findAllByAuditEventDateBetween(fromDate, toDate, pageable)
            .map(auditEventConverter::convertToAuditEvent);
    }
    /* public List<User> findUser(String login) {
           List<User> users = (userRepository.findAll().stream().
             filter(user -> user.getLogin().equals(login)).collect(Collectors.toList()));
           return users;
     }*/
    public List<AuditEvent> findByUser(String principal) {
        List<AuditEvent> auditEvents=  persistenceAuditEventRepository.findAll().stream().map(auditEventConverter::convertToAuditEvent)
            .filter(persistentAuditEvent -> persistentAuditEvent.getPrincipal().equals(principal))
            .collect(Collectors.toList());
        return auditEvents;
    }

    public List<AuditEvent> findByStatus(String type) {
        List<AuditEvent> auditEvents=  persistenceAuditEventRepository.findAll().stream().map(auditEventConverter::convertToAuditEvent)
            .filter(persistentAuditEvent -> persistentAuditEvent.getType().equals(type))
            .collect(Collectors.toList());
        return auditEvents;
    }

    public Optional<AuditEvent> find(Long id) {
        return persistenceAuditEventRepository.findById(id)
            .map(auditEventConverter::convertToAuditEvent);
    }
}
