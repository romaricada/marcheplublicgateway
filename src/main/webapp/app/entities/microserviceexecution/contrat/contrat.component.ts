import {Component, OnInit, OnDestroy} from '@angular/core';
import {HttpHeaders, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject, Subscription} from 'rxjs';
import {JhiDataUtils, JhiEventManager, JhiParseLinks} from 'ng-jhipster';
import {Contrat, IContrat} from 'app/shared/model/microserviceexecution/contrat.model';
import {ContratService} from './contrat.service';
import {IExerciceBudgetaire} from "app/shared/model/microserviceppm/exercice-budgetaire.model";
import {ILot} from "app/shared/model/microservicedaccam/lot.model";
import {IActivite} from "app/shared/model/microserviceppm/activite.model";
import {MessageService, ConfirmationService, SelectItem} from "primeng/api";
import {CandidatLot, ICandidatLot} from "app/shared/model/microservicedaccam/candidat-lot.model";
import {ActiviteService} from "app/entities/microserviceppm/activite/activite.service";
import {ExerciceBudgetaireService} from "app/entities/microserviceppm/exercice-budgetaire/exercice-budgetaire.service";
import {LotService} from "app/entities/microservicedaccam/lot/lot.service";
import {CandidatLotService} from "app/entities/microservicedaccam/candidat-lot/candidat-lot.service";
import {IFichier} from 'app/entities/file-manager/file-menager.model';
import {DataUtils} from 'app/entities/file-manager/dataUtils';
import {FileMenagerService} from "app/entities/file-manager/file-menager.service";
import {ILigneBudgetaire} from 'app/shared/model/microserviceppm/ligne-budgetaire.model';
import {LigneBudgetaireService} from 'app/entities/microserviceppm/ligne-budgetaire/ligne-budgetaire.service';
import {
  ILigneBudgetaireContrat,
  LigneBudgetaireContrat
} from 'app/shared/model/microserviceexecution/ligne-budgetaire-contrat.model';
import {takeUntil} from 'rxjs/operators';
import {Candidat, ICandidat} from 'app/shared/model/microservicedaccam/candidat.model';
import {select, Store} from "@ngrx/store";
import {selectetExerciceCourant} from "app/store/selector";
import {IAvisDac} from "app/shared/model/microservicedaccam/avis-dac.model";
import {State} from "app/store/reducers";
import {AvisDacService} from "app/entities/microservicedaccam/avis-dac/avis-dac.service";
import {
  IBesoinLigneBudgetaire
} from "app/shared/model/microserviceppm/besoin-ligne-budgetaire.model";
import {BesoinLigneBudgetaireService} from "app/entities/microserviceppm/besoin-ligne-budgetaire/besoin-ligne-budgetaire.service";
import {soldeTotal} from 'app/shared/util/common-function';

@Component({
    selector: 'jhi-contrat',
    templateUrl: './contrat.component.html',
    styleUrls: ['./contrat.scss']
})
export class ContratComponent implements OnInit, OnDestroy {
    contrats: IContrat[];
    contrat: IContrat;
    isSaving: boolean;
    fichiers: FileList;
    files: IFichier[];
    file: IFichier;
    dropdownAttributaire: Array<SelectItem>;
    displayContrat: boolean;
    lots: ILot[];
    activite: IActivite;
    activites: IActivite[];
    lot: ILot;
    candidatLot: ICandidatLot;
    exercice: IExerciceBudgetaire;
    exercices: IExerciceBudgetaire[];
    eventSubscriber: Subscription;
    ligneBudgetTaireList: Array<ILigneBudgetaire>;
    showLigneBudgetaire: boolean;
    ligneSelect: Array<ILigneBudgetaire>;
    ligneBudgetaireContratList: Array<ILigneBudgetaireContrat>;
    besoinLigneBudgetaires: IBesoinLigneBudgetaire[];
    destroy$: Subject<boolean> = new Subject<boolean>();
    attributaires: ICandidat[];
    candidatLots: ICandidatLot[];
    candidatLotSelected: ICandidatLot[];
    candidatId: number;
    isView: boolean;
    avisdacs: IAvisDac[];
    avisdac: IAvisDac;
    totaTMontant: number;
    attributaire: string;
    links: any;
    totalItems: any;
    itemsPerPage: any;
    page: any;
    toolTipe: string;
    predicate: any;
    previousPage: any;
    reverse: any;

