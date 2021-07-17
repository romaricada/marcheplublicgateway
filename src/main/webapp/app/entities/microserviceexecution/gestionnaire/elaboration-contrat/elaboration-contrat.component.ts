import {Component, OnInit, OnDestroy} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject, Subscription} from 'rxjs';
import {JhiDataUtils, JhiEventManager, JhiParseLinks} from 'ng-jhipster';
import {Contrat, IContrat} from 'app/shared/model/microserviceexecution/contrat.model';
import {ElaborationContratService} from './elaboration-contrat.service';
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
import {
    ILigneBudgetaireContrat,
    LigneBudgetaireContrat
} from 'app/shared/model/microserviceexecution/ligne-budgetaire-contrat.model';
import {takeUntil} from 'rxjs/operators';
import {Candidat} from 'app/shared/model/microservicedaccam/candidat.model';
import {select, Store} from "@ngrx/store";
import {selectetExerciceCourant} from "app/store/selector";
import {AvisDac, IAvisDac} from "app/shared/model/microservicedaccam/avis-dac.model";
import {State} from "src/main/webapp/app/store/reducers";
import {AvisDacService} from "app/entities/microservicedaccam/avis-dac/avis-dac.service";
import {
    IBesoinLigneBudgetaire
} from "app/shared/model/microserviceppm/besoin-ligne-budgetaire.model";
import {BesoinLigneBudgetaireService} from "app/entities/microserviceppm/besoin-ligne-budgetaire/besoin-ligne-budgetaire.service";
import {WordFlow} from 'app/shared/model/microserviceexecution/word-flow';
import {messageWordFlow} from 'app/shared/util/message-wordflow';
import {soldeTotal} from 'app/shared/util/common-function';
import {ReportService} from "app/entities/microserviceexecution/reports/reportService";
import {SourceFinancementService} from "app/entities/microserviceppm/source-financement/source-financement.service";
import {ISourceFinancement} from "app/shared/model/microserviceppm/source-financement.model";

@Component({
    selector: 'jhi-elaboration-contrat',
    templateUrl: './elaboration-contrat.component.html',
    styleUrls: ['./elaboration-contrat.scss']
})
export class ElaborationContratComponent implements OnInit, OnDestroy {
    contrats: IContrat[];
    contrat: IContrat;
    isSaving: boolean;
    fichiers: FileList;
    files: IFichier[];
    file: IFichier;
    displayContrat: boolean;
    lots: ILot[];
    activite: IActivite;
    activites: IActivite[];
    lot: ILot;
    candidatLot: ICandidatLot;
    exercice: IExerciceBudgetaire;
    exercices: IExerciceBudgetaire[];
    eventSubscriber: Subscription;
    besoinLigneBudgetaires: IBesoinLigneBudgetaire[];
    destroy$: Subject<boolean> = new Subject<boolean>();
    candidatLots: ICandidatLot[];
    candidatLotSelected: ICandidatLot[];
    sourceFinancements: ISourceFinancement[];
    sourceFinancement: ISourceFinancement;
    candidatId: number;
    isView: boolean;
    avisdacs: IAvisDac[];
    avisdac: IAvisDac;
    totaTMontant: number;
    attributaire: string;
    toolTipe: string;
    contratSelected: IContrat;
    isReception: boolean;
    contratReceptionsDrowDown: Array<SelectItem>;
    isApprobation: boolean;
    contratApprouveDrowDown: Array<SelectItem>;

    constructor(
        protected contratService: ElaborationContratService,
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
        protected besoinLigneBudgetaireService: BesoinLigneBudgetaireService,
        protected sourceFinancementService: SourceFinancementService,
        protected store: Store<State>,
        protected avisDacService: AvisDacService,
        protected reportService: ReportService
    ) {
    }

    addContrat() {
        this.loadAttributairebyLotId();
        this.contrat = new Contrat();
        this.displayContrat = true;
    }

    loadAttributairebyLotId() {
        this.candidatLotService.findAttributaireByLotCandidat(this.lot.id).subscribe((res: HttpResponse<ICandidatLot>) => {
            this.candidatLot = res.body;
        })
    }

    getAvisDacId(): number {
        if (this.avisdac !== null) {
            return this.avisdac.id;
        } else {
            return 0;
        }
    }

