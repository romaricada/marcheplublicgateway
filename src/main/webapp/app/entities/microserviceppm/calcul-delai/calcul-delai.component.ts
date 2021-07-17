import { Component, OnInit } from '@angular/core';
import { HttpResponse} from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';

import { CalculDelaiService } from './calcul-delai.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import {CalculDelai, ICalculDelai} from 'app/shared/model/microserviceppm/calcul-delai.model';
import {IEtape} from 'app/shared/model/microserviceppm/etape.model';
import {ReferentielDelaiService} from 'app/entities/microserviceppm/referentiel-delai/referentiel-delai.service';
import {IModePassation, ModePassation} from 'app/shared/model/microserviceppm/mode-passation.model';
import {ModePassationService} from 'app/entities/microserviceppm/mode-passation/mode-passation.service';

@Component({
  selector: 'jhi-calcul-delai',
  templateUrl: './calcul-delai.component.html',
  styleUrls: ['./calcul-delai.component.scss']
})
export class CalculDelaiComponent implements OnInit {
  calculDelais: ICalculDelai[] = [];
  calculDelaiSelected: ICalculDelai[] = [];
  display: Boolean;
  displayDelete: boolean;
  isSaving: Boolean;
  modePassation: IModePassation;
  modePassations: IModePassation[] = [];
  etapes: IEtape[];
  etape: IEtape;
  mot: string;
  etapeSelecteds: IEtape[];
  dateCalcules = [
    { value: 'DATEBUTOIRE', libelle: 'DATE BUTOIRE'},
    {value: 'DATEPROBABLEDEMARAGEPRESTATIONS', libelle: 'DATE PROBABLE DE DEMARAGE DES PRESTATIONS'},
    {value: 'PERIODELANCEMENTAPPELCONCURENCE', libelle: 'PERIODE DE LANCEMENT DE L\'APPEL À CONCURENCE'},
    {value: 'TEMPSNECESSAIREEVALUATIONOFFRES', libelle: 'TEMPS NÉCESSAIRE À L\'ÉVALUATION DES OFFRES'},
    {value: 'PERIODEREMISEOFFRES', libelle: 'PERIODE DE REMISE DES OFFRES'}
  ];
  calculDelai: ICalculDelai;
  calculDel: ICalculDelai;
  date: any;

  constructor(
    protected calculDelaiService: CalculDelaiService,

    protected parseLinks: JhiParseLinks,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected messageService: MessageService,
    protected confirmationService: ConfirmationService,
    protected referentielDelaiService: ReferentielDelaiService,
    protected modePassationService: ModePassationService
  ) {}

  loadAll() {


    this.calculDelaiService.query()
      .subscribe((res: HttpResponse<ICalculDelai[]>) => {
        this.calculDelais = res.body;
      }, () => this.message('myKey', 'error', 'erreur de chargement', 'erreur de chargement des dates calculées'));

  }



