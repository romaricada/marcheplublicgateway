import {Component, OnInit, OnDestroy} from '@angular/core';
import {IActivite} from 'app/shared/model/microserviceppm/activite.model';
import {ITypeCaution} from 'app/shared/model/microservicedaccam/typeCaution.model';
import {IExerciceBudgetaire} from 'app/shared/model/microserviceppm/exercice-budgetaire.model';
import {Observable, Subject, Subscription} from 'rxjs';
import {ExerciceBudgetaireService} from 'app/entities/microserviceppm/exercice-budgetaire/exercice-budgetaire.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ActiviteService} from 'app/entities/microserviceppm/activite/activite.service';
import {JhiDataUtils, JhiEventManager, JhiParseLinks} from 'ng-jhipster';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpResponse} from '@angular/common/http';
import {AvisDac, IAvisDac} from 'app/shared/model/microservicedaccam/avis-dac.model';
import {AvisDacService} from 'app/entities/microservicedaccam/avis-dac/avis-dac.service';
import Status = jest.Status;
import {takeUntil} from 'rxjs/operators';
import {ILot, Lot} from 'app/shared/model/microservicedaccam/lot.model';
import {BesoinLigneBudgetaireService} from 'app/entities/microserviceppm/besoin-ligne-budgetaire/besoin-ligne-budgetaire.service';
import {IBesoinLigneBudgetaire} from 'app/shared/model/microserviceppm/besoin-ligne-budgetaire.model';
import {select, Store} from '@ngrx/store';
import {State} from 'app/store/reducers';
import {selectetExerciceCourant} from 'app/store/selector';
import {soldeTotal} from 'app/shared/util/common-function';
import {ReportService} from "app/entities/microservicedaccam/reports/reportService";
import {Fichier} from "app/entities/file-manager/file-menager.model";
import {TypeDossier} from "app/shared/model/enumerations/typeDossier";
import {DataUtils} from "app/entities/file-manager/dataUtils";
import {FileMenagerService} from "app/entities/file-manager/file-menager.service";


@Component({
    selector: 'jhi-candidat',
    templateUrl: './avis-dac.component.html'
})
export class AvisDacComponent implements OnInit, OnDestroy {
    avisDacs: IAvisDac[];
    avisDac: IAvisDac;
    avisDacTMP: IAvisDac;
    lot: ILot;
    selected: IAvisDac[];
    activites: IActivite[];
    activite: IActivite;
    typeCautions: ITypeCaution[];
    exercices: IExerciceBudgetaire[];
    exercice: IExerciceBudgetaire;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    displayLigne: boolean;
    ajout = false;
    totalItems: any;
    isSavinge: boolean;
    isLoading: boolean;
    showFicModal: boolean;
    isSaving: Boolean;
    file: Fichier;
    files: Fichier[];
    fichiers: Fichier[];
    display: Boolean;
    fileListe: FileList;
    displayvisualise: Boolean;
    displayDelete: Boolean;
    status: String;
    statusObject$: Observable<Status>;
    destroy$: Subject<boolean> = new Subject<boolean>();
    index: number;
    besoinLigneBudgetaires: IBesoinLigneBudgetaire[];
    totaTMontant: number;
    dataFiles: Fichier[];
    toolTipe: string;
    lotSelected: ILot[];

    constructor(
        protected avisDacService: AvisDacService,
        protected reportService: ReportService,
        protected exerciceBudgetaireService: ExerciceBudgetaireService,
        protected messageService: MessageService,
        protected confirmationService: ConfirmationService,
        protected activiteService: ActiviteService,
        protected parseLinks: JhiParseLinks,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        protected eventManager: JhiEventManager,
        protected besoinLigneBudgetaireService: BesoinLigneBudgetaireService,
        protected store: Store<State>,
        protected fileUtils: DataUtils,
        protected fileManagerService: FileMenagerService,
        protected dataUtils: JhiDataUtils
    ) {
    }


  ImprimerDac() {
      this.avisDac.listelots= this.avisDac.lots;
      this.avisDac.listebudgets= this.besoinLigneBudgetaires;
      window.console.log(this.avisDac);
    this.reportService
      .ImprimerDac(this.avisDac)
      .subscribe(response => window.open(URL.createObjectURL(new Blob([response], {type: 'application/pdf'})), '_blank'));
  }