    loadContratbyAvisDac() {
        this.contratService.findAllContratByAvisDac(this.avisdac.id).subscribe((res: HttpResponse<IContrat[]>) => {
            this.contrats = res.body.filter(value => value.lotId === this.lot.id);
            this.contratReceptionsDrowDown = [];
            this.contratApprouveDrowDown = [];
            this.contrats.forEach(value => {
                value.etapeContrat = messageWordFlow(value.wordFlow);
                if (value.wordFlow === WordFlow.TRANS_SOUMISSIONNAIRE) {
                    this.contratReceptionsDrowDown.push({label: value.reference, value: value.id});
                }
                if (value.wordFlow === WordFlow.RECEPTION_CONTRAT) {
                    this.contratApprouveDrowDown.push({label: value.reference, value: value.id});
                }
            });
        });
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
        this.contrat.sourceFinancement = this.sourceFinancement.libelle;
        this.contrat.avisDacId = this.getAvisDacId();
        this.contrat.lotId = this.lot.id;
        this.contrat.avisDacLibelle = this.avisdac.objet;
        this.contrat.wordFlow = WordFlow.AVANT_PROJET;
        this.isSaving = true;
        this.contrat.ligneBudgetaireContrats = [];
        this.contrat.ligneBudgetaires = [];
        if (this.besoinLigneBudgetaires) {
            this.besoinLigneBudgetaires.forEach(v => {
                if (v.selected) {
                    this.contrat.ligneBudgetaires.push(v.ligneBudget);
                    const blbc: ILigneBudgetaireContrat = new LigneBudgetaireContrat();
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
      this.avisdac = new AvisDac();
        this.contrats = [];
        this.candidatLot = new CandidatLot();
        this.candidatLot.candidat = new Candidat();
        this.contrat = new Contrat();
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
        this.loadAllSourceFinancement();
    }

    actualisation() {
        this.lot = null;
        this.lots = [];
        this.candidatLot = null;
        this.avisdac = null;
        this.avisdacs = [];
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    sucessMessage(etat: boolean) {
        if (!etat) {
            this.showMessage('myKey', 'success', 'Enregistrement', 'Enregistrement effectué avec succès !');
        } else {
            this.showMessage('myKey', 'success', 'Mise à jour', 'Mise à jour effectuée avec succès !');
        }
        this.displayContrat = false;
        this.isReception = false;
        this.isApprobation = false;
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
        this.isReception = false;
        this.isApprobation = false;
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

    loadAllLotbyAvisDAC() {
        this.lotService.findLotByAvisDac(this.avisdac.id).subscribe((res: HttpResponse<ILot[]>) => {
            this.lots = res.body;
        });
    }

    loadAllSourceFinancement() {
        this.sourceFinancementService.findAllSourceFinancement().subscribe((res: HttpResponse<ISourceFinancement[]>) => {
            this.sourceFinancements = res.body;
            window.console.log("+++++++===this.sourceFinancements===++++++{}",this.sourceFinancements);
        });
    }

    loadData() {
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
      this.loadAllSourceFinancement();
      this.sourceFinancement = this.sourceFinancements.find(value => value.libelle === contrat.sourceFinancement);
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
      this.loadAllSourceFinancement();
      this.sourceFinancement = this.sourceFinancements.find(value => value.libelle === rowData.sourceFinancement);
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

    onSendToTutilaire(contrat: IContrat) {
        this.confirmationService.confirm({
            header: 'Confirmation',
            message: 'Etes-vous sûr de transmettre le contrat ?',
            accept: () => {
                contrat.wordFlow = WordFlow.TRANS_SOUMISSIONNAIRE;
                contrat.ligneBudgetaireContrats = [];
                this.contratService.update(contrat).pipe(takeUntil(this.destroy$))
                    .subscribe((res: HttpResponse<IContrat>) => {
                        this.loadContratbyAvisDac();
                        this.sucessMessage(true);
                        window.console.log(res.body);
                    }, () => {
                        this.erroMessage(true);
                    });
            }
        });
    }

    onShowReception() {
      this.loadContratbyAvisDac();
        this.isReception = true;
    }

    onContratChange(id: any) {
        const object = this.contrats.find(value => value.id === id);
        if (object) {
            this.contrat = object;
            window.console.log("+++++contrat+++++{}", this.contrat);
        }
    }

  onFindContrat(contrat: IContrat) {
      this.sourceFinancement = this.sourceFinancements.find(value => value.libelle === contrat.sourceFinancement);
    if (contrat !== null) {
      this.contrat = contrat;
    }
  }

    saveReception() {
        this.contrat.wordFlow = WordFlow.RECEPTION_CONTRAT;
        this.contrat.ligneBudgetaireContrats = [];
        this.contratService.update(this.contrat).pipe(takeUntil(this.destroy$))
            .subscribe((res: HttpResponse<IContrat>) => {
                this.loadContratbyAvisDac();
                this.sucessMessage(true);
                window.console.log(res.body);
            }, () => {
                this.erroMessage(true);
            });
    }

  /**
   * les etats
   */
  ImprimerContratReception() {
    window.console.log(this.contrat);
    this.reportService
      .ImprimerContratReception(this.contrat)
      .subscribe(response => window.open(URL.createObjectURL(new Blob([response], {type: 'application/pdf'})), '_blank'));
  }
}
