import {Component, OnInit, OnDestroy} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {JhiEventManager, JhiParseLinks} from 'ng-jhipster';
import {Engagement, IEngagement} from "app/shared/model/microserviceexecution/engagement.model";
import {Contrat, IContrat} from "app/shared/model/microserviceexecution/contrat.model";
import {ILigneBudgetaire, LigneBudgetaire} from "app/shared/model/microserviceppm/ligne-budgetaire.model";
import {ContratService} from "app/entities/microserviceexecution/contrat/contrat.service";
import {ExerciceBudgetaire, IExerciceBudgetaire} from "app/shared/model/microserviceppm/exercice-budgetaire.model";
import {
    BesoinLigneBudgetaire,
    IBesoinLigneBudgetaire
} from "app/shared/model/microserviceppm/besoin-ligne-budgetaire.model";
import {BesoinLigneBudgetaireService} from "app/entities/microserviceppm/besoin-ligne-budgetaire/besoin-ligne-budgetaire.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {select, Store} from "@ngrx/store";
import {selectetExerciceCourant} from "app/store/selector";
import {takeUntil} from "rxjs/operators";
import {IAvisDac} from "app/shared/model/microservicedaccam/avis-dac.model";
import {State} from "src/main/webapp/app/store/reducers";
import {Subject} from "rxjs";
import {AvisDacService} from "app/entities/microservicedaccam/avis-dac/avis-dac.service";
import {ILigneBudgetaireEngagement} from "app/shared/model/microserviceexecution/ligneBudgetaireEngagement.model";
import {getLigneCredit, montantDjaEngager, setMontantEngager} from 'app/shared/util/common-function';
import {ILigneBudgetaireContrat} from 'app/shared/model/microserviceexecution/ligne-budgetaire-contrat.model';
import {WordFlow} from 'app/shared/model/microserviceexecution/word-flow';
import {messageWordFlow} from 'app/shared/util/message-wordflow';
import {EngagementService} from 'app/entities/microserviceexecution/engagement/engagement.service';

@Component({
    selector: 'jhi-controle-cf-engagement',
    templateUrl: './controle-engagement.component.html',
    styleUrls: ['./controle-engagement.scss']
})
export class ControleEngagementComponent implements OnInit, OnDestroy {
    engagement: IEngagement;
    engagements: IEngagement[];
    engagementsToTransfert: IEngagement[];
    contrats: IContrat[];
    contrat: IContrat;
    isSaving: boolean;
    ligneBudget: ILigneBudgetaire;
    besoinLigneBudgetaire: IBesoinLigneBudgetaire;
    besoinLigneBudgetaires: ILigneBudgetaireContrat[];
    besoins: ILigneBudgetaire[];
    exercice: IExerciceBudgetaire;
    exercices: IExerciceBudgetaire[];
    ligneBudgetaires: ILigneBudgetaire[];
    display: boolean;
    destroy$: Subject<boolean> = new Subject<boolean>();
    avisDacs: IAvisDac[];
    avisDac: IAvisDac;
    ligneBudgetaireEngagement: ILigneBudgetaireEngagement;
    ligneBudgetaireId: number;
    ligneSelect: ILigneBudgetaireContrat;


    constructor(
        protected engagementService: EngagementService,
        protected besoinLigneBudgetaireService: BesoinLigneBudgetaireService,
        protected contratService: ContratService,
        protected parseLinks: JhiParseLinks,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        protected eventManager: JhiEventManager,
        protected confirmationService: ConfirmationService,
        protected messageService: MessageService,
        protected store: Store<State>,
        protected avisDacService: AvisDacService,
    ) {
    }

    ngOnInit() {
        this.display = false;
        this.ligneBudgetaireEngagement = new LigneBudgetaire();
        this.engagement = new Engagement();
        this.engagements = [];
        this.engagementsToTransfert = [];
        this.contrats = [];
        this.contrat = new Contrat();
        this.ligneBudget = new LigneBudgetaire();

        this.besoinLigneBudgetaire = new BesoinLigneBudgetaire();
        this.besoinLigneBudgetaires = [];
        this.exercice = new ExerciceBudgetaire();
        this.exercices = [];
        this.ligneBudgetaires = [];

        this.store.pipe(select(selectetExerciceCourant)).pipe(takeUntil(this.destroy$))
            .subscribe(exercice => {
                if (exercice) {
                    this.exercice = exercice;
                    this.actualisation();
                    this.avisDacService.findListAvisDacByExercice(this.exercice.id).pipe(takeUntil(this.destroy$))
                        .subscribe((res: HttpResponse<IAvisDac[]>) => {
                            if (res.body) {
                                res.body.forEach(value => {
                                    value.nomAvisDac = value.numeroAvis + '/' + value.objet;
                                });
                                this.avisDacs = res.body;
                            }
                        });

                }
            });
    }