  add(avisDac: IAvisDac) {
        if (avisDac === null) {
            this.avisDac = new AvisDac();
        } else {
            this.avisDac = avisDac;
            this.besoinLigneBudgetaires.forEach(v => {
                if (avisDac.besionLigneBugetaitaireIds.some(l => l === v.id)) {
                    v.selected = true;
                }
            });
        }
        this.display = true;
    }

  visualise(avisDac: IAvisDac) {
    if (avisDac === null) {
      this.avisDac = new AvisDac();
    } else {
      this.avisDac = avisDac;
      this.besoinLigneBudgetaires.forEach(v => {
        if (avisDac.besionLigneBugetaitaireIds.some(l => l === v.id)) {
          v.selected = true;
        }
      });

    }


        this.displayvisualise = true;
    }


    ngOnInit() {
        this.exercice = null;
        this.activite = null;
        this.avisDacs = [];
        this.typeCautions = [];
        this.lot = new Lot();
        this.displayLigne = false;
        this.avisDac = new AvisDac();
        this.isSavinge = false;
        this.isSaving = false;
        this.displayvisualise = false;
        this.exerciceBudgetaireService.findAllWithoutPage().pipe(takeUntil(this.destroy$))
            .subscribe((res: HttpResponse<IExerciceBudgetaire[]>) => {
                this.exercices = res.body;
            });
        this.store.pipe(select(selectetExerciceCourant)).pipe(takeUntil(this.destroy$))
            .subscribe(exercice => {
                if (exercice) {
                    this.exercice = exercice;
                    this.actualisation();
                    this.activiteService.findAllByAnneeExercice(this.exercice.id).pipe(takeUntil(this.destroy$))
                        .subscribe((res: HttpResponse<IActivite[]>) => {
                            if (res.body) {
                                res.body.forEach(value => {
                                    value.nomActivite = value.codeLignePlan + ' ' + value.naturePrestationLibelle;
                                });
                                this.activites = res.body;
                            }
                        });
                }
            });

    }

    actualisation() {
        this.activite = null;
        this.avisDacs = [];
        this.avisDac = new AvisDac();
    }

    getExerciceId(): number {
        if (this.exercice !== null) {
            return this.exercice.id;
        } else {
            return 0;
        }
    }