  ngOnInit() {
    this.calculDelai = new CalculDelai();
    this.calculDelai.modePassation = null;
    this.calculDel = new CalculDelai();
    this.display = false;
    this.isSaving = false;
    this.modePassation = new ModePassation();
    this.modePassations = [];
    this.calculDelais = [];
    this.etapes = [];
    this.etapeSelecteds = [];
    this.date = {};
    this.loadAll();
    this.modePassationService
      .query()
      .subscribe(
        (res: HttpResponse<IModePassation[]>) => { this.modePassations = res.body || []; },
        () => this.message('myKey','error', 'erreur de cargement', 'erreur de chargement des données'));

    }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICalculDelai[]>>) {
    result.subscribe(
      () => {
        this.showMessage('success', 'ENREGISTREMENT', 'calcul delai ajouté avec succès!');
        this.onSaveSuccess();
      },
      () => {
        this.showMessage('error', 'ENREGISTREMENT', "Echec d'enregistrement!");
        this.onSaveError();
      }
    );
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.loadAll();
    this.display = false;
    this.etapeSelecteds = [];
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  supprimer() {
    this.displayDelete = true;
  }
  /* Modification du calcul delai */
  add(calculDelai: ICalculDelai) {
    window.console.log(calculDelai);
    if(calculDelai.id !== undefined){
      this.calculDelai.modePassation = new ModePassation();
      this.date = this.dateCalcules.find(value => value.value === calculDelai.libelle);
      this.modePassation = this.modePassations.find(value => value.id === calculDelai.etape.modePassationId);
       this.calculDelai = calculDelai;
       this.loadEtape();
      this.calculDelaiService.getEtapesByDate(calculDelai.libelle) .subscribe((res: HttpResponse<ICalculDelai>) => {
        this.calculDel = res.body;
        this.etapeSelecteds = this.calculDel.etapes;

      });




    }else {
      this.calculDelai = new CalculDelai();
    }


      this.display = true;

  }

  /*  Supprimer calculdelai */
  deleteAll() {
    this.calculDelaiService.deleteAll(this.calculDelaiSelected).subscribe(
      () => {
        this.loadAll();
        this.showMessage('success', 'SUPPRESSION', 'Suppression effectuée avec succès !');
      },
      () => this.showMessage('error', 'SUPPRESSION', 'Echec de la suppression !')
    );

    this.displayDelete = false;
  }
  annulerDelete() {
    this.calculDelai = new CalculDelai();
    this.displayDelete = false;
  }

  findbyModePassation() {
    this.calculDelaiService.getModePassation(this.calculDelai.modePassation.id).subscribe((res:HttpResponse<ICalculDelai[]>)=>this.calculDelais = res.body);
  }

  findbyModePassationandCalcul() {
    this.calculDelaiService.getModePassationAndDelaiCalcul(this.calculDelai.modePassation.id,this.date.value).subscribe((res:HttpResponse<ICalculDelai[]>)=>{
      this.calculDelais = res.body;


    });

  }

  showMessage(sever: string, sum: string, det: string) {
    this.messageService.add({
      severity: sever,
      summary: sum,
      detail: det
    });
  }
  calculer(): void {
    this.calculDelai = new CalculDelai();

    this.display = true;
  }
  deleteElement(delais: ICalculDelai) {
    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Etes-vous sûr de vouloir supprimer ?',
      accept: () => {
        if (delais === null) {
          return;
        } else {
          delais.deleted = true;
          this.calculDelaiService.update(delais).subscribe(
            () => {
              this.loadAll();

              this.showMessage('success', 'SUPPRESSION', 'Suppression effectuée avec succès !');
              window.console.log('************************************************************');
            },
            () => this.showMessage('error', 'SUPPRESSION', 'Echec de la suppression !')
          );
        }
      }
    });
  }


  annuler() {
    this.calculDelai = new CalculDelai();
    this.calculDelai.modePassation = new ModePassation();
    this.display = false;

  }

  message(cle: string, severite: string, resume: string, detaille: string) {
    this.messageService.add({ key: cle, severity: severite, summary: resume, detail: detaille });
  }

  save(): void {
    this.isSaving = true;
    this.calculDelai.etapes = this.etapeSelecteds;
    this.calculDelai.libelle = this.date.value;

    window.console.log(this.calculDelai);

    if (this.calculDelai.id !== undefined) {
       this.subscribeToSaveResponse(this.calculDelaiService.update(this.calculDelai));
    } else {
      this.subscribeToSaveResponse(this.calculDelaiService.create(this.calculDelai));
    }
  }

  loadEtape() {
    this.referentielDelaiService.findEtapeByModePassationId(this.calculDelai.modePassation.id).subscribe(
      (res: HttpResponse<IEtape[]>) => {
        this.etapes = res.body;
      }, () => this.message('myKey','error', 'ERREUR', 'Nous n\'navons pas pu trouver vos étapes')
    );
  }
}
