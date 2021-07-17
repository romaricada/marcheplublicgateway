import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JhiAlertService, JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { Entrepot, IEntrepot } from 'app/shared/model/microserviceged/entrepot.model';
import { EntrepotService } from './entrepot.service';
import { TypeEntrepotService } from "app/entities/microserviceged/type-entrepot/type-entrepot.service";
import { ITypeEntrepot, TypeEntrepot } from "app/shared/model/microserviceged/type-entrepot.model";
import { ILocale, Locale } from "app/shared/model/microserviceged/locale.model";
import { LocaleService } from "app/entities/microserviceged/locale/locale.service";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import {ConfirmationService, MessageService} from "primeng/api";
@Component({
  selector: 'jhi-entrepot',
  templateUrl: './entrepot.component.html'
})
export class EntrepotComponent implements OnInit {
  entrepots: IEntrepot[]=[];
  entrepot: IEntrepot;

  entrepotSelect: IEntrepot[];
  entrepotFils: IEntrepot[];
  display: boolean;
  plusT: boolean;
  isAddingType: boolean;
  plusL: boolean;
  isAddingLocal: boolean;

  typeEntrepot: ITypeEntrepot;
  typeEntrepots: ITypeEntrepot[] = [];
  typeEntrepotFils: ITypeEntrepot;
  typeFils: ITypeEntrepot;

  locale: ILocale;
  locales: ILocale[];

  plusF: boolean;

  disab: boolean;
  displayDelete: boolean;
  ifAddFils: boolean;
  entrepotParents: IEntrepot[] = [];
  isAddingFils: boolean;
  filsEntrepot: IEntrepot;

  constructor(
    protected entrepotService: EntrepotService,
    protected parseLinks: JhiParseLinks,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected typeEntrepotService: TypeEntrepotService,
    protected localeService: LocaleService,
    protected jhiAlertService: JhiAlertService,
    protected messageService: MessageService,
    protected confirmationService: ConfirmationService
  ) { }

  loadAll() {
    this.entrepotService
      .findAllWithoutPage()
      .subscribe((res: HttpResponse<IEntrepot[]>) => {
        this.entrepots = res.body;
      });
  }