    loadExercicice() {

    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    trackId(index: number, item: IAvisDac) {
        return item.id;
    }

    showMessage(cle: string, sever: string, sum: string, det: string) {
        this.messageService.add({
            key: cle,
            severity: sever,
            summary: sum,
            detail: det
        });
    }

    getActiviteId(): number {
        if (this.activite !== null) {
            return this.activite.id;
        } else {
            return 0;
        }
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.display = false;
        this.totaTMontant = 0;
        this.loadAll();
    }

    protected onSaveError() {
        this.isSaving = false;
    }


    protected subscribeToSaveResponse(result: Observable<HttpResponse<IAvisDac>>) {
        result.subscribe(
            () => {
                this.showMessage('myKey1', 'success', 'ENREGISTREMENT', 'Opération effectuée avec succès!');
                this.onSaveSuccess();
            },
            () => {
                this.showMessage('myKey1', 'error', 'ENREGISTREMENT', "Echec d'enregistrement!");
                this.onSaveError();
            }
        );
    }

    showLot() {
        this.displayLigne = true;
        this.lot = new Lot();

    }

    addLot() {
        if (!this.avisDac.lots) {
            this.avisDac.lots = [];
        }
        if (this.lot.isUdate) {
            this.lot.isUdate = false;
            this.avisDac.lots.splice(this.index, 1);
            this.avisDac.lots.push(this.lot);
        } else {
            this.avisDac.lots.push(this.lot);
        }
        this.displayLigne = false;
    }

    save() {
        this.isSaving = true;
        this.avisDac.activiteId = this.activite.id;
        this.avisDac.exerciceId = this.exercice.id;
        this.avisDac.modePassationId = this.activite.passationId;
        this.avisDac.besionLigneBugetaitaireIds = [];
        if (this.besoinLigneBudgetaires) {
            this.besoinLigneBudgetaires.forEach(v => {
                if (v.selected) {
                    this.avisDac.besionLigneBugetaitaireIds.push(v.id);
                }
            });
        }
        if (this.avisDac.id !== undefined) {
            this.subscribeToSaveResponse(this.avisDacService.update(this.avisDac));
        } else {
            this.subscribeToSaveResponse(this.avisDacService.create(this.avisDac));
        }
    }

    deleteElement(avisDac: IAvisDac) {
        this.confirmationService.confirm({
            header: 'Confirmation',
            message: 'Etes-vous sûr de vouloir supprimer ?',
            accept: () => {
                if (avisDac === null) {
                    return;
                } else {
                    avisDac.deleted = true;
                    this.avisDacService.delete(avisDac.id).subscribe(
                        () => {
                            this.loadAll();
                            this.showMessage('myKey1', 'success', 'SUPPRESSION', 'Suppression effectuée avec succès !');
                        },
                        () => this.showMessage('myKey1', 'error', 'SUPPRESSION', 'Echec de la suppression !')
                    );
                }
            }
        });
    }

    annulerDelete() {
        this.avisDac = new AvisDac();
        this.displayDelete = false;
    }

    annuler() {
        this.avisDac = new AvisDac();
        this.display = false;
        this.loadAll();
    }

  annulervisualiser() {
        this.avisDac = new AvisDac();
        this.displayvisualise = false;
        this.loadAll();
    }

    annulerLot() {
        this.lot = new Lot();
        this.displayLigne = false;
    }

    supprimer() {
        this.displayDelete = true;
    }

    retire(c, i) {
        if (c) {
            this.avisDac.lots.splice(i, 1);
        }
    }

    private loadAll() {
        this.avisDacService.query(this.getActiviteId()).pipe(takeUntil(this.destroy$)).subscribe(res => {
            this.avisDacs = res.body;
        });
    }

    loadAllLotByActivite() {
        this.loadAll();
        this.besoinLigneBudgetaireService.findAllBesoinLigneBudgetaireByActivite(this.getActiviteId())
            .pipe(takeUntil(this.destroy$))
            .subscribe(res => {
                if (res.body) {
                    this.besoinLigneBudgetaires = res.body;
                    this.totaTMontant = soldeTotal(this.besoinLigneBudgetaires.map(v => v.montantEstime));
                }
            });
    }

    updateLot(l, i) {
        this.index = i;
        this.lot = l;
        this.lot.isUdate = true;
        this.displayLigne = true;
    }

    onChangeVal(rowData) {
        if (rowData.selected) {
            this.toolTipe = 'Actif'
        } else {
            this.toolTipe = 'Inactif'
        }
    }

  setFileData(event) {
    this.fichiers = event.target.files;
    if (event.target.files.length > 0) {
      this.files = [];
      for (let i = 0; i < event.target.files.length; i++) {
        this.file = new Fichier();
        this.fileUtils.setFileData(event, this.file, 'file', false, i);
        this.file.fileName = event.target.files[i].name;
        this.files.push(this.file);
      }
      this.avisDac.files = this.files;
    }
  }

  getFiles(avidac: IAvisDac) {
    this.isLoading = true;
    this.avisDacTMP = avidac;
    this.avisDacService.find(avidac.id).subscribe((res: HttpResponse<IAvisDac>) => {
      this.dataFiles = res.body.files;
      this.isLoading = false;
    });
    this.showFicModal = true;
  }

  dowloadFichier(file) {
    this.dataUtils.downloadFile(file.fileContentType, file.file, file.fileName);
  }

  retirerFihier(file) {
    this.confirmationService.confirm({
      message: 'Êtes vous sûr de vouloir supprimer?',
      accept: () => {
        this.fileManagerService.deleteFile(this.avisDacTMP.id, TypeDossier.AVISDAC, file.fileName).subscribe(() => {
          this.showMessage('mykey1','success', 'Suppression de fichier', 'Fichier supprimé avec succès');
          this.getFiles(this.avisDacTMP);
        }, () => {
          this.showMessage('mykey1','warn', 'Suppression de fichier', 'Echec de suppression');
        });
      }
    });
  }

  setFileAddData(event) {
    this.fileListe = event.target.files;
    if (event.target.files.length > 0) {
      this.files = [];
      for (let i = 0; i < event.target.files.length; i++) {
        this.file = new Fichier();
        this.fileUtils.setFileData(event, this.file, 'file', false, i);
        this.file.fileName = event.target.files[i].name;
        this.files.push(this.file);
      }
      this.avisDacTMP.files = this.files;
    }
  }
}