    constructor(
        protected contratService: ContratService,
        protected messageService: MessageService,
        protected confirmationService: ConfirmationService,
        protected activiteService: ActiviteService,
        protected exerciceBudgetaireService: ExerciceBudgetaireService,
        protected fileManagerService: FileMenagerService,
        protected candidatLotService: CandidatLotService,
        protected lotService: LotService,
        protected parseLinks: JhiParseLinks,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        protected eventManager: JhiEventManager,
        protected dataUtils: JhiDataUtils,
        protected fileUtils: DataUtils,
        protected ligneBudgetaireService: LigneBudgetaireService,
        protected besoinLigneBudgetaireService: BesoinLigneBudgetaireService,
        protected store: Store<State>,
        protected avisDacService: AvisDacService

    ) {}

    loadActivite() {
        this.loadAllAtributaireListbyActivite();
    }

  loadAll() {
    this.contratService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IContrat[]>) => this.paginateContrats(res.body, res.headers));
  }

  protected paginateContrats(data: IContrat[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    this.contrats = data;
  }

    addContrat() {
      this.loadAttributairebyLotId();
      this.contrat = new Contrat();
        this.displayContrat = true;
    }

    loadAttributairebyLotId(){
      this.candidatLotService.findAttributaireByLotCandidat(this.lot.id).subscribe((res:HttpResponse<ICandidatLot>) =>{
        this.candidatLot = res.body;
      })
    }

    loadAllAtributaireListbyActivite() {
        this.candidatLotService.findListAttributaireByActivite(this.getAvisDacId()).subscribe((res: HttpResponse<ICandidatLot[]>) => {
            if (res.body) {
                this.attributaires = res.body.map(c => c.candidat);
                this.dropdownAttributaire = [];
                this.attributaires.forEach(c => {
                    this.dropdownAttributaire.push({
                        label: c.nomStructure,
                        value: c.id
                    });
                });
            }
        });
    }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

    getAvisDacId(): number {
      if (this.avisdac !== null){
        return this.avisdac.id;
      } else {
        return 0;
      }
    }

    loadContrat(avisDacId: number, candidatId: number) {
        this.contratService.findAllContratByCandidat(avisDacId, candidatId).pipe(takeUntil(this.destroy$))
            .subscribe((res: HttpResponse<IContrat[]>) => {
                if (res.body) {
                    this.contrats = res.body;
                }
            });
    }

    loadExercicice() {
        this.activiteService.findAllByAnneeExercice(this.getExerciceId()).pipe(takeUntil(this.destroy$))
            .subscribe((res: HttpResponse<IActivite[]>) => {
                if (res.body.length > 0) {
                    res.body.forEach(value => {
                        value.nomActivite = value.codeLignePlan + ' ' + value.naturePrestationLibelle;
                    });
                    this.activites = res.body;
                }
                this.ligneBudgetaireService.findAllByExercice(this.getExerciceId())
                    .pipe(takeUntil(this.destroy$)).subscribe((ligne: HttpResponse<ILigneBudgetaire[]>) => {
                    if (ligne) {
                        this.ligneBudgetTaireList = ligne.body;
                    }
                });
            });
    }

    getExerciceId(): number {
        if (this.exercice !== null) {
            return this.exercice.id;
        } else {
            return 0;
        }
    }

    loadContratbyAvisDac(){
      this.contratService.findAllContratByAvisDac(this.avisdac.id).subscribe((res:HttpResponse<IContrat[]>)=>{
        this.contrats = res.body;
      });
    }

    ifExistContrat(): boolean {
        if (this.contrat.id) {
            return this.contrats.some(value => value.id !== this.contrat.id && value.reference === this.contrat.reference);
        } else {
            return this.contrats.some(value => value.reference === this.contrat.reference);
        }
    }

    showMessage(cle: string, severite: string, resume: string, detaille: string) {
        this.messageService.add({
            key: cle,
            severity: severite,
            summary: resume,
            detail: detaille
        });
    }

    saveContrat() {
      this.contrat.candidaId = this.candidatId;
      this.contrat.exerciceId = this.exercice.id;
      this.contrat.avisDacId = this.getAvisDacId();
      this.contrat.lotId = this.lot.id;
      this.isSaving = true;
      this.contrat.ligneBudgetaireContrats = [];
      this.contrat.ligneBudgetaires = [];
      if (this.besoinLigneBudgetaires) {
        this.besoinLigneBudgetaires.forEach(v => {
          if (v.selected) {
            this.contrat.ligneBudgetaires.push(v.ligneBudget);
            const blbc: ILigneBudgetaireContrat =new LigneBudgetaireContrat();
            blbc.ligneBudgetaireId = v.ligneBudgetId;
            this.contrat.ligneBudgetaireContrats.push(blbc);
          }
        });
      }
      if (this.contrat.id !== undefined) {
        this.contratService.update(this.contrat).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<IContrat>) => {
          this.isSaving = false;
          this.fichiers = undefined;
          this.loadContratbyAvisDac();
          this.sucessMessage(true);
          window.console.log(res.body);
        }, () => {
          this.erroMessage(true);
        });
      } else {
        this.contratService.create(this.contrat).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<IContrat>) => {
          this.isSaving = false;
          this.fichiers = undefined;
          // this.loadAll();
          this.loadContratbyAvisDac();
          window.console.log(res.body);
          this.sucessMessage(false);
        }, () => {
          this.erroMessage(false);
          this.isSaving = false;
        });
      }

    }

    ngOnInit() {
        this.contrats = [];
        this.candidatLot = new CandidatLot();
        this.candidatLot.candidat = new Candidat();
        this.contrat = new Contrat();
         // this.loadAll();
        this.exerciceBudgetaireService.findAllWithoutPage().pipe(takeUntil(this.destroy$))
            .subscribe((res: HttpResponse<IExerciceBudgetaire[]>) => {
                this.exercices = res.body;
            });


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
                  this.avisdacs = res.body;
                }
              });

          }
        });
    }

  actualisation(){
    this.lot = null;
    this.lots = [];
    this.candidatLot = null;
    this.avisdac = null;
    this.avisdacs = [];
  }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
        // this.eventManager.destroy(this.eventSubscriber);
    }

    sucessMessage(etat: boolean) {
        if (!etat) {
            this.showMessage('myKey', 'success', 'Enregistrement', 'Enregistrement effectué avec succès !');
        } else {
            this.showMessage('myKey', 'success', 'Mise à jour', 'Mise à jour effectuée avec succès !');
        }
        this.displayContrat = false
    }

    erroMessage(etat: boolean) {
        if (!etat) {
            this.showMessage('myKey', 'error', 'Enregistrement', 'Echec de l\'enregistrement !');
        } else {
            this.showMessage('myKey', 'error', 'Mise à jour', 'Echec de la mise à jour !');
        }
    }

    annulerContrat() {
        this.displayContrat = false;
        this.isView = false;
        this.contrat = new Contrat();
    }

    loadLotOfCandidat(value: any) {
        this.candidatLotService.findListAttributaireByActivite(this.getAvisDacId()).subscribe((res: HttpResponse<ICandidatLot[]>) => {
            if (res.body) {
                res.body.forEach(cl => {
                    cl.label = cl.lot.description;
                });
                this.candidatLots = res.body.filter(value1 => value1.candidatId === value);
            }
        });
    }

    loadAllLotbyAvisDAC(){
      this.lotService.findLotByAvisDac(this.avisdac.id).subscribe((res:HttpResponse<ILot[]>)=>{
        this.lots = res.body;
      });
    }

    loadLigneBudgetaire(){
      this.loadContratbyAvisDac();
      this.besoinLigneBudgetaireService.findAllBesoinLigneBudgetaireByActivite(this.avisdac.activiteId)
        .pipe(takeUntil(this.destroy$))
        .subscribe(res => {
          if (res.body) {
            this.besoinLigneBudgetaires = res.body;
            this.totaTMontant = soldeTotal(this.besoinLigneBudgetaires.map(v => v.montantEstime));
          }
        });
    }

    update(contrat: IContrat) {
      this.loadLotOfCandidat(contrat);
      this.loadAttributairebyLotId();
        this.contrat = contrat;
        this.candidatLotSelected = [];
      this.besoinLigneBudgetaires.forEach(v => {
        if (contrat.ligneBudgetaireContrats.some(l => l.ligneBudgetaireId === v.ligneBudgetId)) {
          v.selected = true;
        }
      });
        this.displayContrat = true;
    }

  onChangeVal(rowData) {
    if (rowData.selected) {
      this.toolTipe = 'Actif'
    } else {
      this.toolTipe = 'Inactif'
    }
  }

    view(rowData) {
        this.loadAttributairebyLotId();
        this.contrat = rowData;
        this.candidatLotSelected = [];
      this.besoinLigneBudgetaires.forEach(v => {
        if (rowData.ligneBudgetaireContrats.some(l => l === v.id)) {
          v.selected = true;
        }
      });
        this.isView = true;
    }

    retirerLigne(ligneBudgetaire) {
        this.ligneSelect = this.ligneSelect.filter(value => value.id !== ligneBudgetaire.id);
    }

    supprimer(rowData: IContrat) {
        this.confirmationService.confirm({
            header: 'Confirmation',
            message: 'Etes-vous sûr de vouloir supprimer ?',
            accept: () => {
                if (rowData === null) {
                    return;
                } else {
                    rowData.deleted = true;
                    this.contratService.delete(rowData.id).subscribe(
                        () => {
                          this.loadContratbyAvisDac();
                            this.showMessage('myKey', 'success', 'SUPPRESSION', 'Suppression effectuée avec succès !');
                        },
                        () => this.showMessage('myKey', 'error', 'SUPPRESSION', 'Echec de la suppression !')
                    );
                }
            }
        });
    }
}
