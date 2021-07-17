import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import {
  INaturePrestationModePassation,
  NaturePrestationModePassation
} from 'app/shared/model/microserviceppm/nature-prestation-mode-passation.model';
import { NaturePrestationModePassationService } from 'app/entities/microserviceppm/nature-prestation-mode-passation/nature-prestation-mode-passation.service';

import { JhiAlertService, JhiParseLinks } from 'ng-jhipster';

import { Observable } from 'rxjs';

import { ConfirmationService, MessageService } from 'primeng/api';

import { ModePassationService } from 'app/entities/microserviceppm/mode-passation/mode-passation.service';
import { IModePassation, ModePassation } from 'app/shared/model/microserviceppm/mode-passation.model';
import { NaturePrestationService } from 'app/entities/microserviceppm/nature-prestation/nature-prestation.service';
import { INaturePrestation, NaturePrestation } from 'app/shared/model/microserviceppm/nature-prestation.model';

@Component({
  selector: 'jhi-nature-prestation-mode-passation',
  templateUrl: './nature-prestation-mode-passation.component.html',
  styleUrls: ['./nature-prestation-mode-passation.component.scss']
})
export class NaturePrestationModePassationComponent implements OnInit {
  naturePrestationModePassations: INaturePrestationModePassation[];
  naturePrestationModePassationTemp: INaturePrestationModePassation[];
  naturePrestationModePassation: INaturePrestationModePassation;
  naturePrestationModePassation2: INaturePrestationModePassation;
  itemsPerPage: any;
  page: any;
  predicate: any;
  reverse: any;
  links: any;
  totalItems: any;
  display: boolean;
  isSaving: boolean;
  modePassation: IModePassation;
  selectedModePassation: IModePassation;
  naturePrestation: INaturePrestation;
  naturePrestationToDelete: INaturePrestation;
  modePassations: IModePassation[];
  naturePrestations: INaturePrestation[];
  naturePrestationList: INaturePrestation[];
  previousPage: any;
  displayDelete: boolean;
  deteteTexte: string;
  isCollapsedSeuil = true;
  isCollapsedPrestation = true;
  isOverlap: boolean;
  indexToEdit: any;
  index1: any;
  index2: any;
  montantMin: any;
  montantMax: any;
  isUnlimited = false;
  type: string;
  content: string;
  checked = false;
  naturePrestationModePassationSelected: any;

  constructor(
    protected naturePrestationModePassationService: NaturePrestationModePassationService,
    protected parseLinks: JhiParseLinks,
    protected messageService: MessageService,
    protected modePassationService: ModePassationService,
    protected naturePrestationService: NaturePrestationService,
    protected jhiAlertService: JhiAlertService,
    protected router: Router,
    protected confirmationService: ConfirmationService
  ) {}