    actualisation() {
        this.contrats = [];
    }

    ngOnDestroy() {
        // this.eventManager.destroy(this.eventSubscriber);
    }

    annuler() {
        this.display = false;
    }

    onAvisChange() {
        if (this.avisDac) {
            this.contratService
                .findAllContratByAvisDac(this.avisDac.id)
                .subscribe((res: HttpResponse<IContrat[]>) => {
                    this.contrats = res.body;
                });
        }
    }

    onContratChange() {
        this.besoinLigneBudgetaireService.findAllBesoinLigneBudgetaireByActivite(this.avisDac.activiteId)
            .pipe(takeUntil(this.destroy$))
            .subscribe(res => {
                if (res.body) {
                    this.besoinLigneBudgetaires = getLigneCredit(res.body, this.contrat.ligneBudgetaireContrats);
                }
            });
        this.loadEngagement();
    }

    loadEngagement() {
        this.engagementService.findAllBycontrat(this.contrat.id).subscribe(res => {
            if (res.body) {
                res.body.forEach(v => {
                    v.label = messageWordFlow(v.wordFlow);
                });
                this.engagements = res.body.filter(v => v.wordFlow === WordFlow.VISA_CONTROLEUR);
            }
        });
    }


   /* save() {
        if (this.ligneSelect.montantEngage > this.ligneSelect.montantEngage) {
            this.showMessage('warn', 'Erreur', 'Veuillez vérifier le montant saisie');
        } else {
            this.engagement.montantEngage = this.ligneSelect.montantEngage;
            this.engagement.ligneBudgetaireContratId = this.ligneSelect.id;
            this.engagement.avisDacId = this.avisDac.id;
            this.engagement.contratId = this.contrat.id;
            this.engagement.wordFlow = WordFlow.ENGAGEMENT;


            if (this.engagement.id !== undefined) {
                this.engagementService.update(this.engagement).subscribe(() => {
                        this.display = false;
                        this.isSaving = false;
                        this.message(true);
                        this.loadEngagement();
                    }, () => {
                        this.message(false);
                    }
                );
            } else {
                this.engagementService.create(this.engagement).subscribe(() => {
                        this.display = false;
                        this.isSaving = false;
                        this.message(true);
                        this.loadEngagement();
                    }, () => {
                        this.message(false);
                    }
                );
            }
        }
    }
*/

    showMessage(sever: string, sum: string, det: string) {
        this.messageService.add({
            severity: sever,
            summary: sum,
            detail: det,
            key: "1"
        });
    }

    modif(engagement: IEngagement) {
        this.engagement = engagement;
        this.besoinLigneBudgetaires = setMontantEngager(engagement, this.besoinLigneBudgetaires);
        this.besoinLigneBudgetaires = montantDjaEngager(this.besoinLigneBudgetaires, this.engagements);
        this.besoinLigneBudgetaires.forEach(v => {
            v.totalDisponible = (v.montantEstime - v.totalEngage);
        });
        this.ligneSelect = this.besoinLigneBudgetaires.filter(v => v.selected)[0];
        this.display = true;
    }

    sendToOrdonnateur() {
        this.confirmationService.confirm({
            header: 'Confirmation',
            message: 'Etes-vous sûr de Transférer ?',
            accept: () => {
                this.engagementsToTransfert.forEach(v => {
                    v.wordFlow = WordFlow.VISA_ORDONNATEUR;
                });
                this.engagementService.saveList(this.engagementsToTransfert).subscribe(() => {
                    this.message(true);
                    this.loadEngagement();
                }, () => {
                    this.message(true);
                });
            }
        });
    }

    onRetrograde() {
        this.confirmationService.confirm({
            header: 'Confirmation',
            message: 'Etes-vous sûr de Rétrograder ?',
            accept: () => {
                this.engagementsToTransfert.forEach(v => {
                    v.wordFlow = WordFlow.REJETER;
                });
                this.engagementService.saveList(this.engagementsToTransfert).subscribe(() => {
                    this.message(true);
                    this.loadEngagement();
                }, () => {
                    this.message(false);
                });
            }
        });
    }

    message(ok: boolean) {
        if (ok) {
            this.showMessage('success', '', 'Opération effectuée avec succès');
        } else {
            this.showMessage('warn', '', 'Echèc de l\'opération');
        }
    }
}
