import { Component, OnDestroy, OnInit } from '@angular/core';
import { IProfil, Profil } from 'app/shared/model/geteway/profil.model';
import { Subscription } from 'rxjs';
import { ProfilService } from 'app/admin/profil/profil.service';
import { JhiEventManager } from 'ng-jhipster';
import { AccountService } from 'app/core/auth/account.service';
import { UserService } from 'app/core/user/user.service';
import {ConfirmationService, MessageService, SelectItem} from 'primeng/api';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'jhi-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit, OnDestroy {
  myRoles: any[];
  profils: IProfil[];
  profil: IProfil;
  authorities: any[];
  currentAccount: any;
  eventSubscriber: Subscription;
  display: boolean;
  modules: Array<SelectItem>;
  authoritiesCopy: any[];

  constructor(
    protected profilService: ProfilService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService,
    protected userService: UserService,
    protected confirmationService: ConfirmationService,
    protected messageService: MessageService,
    protected modalService: NgbModal
  ) {}

  loadAll() {
    this.profilService
      .query()
      .pipe(
        filter((res: HttpResponse<IProfil[]>) => res.ok),
        map((res: HttpResponse<IProfil[]>) => res.body)
      )
      .subscribe((res: IProfil[]) => {
        this.profils = res;
      });
  }

  ngOnInit() {
    this.myRoles = [];
    this.modules = [];
    const table= [
      {label: 'Administration', value: 'x_01'},
      {label: 'Paramètre', value: 'PARAM'},
      {label: 'PPM', value: 'PPM'},
      {label: 'Planification', value: 'PLANIF'},
      {label: 'DAC', value: 'DAC'},
      {label: 'Commission d\'attribution de marché', value: 'CAM'},
      {label: 'Exécution', value: 'EXECU'},
      {label: 'Archive ', value: 'GED'}
    ]
    table.forEach(value => this.modules.push(value));
    this.eventManager.broadcast({
      name: 'endpointChanged',
      content: 'User switch to portail !'
    });
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.authorities = [];
    this.profil = new Profil();
    this.userService.getAllAuthorities().subscribe(authorities => {
      this.authorities = authorities;
      this.authoritiesCopy = authorities;
    });
    this.registerChangeInProfils();
  }

  showMessage(severity: string, summary: string, detail: string) {
    this.messageService.add({ severity, summary, detail });
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IProfil) {
    return item.id;
  }

  registerChangeInProfils() {
    this.eventSubscriber = this.eventManager.subscribe('profilListModification', () => this.loadAll());
  }

  annuler() {
    this.profil = new Profil();
    this.display = false;
  }

  save() {
    if (!this.checkIfAlreadyExist()) {
      if (this.profil.id) {
        this.profilService.update(this.profil).subscribe(
          () => {
            this.loadAll();
            this.annuler();
            this.showMessage('success', 'MODIFICATION', 'Mise à jour effectuée avec succès !');
          },
          () => this.showMessage('error', 'MODIFICATION', 'Echec de la mise à jour !')
        );
      } else {
        this.profilService.create(this.profil).subscribe(
          () => {
            this.loadAll();
            this.annuler();
            this.showMessage('success', 'ENREGISTREMENT', 'Ajout effectué avec succès !');
          },
          () => this.showMessage('error', 'ENREGISTREMENT', "Echec de l'ajout !")
        );
      }
    } else {
      this.showMessage('error', 'ENREGISTREMENT', 'Un profil de même nom existe déjà !');
    }
  }

  checkIfAlreadyExist(): boolean {
    if (this.profil.id) {
      return this.profils.some(
        value => value.id !== this.profil.id && value.profilName.toLowerCase() === this.profil.profilName.toLowerCase()
      );
    } else {
      return this.profils.some(value => value.profilName.toLowerCase() === this.profil.profilName.toLowerCase());
    }
  }

  deleteProfil(profil: IProfil) {
    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Etes-vous sûr de vouloir supprimer ?',
      accept: () => {
        if (profil === null) {
          return;
        } else {
          this.profilService.delete(profil.id).subscribe(
            () => {
              this.loadAll();
              this.showMessage('success', 'SUPPRESSION', 'Suppression effectuée avec succès !');
            },
            () => this.showMessage('error', 'SUPPRESSION', 'Echec de la suppression !')
          );
        }
      }
    });
  }

  view(rowData: IProfil) {
    this.profil = rowData;
    this.display = true;
    /*
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static', keyboard: false });
    */
  }

  onModulesChange(value: string) {
    if (value) {
      this.authorities = this.authoritiesCopy.filter(value1 => value1.prefix === value);
    } else {
      this.authorities = this.authoritiesCopy;
    }
  }
}