  loadAll() {
    this.naturePrestationService.findAll().subscribe((res: HttpResponse<INaturePrestation[]>) => {
      this.naturePrestationList =
        res.body; /*
      window.console.log('=================');
      window.console.log(this.naturePrestationList);
      window.console.log('================='); */
    });
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  protected paginateNaturePrestationModePassations(data: INaturePrestationModePassation[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    this.naturePrestationModePassations = data;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INaturePrestation>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.display = false;
    this.message('myKey1', 'success', 'Ajout/Modification', 'Votre ligne a été enregistré avec succès');
    this.loadAll();
  }

  message(cle: string, severite: string, resume: string, detaille: string) {
    this.messageService.add({ key: cle, severity: severite, summary: resume, detail: detaille });
  }

  protected onSaveError() {
    this.isSaving = false;
    this.message(
      'myKey2',
      'error',
      "Erreur d'ajout de la ligne ",
      'Nous avons pas pu enregistrer votre ligne  ' + this.naturePrestationModePassation.montantMin
    );
  }

  add(naturePrestationModePassation: INaturePrestationModePassation) {
    this.display = true;
    this.isSaving = true;
    if (naturePrestationModePassation === null) {
      this.naturePrestationModePassation = new NaturePrestationModePassation();
    } else {
      this.naturePrestationModePassation = naturePrestationModePassation;

      this.modePassation = this.modePassations.find(u => u.id === naturePrestationModePassation.modePassationId);
      this.naturePrestation = this.naturePrestations.find(e => e.id === naturePrestationModePassation.naturePrestationId);
    }
  }
  init() {
    this.naturePrestationModePassationTemp = [];
    this.modePassations = [];
    this.naturePrestations = [];
    this.modePassation = new ModePassation();
    this.selectedModePassation = new ModePassation();
    this.naturePrestation = new NaturePrestation();
    this.naturePrestationModePassation = new NaturePrestationModePassation();
    this.modePassationService
      .query()
      .subscribe(
        (res: HttpResponse<IModePassation[]>) => (this.modePassations = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );

    this.naturePrestationService
      .query()
      .subscribe(
        (res: HttpResponse<INaturePrestation[]>) => (this.naturePrestations = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  annuler() {
    this.display = false;
    this.naturePrestation = new NaturePrestation();
    this.naturePrestationModePassation = new NaturePrestationModePassation();
    this.naturePrestationModePassation2 = new NaturePrestationModePassation();
    this.naturePrestationModePassationTemp = [];
    this.modePassation = new ModePassation();
    this.naturePrestation = new NaturePrestation();
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  ngOnInit() {
    this.displayDelete = false;
    this.loadAll();
    this.init();
  }

  transition() {
    this.router.navigate(['/naturePrestationModePassation'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    });
    this.loadAll();
  }

  annulerDel() {
    this.naturePrestationToDelete = new NaturePrestation();
    this.displayDelete = false;
  }

  supprimer(data) {
    this.displayDelete = true;
    this.naturePrestationToDelete = data;
  }

  deleteElement(prestationModePassation: INaturePrestation) {
    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Etes-vous sûr de vouloir supprimer ?',
      accept: () => {
        if (prestationModePassation === null) {
          return;
        } else {
          prestationModePassation.deleted = true;
          this.naturePrestationService.update(prestationModePassation).subscribe(
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
  showMessage(sever: string, sum: string, det: string) {
    this.messageService.add({
      severity: sever,
      summary: sum,
      detail: det
    });
  }

  addItem() {
    if(this.selectedModePassation.id!==undefined){
      this.indexToEdit = this.naturePrestationModePassationTemp.indexOf(this.naturePrestationModePassation);
      this.naturePrestationModePassationTemp.sort((a, b) => (a.montantMin > b.montantMin ? 1 : -1));
      if (this.indexToEdit === -1 || this.indexToEdit === undefined) {
        this.addLigne();
      } else {
        this.modifierLigne(this.naturePrestationModePassation);
      }
      this.selectedModePassation = new ModePassation();
    }else {
      this.message('myKey3', 'error', 'Enregistrement', 'Veuillez sélectionner un mode de passation !');
    }
  }

  addLigne() {
    if (
      !this.naturePrestationModePassationIsOverlap(
        this.naturePrestationModePassation.montantMin,
        this.naturePrestationModePassation.montantMax,
        this.naturePrestationModePassationTemp
      )
    ) {
      if (!this.isExistModePrestation(this.selectedModePassation.id)) {
        if (this.naturePrestationModePassation.montantMin < this.naturePrestationModePassation.montantMax) {
          this.naturePrestationModePassation.modePassation = this.selectedModePassation;
          this.naturePrestationModePassation.modePassationId = this.selectedModePassation.id;
          this.naturePrestationModePassationTemp.push(this.naturePrestationModePassation);
          this.naturePrestationModePassation = new NaturePrestationModePassation();
          this.modePassation = new ModePassation();
          // this.naturePrestation = new NaturePrestation();
        } else if (
          this.naturePrestationModePassation.montantMax === -1 &&
          this.naturePrestationModePassation.montantMax !== this.naturePrestationModePassation.montantMin
        ) {
          this.naturePrestationModePassation.modePassation = this.selectedModePassation;
          this.naturePrestationModePassation.modePassationId = this.selectedModePassation.id;
          this.naturePrestationModePassationTemp.push(this.naturePrestationModePassation);
          this.naturePrestationModePassation = new NaturePrestationModePassation();
          this.modePassation = new ModePassation();
        }  else {
          if (this.naturePrestationModePassation.montantMax === undefined && this.naturePrestationModePassation.montantMin === undefined) {
            this.naturePrestationModePassation.modePassation = this.selectedModePassation;
            this.naturePrestationModePassation.modePassationId = this.selectedModePassation.id;
            this.naturePrestationModePassation.montantMax = 0;
            this.naturePrestationModePassation.montantMin = 0;
            this.naturePrestationModePassationTemp.push(this.naturePrestationModePassation);
            this.naturePrestationModePassation = new NaturePrestationModePassation();
            this.modePassation = new ModePassation();
          } else{
            this.message('myKey3', 'error', 'Incohérence', 'Le montant maximum doit être supérieur au montant minimum !');
          }
        }
      } else {
        this.message(
          'myKey3',
          'error',
          'Doublon de mode de passation',
          'Le mode de passation que vous avez choisi existe déjà pour cette nature de prestation!'
        );
      }
    } else {
      this.message('myKey3', 'error', 'Chevauchement des intervalles', 'Revoyez vos intervalles car certains se chevauchent!');
    }
  }

  modifierLigne(nature: INaturePrestationModePassation) {
    this.naturePrestationModePassationTemp.sort((a, b) => (a.montantMin > b.montantMin ? 1 : -1));

    if (
      this.isChevauche(
        this.naturePrestationModePassation,
        this.naturePrestationModePassationTemp[this.indexToEdit - 1],
        this.naturePrestationModePassationTemp[this.indexToEdit + 1]
      )
    ) {
      this.naturePrestationModePassation.montantMax = this.montantMax;
      this.naturePrestationModePassation.montantMin = this.montantMin;
      this.message('myKey3', 'error', 'Chevauchement des intervalles', 'Revoyez vos intervalles car certains se chevauchent!');
    } else {
      if (!this.isExistModePrestation(this.selectedModePassation.id)) {
        if (this.naturePrestationModePassation.montantMin < this.naturePrestationModePassation.montantMax) {
          nature.montantMin = this.naturePrestationModePassation.montantMin;
          nature.montantMax = this.naturePrestationModePassation.montantMax;
          nature.modePassation = this.selectedModePassation;
          nature.modePassationId = this.selectedModePassation.id;
          this.naturePrestationModePassation = new NaturePrestationModePassation();
          this.modePassation = new ModePassation();
        } else if (
          this.naturePrestationModePassation.montantMax === -1 &&
          this.naturePrestationModePassation.montantMax !== this.naturePrestationModePassation.montantMin
        ) {
          nature.montantMin = this.naturePrestationModePassation.montantMin;
          nature.montantMax = this.naturePrestationModePassation.montantMax;
          nature.modePassation = this.selectedModePassation;
          nature.modePassationId = this.selectedModePassation.id;
          this.naturePrestationModePassation = new NaturePrestationModePassation();
          this.modePassation = new ModePassation();
        } else {
          this.message('myKey3', 'error', 'Incohérence', 'Le montant maximum doit être supérieur au montant minimum !');
        }
      } else {
        this.message(
          'myKey3',
          'error',
          'Doublon de mode de passation',
          'Le mode de passation que vous avez choisi existe déjà pour cette nature de prestation!'
        );
      }
    }
  }

  clickModifier(nature: INaturePrestationModePassation) {
    // this.naturePrestationModePassationTemp.sort((a, b) => (a.montantMin > b.montantMin) ? 1 : -1);
    this.naturePrestationModePassation = nature;
    this.montantMax = this.naturePrestationModePassation.montantMax;
    this.montantMin = this.naturePrestationModePassation.montantMin;
    this.naturePrestationModePassation2 = nature;
    this.selectedModePassation.id = nature.modePassationId;
    if (this.naturePrestationModePassation.montantMax === -1) {
      this.isUnlimited = true;
    }
    this.modePassationService
      .find(this.selectedModePassation.id)
      .subscribe(
        (res: HttpResponse<IModePassation>) => (this.selectedModePassation = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    // this.indexToEdit = this.naturePrestationModePassationTemp.indexOf(nature);
    // alert(this.indexToEdit + 1);
    if (this.montantMax === -1) {
      this.isUnlimited = true;
      this.checked = true;
    } else {
      this.isUnlimited = false;
    }
    this.naturePrestationModePassationTemp = this.naturePrestationModePassationTemp.filter(npmp => npmp.id !== nature.id);
  }

  deleteItem(i: any) {
    this.naturePrestationModePassationTemp.splice(i, 1);
  }

  supprimerElement() {
    this.naturePrestationService.delete(this.naturePrestationToDelete).subscribe(
      () => {
        this.loadAll();
        this.displayDelete = false;
      },
      () => this.message('myKey3', 'error', 'SUPPRESSION', 'Echec de la suppression !')
    );
  }

  update(data) {
    this.naturePrestation = data;
    this.naturePrestationModePassationTemp = this.naturePrestation.naturePrestationModePassations;
    this.naturePrestationModePassationTemp.sort((a, b) => (a.montantMin > b.montantMin ? 1 : -1));
    this.display = true;
  }

  saveNaturePrestation() {
    this.naturePrestation.naturePrestationModePassations = this.naturePrestationModePassationTemp;
    window.console.log(this.naturePrestation);
    if (!this.ifExist()) {
      this.isSaving = true;
      if (this.naturePrestation.id !== undefined) {
        this.subscribeToSaveResponse(this.naturePrestationService.update(this.naturePrestation));
      } else {
        this.subscribeToSaveResponse(this.naturePrestationService.create(this.naturePrestation));
      }
      this.naturePrestationModePassationTemp = [];
    } else {
      this.showMessage('error', 'ENREGISTREMENT', 'La nature de prestation existe déjà !');
    }
  }

  selectMode() {
    this.modePassationService
      .find(this.selectedModePassation.id)
      .subscribe(
        (res: HttpResponse<IModePassation>) => (this.selectedModePassation = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ifExist(): boolean {
    if (this.naturePrestation.id) {
      return this.naturePrestations.some(value => value.id !== this.naturePrestation.id && value.libelle === this.naturePrestation.libelle);
    } else {
      return this.naturePrestations.some(value => value.libelle === this.naturePrestation.libelle);
    }
  }

  naturePrestationModePassationIsOverlap(montantMin: any, montantMax: any, natureModeList: INaturePrestationModePassation[]): boolean {
    this.isOverlap = false;
    let droite = null;
    let gauche = null;
    if (natureModeList.length !== 0 && (montantMin !== null && montantMax !== null)) {
      for (let i = 0; i < natureModeList.length; i++) {
        if (montantMin < natureModeList[i].montantMin) gauche = natureModeList[i].montantMin;
        else gauche = montantMin;

        if (montantMax < natureModeList[i].montantMax) droite = montantMax;
        else droite = natureModeList[i].montantMax;

        if (gauche < droite) {
          this.isOverlap = true;
          break;
        }
      }
    }
    return this.isOverlap;
  }

  isChevauche(
    nature1: INaturePrestationModePassation,
    nature2: INaturePrestationModePassation,
    nature3: INaturePrestationModePassation
  ): boolean {
    let chevauche = false;
    this.index1 = this.naturePrestationModePassationTemp.indexOf(nature2);
    this.index2 = this.naturePrestationModePassationTemp.indexOf(nature3);
    if (nature1.montantMax !== -1) {
      if (this.index1 !== -1 && this.index2 !== -1) {
        if (nature1.montantMin < nature2.montantMax || nature1.montantMax > nature3.montantMin) chevauche = true;
      } else if (this.index1 === -1 && this.index2 !== -1) {
        if (nature1.montantMax > nature3.montantMax) chevauche = true;
      } else if (this.index1 !== -1 && this.index2 === -1) {
        if (nature1.montantMax < nature2.montantMin) chevauche = true;
      }
    }
    return chevauche;
  }

  isExistModePrestation(id: any): boolean {
    let exist = false;
    for (let i = 0; i < this.naturePrestationModePassationTemp.length; i++) {
      if (id === this.naturePrestationModePassationTemp[i].modePassationId) {
        exist = true;
        break;
      }
    }
    return exist;
  }

  changeType() {
    this.isUnlimited = !this.isUnlimited;
    this.naturePrestationModePassation.montantMax = -1;
  }

  save() {}
}