  loadTypeEntrepot() {
    this.typeEntrepotService
      .query()
      .subscribe((res: HttpResponse<ITypeEntrepot[]>) => (this.typeEntrepots = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  loadLocal() {
    this.localeService
      .query()
      .subscribe((res: HttpResponse<ILocale[]>) => this.locales = res.body);
  }

  ngOnInit() {
    this.loadAll();
    this.entrepotSelect = [];
    this.entrepotFils = [];
    this.entrepot = new Entrepot();
    this.filsEntrepot = new Entrepot();
    this.entrepot.entrepots = [];
    this.display = false;
    this.displayDelete = false;

    this.plusT = false;
    this.plusL = false;
    this.isAddingLocal = false;
    this.isAddingType = false;
    this.isAddingFils = false;

    this.typeEntrepot = new TypeEntrepot();
    this.typeEntrepotFils = new TypeEntrepot();
    this.locale = new Locale();

    this.plusF = false;
    this.ifAddFils = false;

    this.loadTypeEntrepot();
    this.loadLocal();
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  add() {
    this.entrepot = new Entrepot();
    this.entrepot.entrepots = [];
    this.typeEntrepotFils = new TypeEntrepot();
    this.typeEntrepot = new TypeEntrepot();
    this.locale = new Locale();
    if (TypeEntrepot.length + 1 !== null) { this.plusT = false; }
    this.display = true;
    this.disab = true;
  }

  modif(entrep: IEntrepot) {
    if (entrep) {
      this.entrepot = new Entrepot();
      this.typeEntrepot = new TypeEntrepot();
      this.entrepot = entrep;
      this.typeEntrepot = this.typeEntrepots.find(value => value.id === entrep.typeEntrepotId);
      this.locale = this.locales.find(value => value.id === entrep.localId);
      this.getParentListe();
      this.typeEntrepotFils = this.typeEntrepots.find(value => value.ordre === this.typeEntrepot.ordre + 1);
      if (!this.typeEntrepotFils) {
        this.typeEntrepotFils = new TypeEntrepot();
      }
      this.ifAddFils = this.entrepot.entrepots.length > 0;
      this.display = true;
    }
  }


  deleteElement(entrepot: IEntrepot) {
    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Etes-vous sûr de vouloir supprimer ?',
      accept: () => {
        if (entrepot === null) {
          return;
        } else {
          entrepot.deleted = true;
          this.entrepotService.update(entrepot).subscribe(
            () => {
              this.loadAll();
              this.showMessage1('success', 'SUPPRESSION', 'Suppression effectuée avec succès !');
            },
            () => this.showMessage1('error', 'SUPPRESSION', 'Echec de la suppression !')
          );
        }
      }
    });
  }
  showMessage1(sever: string, sum: string, det: string) {
    this.messageService.add({
      severity: sever,
      summary: sum,
      detail: det
    });
  }

  showMessage(sever: string, sum: string, det: string, mkey: string) {
    this.messageService.add({
      severity: sever,
      summary: sum,
      detail: det,
      key: mkey
    });
  }

  annuler() {
    this.entrepot = new Entrepot();
    this.entrepot.entrepots = [];
    this.display = false;
  }

  verif() {
    /* entrepoList  = this.entrepot.entrepots.filter(value => value.libelle.toString().indexOf(entrepo.libelle.toString()) === 0);
    if (entrepoList.length > 0) {
      this.showMessage('error', 'AJOUT DE SOUS ENTREPOT', 'Un entrepot avec le même nom existe déjà !', '2');
      entrepo.libelle = undefined;
    } */
  }

  save() {
    this.entrepot.typeEntrepot = this.typeEntrepot;
    this.entrepot.local = this.locale;
    this.entrepot.typeEntrepotFils = this.typeEntrepotFils;

    if (!this.ifExist()) {
      if (this.entrepot.id !== undefined) {
        this.subscribeToSaveResponse(this.entrepotService.update(this.entrepot));
      } else {
        this.subscribeToSaveResponse(this.entrepotService.create(this.entrepot));
      }
    } else {
      this.showMessage('warn', 'ENREGISTREMENT', 'Un meme entreprot existe dejat!!!', '1');

    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEntrepot>>) {
    result.subscribe(() => {
      this.showMessage('success', 'ENREGISTREMENT', 'Ligne budgetaire ajouté avec succès!!!', '1');
      this.onSaveSuccess()
    }, () => {
      this.showMessage('error', 'ENREGISTREMENT', "Echec de l'enregistrement!!!", '1');
      this.onSaveError()
    });
  }


  protected onSaveSuccess() {
    this.loadAll();
    this.loadLocal();
    this.loadTypeEntrepot();
    this.display = false;
  }

  protected onSaveError() {
    this.loadAll();
    this.loadLocal();
    this.loadTypeEntrepot();
    this.display = false;
  }

  addFilsEntrepot() {
    this.disab = false;
    if (this.isAddingFils) {
      this.isAddingFils = false;
      if (this.filsEntrepot.libelle !== undefined) {
        this.entrepot.entrepots.push(this.filsEntrepot);
      }
    } else {
      this.filsEntrepot = new Entrepot();
      this.isAddingFils = true;
    }

  }

  addTypeEntrepo() {
    if (this.isAddingType) {
      this.isAddingType = false;
    } else {
      this.typeEntrepot = new TypeEntrepot();
      this.isAddingType = true;
    }
    this.plusT = this.typeEntrepot.libelle !== undefined;
  }

  ifExist(): boolean {
    if (this.entrepot.id !== undefined) {
      return this.entrepots.some(value =>
        value.id !== this.entrepot.id && value.localId === this.entrepot.local.id
        && value.typeEntrepotId === this.entrepot.typeEntrepot.id && value.libelle.includes(this.entrepot.libelle));
    } else {
      return this.entrepots.some(value => value.localId === this.entrepot.local.id
        && value.typeEntrepotId === this.entrepot.typeEntrepot.id && value.libelle.includes(this.entrepot.libelle));
    }
  }

  addLocalite() {
    if (this.isAddingLocal) {
      this.isAddingLocal = false;
    } else {
      this.locale = new Locale();
      this.isAddingLocal = true;
    }
    this.plusL = this.locale.libelle !== undefined && this.locale.adresseLocale !== undefined;
  }

  findByLocal() {
    this.entrepotService.findEntrepotByLocal(this.locale.id).subscribe((res: HttpResponse<IEntrepot[]>) => {
      this.entrepots = res.body;
    });
  }

  findByTypeEntrepotAndLocalite() {
    this.entrepotService.findEntrepotByLocalAndTypeEntrepot(this.locale.id, this.typeEntrepot.id).subscribe((res: HttpResponse<IEntrepot[]>) => {
      this.entrepots = res.body;

    });
  }

  fermer() {
    this.displayDelete = false;
  }

  voir(entrep: IEntrepot) {
    if(entrep !== undefined) {
      this.entrepotService.findEntrposFils(entrep.id).subscribe((res: HttpResponse<IEntrepot[]>) => {
        this.entrepotFils = res.body;
      });
      this.displayDelete = true;
    }
  }

  retirerFils(entrepo: IEntrepot) {
    const indexEntrepo = this.entrepot.entrepots.indexOf(entrepo);
    this.entrepot.entrepots.splice(indexEntrepo, 1);
  }

  onTypeChange() {
    if (this.typeEntrepot.id !== undefined) {
      this.typeFils = new TypeEntrepot();
      this.typeFils = this.typeEntrepots.find(value => value.ordre === this.typeEntrepot.ordre + 1);
      if (this.typeFils) {
        this.typeEntrepotFils = this.typeFils;
      } else {
        this.typeEntrepotFils = new TypeEntrepot();
      }
    }
    this.getParentListe();
  }

  getParentListe() {
    if (this.typeEntrepot.id !== undefined && this.locale.id !== undefined) {
      this.entrepotParents = [];
      const typeParent: IEntrepot = this.typeEntrepots.find(value => value.ordre === this.typeEntrepot.ordre - 1);
      if (typeParent) {
        this.entrepotService.findEntrepotByLocalAndTypeEntrepot(this.locale.id, typeParent.id)
          .subscribe((res: HttpResponse<IEntrepot[]>) => {
            this.entrepotParents = res.body;
          });
      }
    }
  }


}
