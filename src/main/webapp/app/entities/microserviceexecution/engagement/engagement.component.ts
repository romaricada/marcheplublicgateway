import {Component, OnInit, OnDestroy} from '@angular/core';
import {HttpHeaders, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {JhiDataUtils, JhiEventManager, JhiParseLinks} from 'ng-jhipster';
import {EngagementService} from './engagement.service';
import {Engagement, IEngagement} from "app/shared/model/microserviceexecution/engagement.model";
import {Contrat, IContrat} from "app/shared/model/microserviceexecution/contrat.model";
import {ILigneBudgetaire, LigneBudgetaire} from "app/shared/model/microserviceppm/ligne-budgetaire.model";
import {ILot, Lot} from "app/shared/model/microservicedaccam/lot.model";
import {ContratService} from "app/entities/microserviceexecution/contrat/contrat.service";
import {LotService} from "app/entities/microservicedaccam/lot/lot.service";
import {ExerciceBudgetaire, IExerciceBudgetaire} from "app/shared/model/microserviceppm/exercice-budgetaire.model";
import {Activite, IActivite} from "app/shared/model/microserviceppm/activite.model";
import {ExerciceBudgetaireService} from "app/entities/microserviceppm/exercice-budgetaire/exercice-budgetaire.service";
import {ActiviteService} from "app/entities/microserviceppm/activite/activite.service";
import {
    BesoinLigneBudgetaire, IBesoinLigneBudgetaire
} from "app/shared/model/microserviceppm/besoin-ligne-budgetaire.model";
import {BesoinLigneBudgetaireService} from "app/entities/microserviceppm/besoin-ligne-budgetaire/besoin-ligne-budgetaire.service";
import {ConfirmationService, MessageService, SelectItem} from "primeng/api";
import {select, Store} from "@ngrx/store";
import {selectetExerciceCourant} from "app/store/selector";
import {takeUntil} from "rxjs/operators";
import {IAvisDac} from "app/shared/model/microservicedaccam/avis-dac.model";
import {State} from "app/store/reducers";
import {Subject} from "rxjs";
import {AvisDacService} from "app/entities/microservicedaccam/avis-dac/avis-dac.service";
import {ILigneBudgetaireEngagement} from "app/shared/model/microserviceexecution/ligneBudgetaireEngagement.model";
import {getLigneCredit, montantDjaEngager} from 'app/shared/util/common-function';
import {
    ILigneBudgetaireContrat,
    LigneBudgetaireContrat
} from 'app/shared/model/microserviceexecution/ligne-budgetaire-contrat.model';
import {WordFlow} from 'app/shared/model/microserviceexecution/word-flow';
import {messageWordFlow} from 'app/shared/util/message-wordflow';
import {objectResponseMessage} from 'app/shared/util/statut';
import {ReportService} from "app/entities/microserviceexecution/reports/reportService";
import {ISourceFinancement} from "app/shared/model/microserviceppm/source-financement.model";
import {SourceFinancementService} from "app/entities/microserviceppm/source-financement/source-financement.service";
import {Fichier} from "app/entities/file-manager/file-menager.model";
import {TypeDossier} from "app/shared/model/enumerations/typeDossier";
import {FileMenagerService} from "app/entities/file-manager/file-menager.service";
import {DataUtils} from "app/entities/file-manager/dataUtils";

@Component({
    selector: 'jhi-engagement',
    templateUrl: './engagement.component.html',
    styleUrls: ['./engagement.scss']
})
export class EngagementComponent implements OnInit, OnDestroy {
    engagement: IEngagement;
    engagements: IEngagement[];
    engagementsToTransfert: IEngagement[];
    contrats: IContrat[];
    contrat: IContrat;
    contratTMP: IContrat;
    activites: IActivite[];
    activite: IActivite;
    isSaving: boolean;
    ligneBudget: ILigneBudgetaire;
    besoinLigneBudgetaire: IBesoinLigneBudgetaire;
    besoinLigneBudgetaires: ILigneBudgetaireContrat[];
    ligneBudgetaires: ILigneBudgetaireContrat[];
    besoins: ILigneBudgetaire[];
    lot: ILot;
    lots: ILot[];
    exercice: IExerciceBudgetaire;
    exercices: IExerciceBudgetaire[];
    display: boolean;
    display1: boolean;
    isApprobation: boolean;
    sourceFinancements: ISourceFinancement[];
    sourceFinancement: ISourceFinancement;
    contMontant: number;
    destroy$: Subject<boolean> = new Subject<boolean>();
    avisDacs: IAvisDac[];
    avisDac: IAvisDac;
    ligneBudgetaireEngagement: ILigneBudgetaireEngagement;
    ligneBudgetaireId: number;
    ligneSelect: ILigneBudgetaireContrat;
    isImputation: boolean;
    displayContrat: boolean;
    displayDetails: boolean;
    fichiers: FileList;
    showFicModal: boolean;
    fileListe: FileList;
    file: Fichier;
    files: Fichier[];
    dataFiles: Fichier[];
    isLoading: boolean;
    ligneCredits: IBesoinLigneBudgetaire[];
    contratApprouveDrowDown: Array<SelectItem>;
    engagementApprouveDrowDown: Array<SelectItem>;
    engagementVISACONTROLEURDrowDown: Array<SelectItem>;

    constructor(
        protected engagementService: EngagementService,
        protected reportService: ReportService,
        protected besoinLigneBudgetaireService: BesoinLigneBudgetaireService,
        protected contratService: ContratService,
        protected lotService: LotService,
        protected exerciceService: ExerciceBudgetaireService,
        protected activiteService: ActiviteService,
        protected parseLinks: JhiParseLinks,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        protected eventManager: JhiEventManager,
        protected confirmationService: ConfirmationService,
        protected sourceFinancementService: SourceFinancementService,
        protected messageService: MessageService,
        protected store: Store<State>,
        protected avisDacService: AvisDacService,
        protected fileManagerService: FileMenagerService,
        protected dataUtils: JhiDataUtils,
        protected fileUtils: DataUtils
    ) {
    }

    ngOnInit() {
        this.display = false;
        this.displayDetails = false;
        this.ligneBudgetaireEngagement = new LigneBudgetaire();
        this.engagement = new Engagement();
        this.engagements = [];
        this.engagementsToTransfert = [];
        this.contrats = [];
        this.contrat = new Contrat();
        this.ligneBudget = new LigneBudgetaire();

        this.besoinLigneBudgetaire = new BesoinLigneBudgetaire();
        this.besoinLigneBudgetaires = [];
        this.besoins = [];

        this.lots = [];
        this.lot = new Lot();

        this.exercice = new ExerciceBudgetaire();
        this.exercices = [];

        this.activite = new Activite();
        this.activites = [];

        this.ligneBudgetaires = [];
        this.loadAllSourceFinancement();

        this.exerciceService
            .query()
            .subscribe((res: HttpResponse<IExerciceBudgetaire[]>) => {
                this.exercices = res.body;
            });

        this.activiteService
            .query().subscribe((res: HttpResponse<IActivite[]>) => {
            this.activites = res.body;
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
        this.ligneSelect = new LigneBudgetaireContrat();
        this.loadEngagement();
    }

    onAvisChange() {
            this.contratService
                .findAllContratByAvisDac(this.avisDac.id)
                .subscribe((res: HttpResponse<IContrat[]>) => {
                    this.contrats = res.body;
                });
    }

  loadAllSourceFinancement() {
    this.sourceFinancementService.findAllSourceFinancement().subscribe((res: HttpResponse<ISourceFinancement[]>) => {
      this.sourceFinancements = res.body;
      window.console.log("+++++++===this.sourceFinancements===++++++{}",this.sourceFinancements);
    });
  }

  onShowApprobation() {
    this.sourceFinancement = this.sourceFinancements.find(value => value.libelle === this.contrat.sourceFinancement);
    this.loadContratbyAvisDac();
    this.isApprobation = true;
  }

  onFindContrat(contrat: IContrat[]) {
    if (contrat !== null) {
      this.contrat = contrat[0];
    }
  }

  saveApprobation() {
    this.contrat.wordFlow = WordFlow.APPROUVER;
    this.contrat.ligneBudgetaireContrats = [];
    this.engagementsToTransfert.forEach(v => {
      v.wordFlow = WordFlow.APPROUVER;
    });
    this.engagementService.saveList(this.engagementsToTransfert).subscribe(() => {
      this.loadEngagement();
    });
    this.contratService.update(this.contrat).pipe(takeUntil(this.destroy$))
      .subscribe((res: HttpResponse<IContrat>) => {
        this.showMessage('success', 'APPROBATION', 'Opération effectuée avec succès !', '1');
        window.console.log(res.body);
      }, () => {
        this.showMessage('success', 'APPROBATION', 'Opération effectuée avec succès !', '1');
      });
    this.loadEngagement();
    this.loadContratbyAvisDac();
    this.isApprobation = false;
  }

  loadContratbyAvisDac() {
    this.contratService.findAllContratByAvisDac(this.avisDac.id).subscribe((res: HttpResponse<IContrat[]>) => {
      this.contrats = res.body;
      this.contratApprouveDrowDown = [];
      this.contrats.forEach(value => {
        value.etapeContrat = messageWordFlow(value.wordFlow);
        if (value.wordFlow === WordFlow.RECEPTION_CONTRAT) {
          this.contratApprouveDrowDown.push({label: value.reference, value: value.id});
        }
      });
    });
  }

    onContratChange() {
        this.besoinLigneBudgetaireService.findAllBesoinLigneBudgetaireByActivite(this.avisDac.activiteId)
            .pipe(takeUntil(this.destroy$))
            .subscribe(res => {
                if (res.body) {
                    this.ligneCredits = res.body;
                    this.ligneBudgetaires = this.setValuesLignes(this.ligneCredits);

                }
            });
        this.loadEngagement();
        this.onAvisChange();
    }

  annulerContrat() {
    this.displayContrat = false;
    this.contrat = new Contrat();
    this.isApprobation = false;
  }

    loadEngagement() {
        this.engagementService.findAllBycontrat(this.contrat.id).subscribe(res => {
          this.engagements = res.body.filter(value => value.contratId === this.contrat.id);
              this.engagementApprouveDrowDown = [];
              this.engagementVISACONTROLEURDrowDown = [];
                this.engagements.forEach(v => {
                    v.label = messageWordFlow(v.wordFlow);
                  if (v.wordFlow === WordFlow.APPROUVER) {
                    this.engagementApprouveDrowDown.push({label: v.reference, value: v.id});
                  }
                  if (v.wordFlow === WordFlow.VISA_CONTROLEUR) {
                    this.engagementVISACONTROLEURDrowDown.push({label: v.reference, value: v.id});
                  }
                });
        });
        this.loadContratbyAvisDac();
        this.onAvisChange();
    }

    setValuesLignes(ligneBudgetaires: IBesoinLigneBudgetaire[]): ILigneBudgetaireContrat[] {
        this.ligneBudgetaires = getLigneCredit(ligneBudgetaires, this.contrat.ligneBudgetaireContrats);
        this.ligneBudgetaires = montantDjaEngager(this.ligneBudgetaires, this.engagements);
        this.ligneBudgetaires.forEach(v => {
            v.totalDisponible = (v.montantEstime - v.totalEngage);
        });
        return this.ligneBudgetaires;
    }

    add() {
        this.engagement = new Engagement();
        this.display = true;
        this.display1 = true;
        this.contMontant = 0;
        this.besoinLigneBudgetaires = [];
        this.ligneSelect = new LigneBudgetaireContrat();
    }

    ImprimeEngagemnts(engagement: IEngagement){
      this.besoinLigneBudgetaires.forEach(besoin=>{
        besoin.montantdejaengage =besoin.totalEngage;
        besoin.montantdisponible =besoin.totalDisponible;
      });


      engagement.ligneBudgetaireContrats = this.besoinLigneBudgetaires;
      engagement.reference= this.contrat.reference;


      window.console.log("=========engagement==============");
      window.console.log(engagement.ligneBudgetaireContrats);
      window.console.log("=======================");

        this.reportService
          .ImprimerEngagement(engagement)
          .subscribe(response => window.open(URL.createObjectURL(new Blob([response], {type: 'application/pdf'})), '_blank'));



    }

    save() {
        if (this.besoinLigneBudgetaires[0].totalDisponible < this.besoinLigneBudgetaires[0].montantEngage) {
            this.showMessage('warn', 'Erreur', 'Le montant saisie est superieur au disponible', '1');
        } else {
            this.engagement.montantEngage = this.besoinLigneBudgetaires[0].montantEngage;
            this.engagement.ligneBudgetaireContratId = this.besoinLigneBudgetaires[0].id;
            this.engagement.avisDacId = this.avisDac.id;
            this.engagement.contratId = this.contrat.id;
            this.engagement.wordFlow = WordFlow.ENGAGEMENT;
            if (this.engagement.id !== undefined) {
                this.engagementService.update(this.engagement).subscribe(() => {
                        this.display = false;
                        this.isSaving = false;
                        this.showMessage('success', 'Modification', 'Opération effectuée avec succès !', '1');
                        this.ligneSelect = new LigneBudgetaireContrat();
                        this.loadEngagement();
                        this.ligneBudgetaires = this.setValuesLignes(this.ligneCredits);
                    }, error => {
                        this.showMessage('warn', 'Erreur', objectResponseMessage(error), '1');
                    }
                );
            } else {
                this.engagementService.create(this.engagement).subscribe(() => {
                    this.display = false;
                    this.isSaving = false;
                    this.showMessage('success', 'Enregistrement', 'Opération effectuée avec succès !', '1');
                    this.loadEngagement();
                    this.ligneBudgetaires = this.setValuesLignes(this.ligneCredits);
                }, error => {
                    this.showMessage('warn', 'Erreur', objectResponseMessage(error), '1');
                });
            }
        }
    }

    sup(modif: IEngagement) {
        this.confirmationService.confirm({
            header: 'Confirmation',
            message: 'Etes-vous sûr de vouloir supprimer ?',
            accept: () => {
                if (modif === null) {
                    return;
                } else {
                    modif.deleted = true;
                    this.engagementService.update(modif).subscribe(
                        () => {
                            // this.loadAll();
                            this.showMessage('success', 'SUPPRESSION', 'Suppression effectuée avec succès !', '1');
                        },
                        () => this.showMessage('error', 'SUPPRESSION', 'Echec de la suppression !', '1')
                    );
                }
            }
        });
    }

    showMessage(sever: string, sum: string, det: string, myKey: string) {
        this.messageService.add({
            severity: sever,
            summary: sum,
            detail: det,
            key: myKey
        });
    }

    modif(engagement: IEngagement) {
        this.engagement = engagement;
        this.besoinLigneBudgetaires = [];
        const ligne = this.ligneBudgetaires.find(v => v.id === engagement.ligneBudgetaireContratId);
        if (ligne) {
            ligne.montantEngage = engagement.montantEngage;
            this.besoinLigneBudgetaires.push(ligne);
        }

        /* this.besoinLigneBudgetaires = setMontantEngager(engagement, this.besoinLigneBudgetaires);
        this.besoinLigneBudgetaires = montantDjaEngager(this.besoinLigneBudgetaires, this.engagements);
        this.besoinLigneBudgetaires.forEach(v => {
            v.totalDisponible = (v.montantEstime - v.totalEngage);
        }); */
        this.display = true;
    }

     imprimer(engagement: IEngagement) {
        this.engagement = engagement;
        this.besoinLigneBudgetaires = [];
        const ligne = this.ligneBudgetaires.find(v => v.id === engagement.ligneBudgetaireContratId);
        if (ligne) {
            ligne.montantEngage = engagement.montantEngage;
            this.besoinLigneBudgetaires.push(ligne);
        }

        this.displayDetails = true;
    }

  annulerDetail() {
    this.displayDetails = false;
  }


    sendToCF() {
        this.confirmationService.confirm({
            header: 'Confirmation',
            message: 'Etes-vous sûr de Transférer ?',
            accept: () => {
                this.engagementsToTransfert.forEach(v => {
                    v.wordFlow = WordFlow.VISA_CONTROLEUR;
                });
                this.engagementService.saveList(this.engagementsToTransfert).subscribe(() => {
                    this.showMessage('success', 'TRANSFERT', 'Opération effectuée avec succès !', '1');
                    this.loadEngagement();
                });
            }
        });
    }

    imputer() {
        if (this.besoinLigneBudgetaires) {
            this.ligneSelect = this.besoinLigneBudgetaires[0];
        }
        this.isImputation = true;
    }

    closeImputation() {
        this.isImputation = false;
    }

    addLigne() {
        this.besoinLigneBudgetaires = [];
        this.besoinLigneBudgetaires.push(this.ligneSelect);
        this.isImputation = false;
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
      this.contrat.files = this.files;
    }
  }

  getFiles(contrat: IContrat) {
    this.isLoading = true;
    this.contratTMP = contrat;
    this.contratService.find(contrat.id).subscribe((res: HttpResponse<IContrat>) => {
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
        this.fileManagerService.deleteFile(this.contratTMP.id, TypeDossier.CONTRAT, file.fileName).subscribe(() => {
          this.showMessage('success', 'Suppression de fichier', 'Fichier supprimé avec succès','1');
          this.getFiles(this.contratTMP);
        }, () => {
          this.showMessage('warn', 'Suppression de fichier', 'Echec de suppression','1');
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
      this.contratTMP.files = this.files;
    }
  }

  addFile(vale) {
    if (vale != null && this.fileListe.length !== 0) {
      this.isSaving = true;
      this.contratService.update(this.contratTMP).subscribe(() => {
        this.fileListe = undefined;
        this.getFiles(this.contratTMP);
        this.isSaving = false;
        this.showMessage('success', 'Chargement de fichiers', 'Le chargement des fichiers effectué avec succès','1');
      }, () => {
        this.isSaving = false;
        this.showMessage('warn', 'Erreur', 'Le chargement des fichiers à echouer','1');
      });
    }
  }

  ImprimerContrat() {
    window.console.log(this.contrat);
    this.reportService
      .ImprimerContrat(this.contrat)
      .subscribe(response => window.open(URL.createObjectURL(new Blob([response], {type: 'application/pdf'})), '_blank'));
  }

}
