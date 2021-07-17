import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpHeaders, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subject, Subscription} from 'rxjs';
import {JhiDataUtils, JhiEventManager, JhiParseLinks} from 'ng-jhipster';
import {Depouillement, IDepouillement} from 'app/shared/model/microservicedaccam/depouillement.model';
import {ITEMS_PER_PAGE} from 'app/shared/constants/pagination.constants';
import {DepouillementService} from './depouillement.service';
import {IExerciceBudgetaire} from 'app/shared/model/microserviceppm/exercice-budgetaire.model';
import {ILot} from 'app/shared/model/microservicedaccam/lot.model';
import {ExerciceBudgetaireService} from 'app/entities/microserviceppm/exercice-budgetaire/exercice-budgetaire.service';
import {LotService} from 'app/entities/microservicedaccam/lot/lot.service';
import {CandidatLotService} from 'app/entities/microservicedaccam/candidat-lot/candidat-lot.service';
import {CandidatLot, ICandidatLot} from 'app/shared/model/microservicedaccam/candidat-lot.model';
import {Candidat, ICandidat} from 'app/shared/model/microservicedaccam/candidat.model';
import {IPieceCandidat} from 'app/shared/model/microservicedaccam/piece-candidat.model';
import {ConfirmationService, MessageService, SelectItem} from 'primeng/api';
import {CandidatCautionLot, ICandidatCautionLot} from 'app/shared/model/microservicedaccam/candidatCautionLot.model';
import {TypeCautionService} from 'app/entities/microservicedaccam/type-caution/type-caution.service';
import {ITypeCaution} from 'app/shared/model/microservicedaccam/typeCaution.model';
import {Caution, ICaution} from 'app/shared/model/microservicedaccam/caution.model';
import {CautionService} from 'app/entities/microservicedaccam/caution/caution.service';
import {FileMenagerService} from 'app/entities/file-manager/file-menager.service';
import {TypeDossier} from 'app/shared/model/enumerations/typeDossier';
import {Fichier} from 'app/entities/file-manager/file-menager.model';
import {DataUtils} from 'app/entities/file-manager/dataUtils';
import {CandidatService} from 'app/entities/microservicedaccam/candidat/candidat.service';
import {
    IInstitutionFinanciere,
    InstitutionFinanciere
} from "app/shared/model/microservicedaccam/institutionFinanciere.model";
import {InstitutionFinanciereService} from "app/entities/microservicedaccam/institutionFinanciere/institutionFinanciere.service";
import {AvisDac, IAvisDac} from 'app/shared/model/microservicedaccam/avis-dac.model';
import {AvisDacService} from 'app/entities/microservicedaccam/avis-dac/avis-dac.service';
import {select, Store} from "@ngrx/store";
import {selectetExerciceCourant} from "app/store/selector";
import {takeUntil} from "rxjs/operators";
import {State} from "app/store/reducers";
import {ReportService} from "app/entities/microservicedaccam/reports/reportService";

@Component({
    selector: 'jhi-depouillement',
    templateUrl: './depouillement.component.html',
    styleUrls: ['./depouillement.scss']
})
export class DepouillementComponent implements OnInit, OnDestroy {
    depouillements: IDepouillement[];
    depouillement: IDepouillement;
    dateDp: any;
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    totalItems: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    exercices: IExerciceBudgetaire[];
    exercice: IExerciceBudgetaire;
    avisDac: IAvisDac;
    avisDacs: IAvisDac[];
    lots: ILot[];
    lotsSelected: ICandidatLot[];
    display: boolean;
    displayCaution: boolean;
    isSaving: boolean;
    etat: boolean;
    caution: ICaution;
    displaySoumissionnaireModal: boolean;
    candidatLots: ICandidatLot[];
    candidatLot: ICandidatLot;
    soumissionnairesSelected: ICandidatLot[];
    candidatLotTemp: ICandidatLot;
    pieceCandiats: IPieceCandidat[];
    pieceCandiatsTemp: IPieceCandidat[];
    pieceCandiatsSelected: IPieceCandidat[];
    candidatCautionLot: ICandidatCautionLot;
    typeCautions: ITypeCaution[];
    cautions: Caution[];
    actif: boolean;
    infructueux: boolean;
    invalideLot: boolean;
    fichiers: FileList;
    showFicModal: boolean;
    headers: HttpHeaders;
    fileListe: FileList;
    depouillementTMP: IDepouillement;
    file: Fichier;
    files: Fichier[];
    dataFiles: Fichier[];
    isLoading: boolean;
    candidats: ICandidat[];
    lotModal: boolean;
    lotAndCautionModal: boolean;
    candidatTMP: ICandidat;
    lotTMP: ILot;
    index: number;
    nbrsLots: any;
    ajout = false;
    institutionFinanciere: IInstitutionFinanciere;
    institutionFinancieres: IInstitutionFinanciere[];
    soumissionnaires: ICandidatLot[];
    destroy$: Subject<boolean> = new Subject<boolean>();
    types: SelectItem[];
     selectedType: string;
     type: any;

  constructor(
        protected depouillementService: DepouillementService,
        protected parseLinks: JhiParseLinks,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        protected eventManager: JhiEventManager,
        protected exerciceService: ExerciceBudgetaireService,
        protected avisDacService: AvisDacService,
        protected candidatLotService: CandidatLotService,
        protected candidatService: CandidatService,
        protected lotService: LotService,
        protected reportService: ReportService,
        protected messageService: MessageService,
        protected institutionFinanciereService: InstitutionFinanciereService,
        protected confirmationService: ConfirmationService,
        protected typeCautionService: TypeCautionService,
        protected cautionService: CautionService,
        protected fileManagerService: FileMenagerService,
        protected dataUtils: JhiDataUtils,
        protected fileUtils: DataUtils,
        protected store: Store<State>

    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });

        this.types = [];
        this.types.push({label: 'TTC', value: 'TTC', icon: 'fa fa-fw fa-cc-mastercard'});
        this.types.push({label: 'HT/HD', value: 'HT/HD', icon: 'fa fa-fw fa-cc-paypal'});
        this.types.push({label: 'H TVA', value: 'H TVA', icon: 'fa fa-fw fa-cc-visa'});
        this.type = this.types.find(value => value.label === 'TTC');
    }

    loadAll(activiteId: number) {
        this.depouillementService
            .query(activiteId, {
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe((res: HttpResponse<IDepouillement[]>) => {
                this.paginateDepouillements(res.body, res.headers)
            });
    }

    init() {
        this.exercice = null;
        this.avisDac = null;
        this.display = false;
        this.index = 0;
        this.displayCaution = false;
        this.isSaving = false;
        this.actif = true;
        this.isLoading = true;
        this.etat = false;
        this.lotModal = false;
        this.lotAndCautionModal = false;
        this.invalideLot = false;
        this.showFicModal = false;
        this.infructueux = false;
        this.displaySoumissionnaireModal = false;
        this.depouillement = new Depouillement();
        this.depouillement.candidats = [];
        this.loadAllExercice();
        this.loadAllTypeCaution();
        this.loadInstitutionBancaire();
        this.candidatLots = [];
        this.files = [];
        this.lots = [];
        this.pieceCandiats = [];
        this.pieceCandiatsTemp = [];
        this.pieceCandiatsSelected = [];
        this.soumissionnairesSelected = [];
        this.candidatLotTemp = new CandidatLot();
        this.candidatCautionLot = new CandidatCautionLot();
        this.candidatLot = new CandidatLot();
        this.candidatLot.candidat = new Candidat();
    }

    imprimer() {

    this.reportService.ImprimerDepouille(this.depouillements).subscribe(response => window.open(URL.createObjectURL(new Blob([response], {type: 'application/pdf'})), '_blank'));

    }
    ajouter(): void {
        if (!this.ajout) {
            this.candidatCautionLot.institutionFinanciere = null;
            this.ajout = true;
        } else {
            this.candidatCautionLot.institutionFinanciere = null;
            this.ajout = false;
        }
    }

    loadAllTypeCaution() {
        this.typeCautionService.query().subscribe((res: HttpResponse<ITypeCaution[]>) => {
            this.typeCautions = res.body;
        });
    }

    loadInstitutionBancaire() {
        this.institutionFinanciereService.findAllInstitutions().subscribe((res: HttpResponse<InstitutionFinanciere[]>) => {
            this.institutionFinancieres = res.body;
        });
    }

    ngOnInit() {
        this.init();
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
        this.registerChangeInDepouillements();
    }

    actualisation() {
        this.avisDacs = [];
        this.avisDac = null;
        this.depouillements = [];
    }

    loadAllExercice() {
        this.exerciceService.findAllWithoutPage().subscribe((res: HttpResponse<IExerciceBudgetaire[]>) => {
            this.exercices = res.body;
        });
    }

    exerciciceChange() {
        this.avisDacService.findListAvisDacByExercice(this.getExerciceId()).subscribe((res: HttpResponse<AvisDac[]>) => {
            if (res.body.length > 0) {
                res.body.forEach(value => {
                    value.nomAvisDac = value.numeroAvis + ' ' + value.objet;
                });
                this.avisDacs = res.body;
            }
            window.console.log(this.avisDacs);
        });
    }

    getExerciceId(): number {
        if (this.exercice !== null) {
            return this.exercice.id;
        } else {
            return 0;
        }
    }

    getAvisDacId(): number {
        if (this.avisDac !== null) {
            return this.avisDac.id;
        } else {
            return 0;
        }
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDepouillement) {
        return item.id;
    }

    registerChangeInDepouillements() {
        this.eventSubscriber = this.eventManager.subscribe('depouillementListModification', () => this.loadAll(this.getAvisDacId()));
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    protected paginateDepouillements(data: IDepouillement[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.depouillements = data;
        if (this.depouillements.length > 0) {
            this.invalideLot = false;
        }

    }

    showModal() {
        this.lotsSelected = null;
        this.lots = [];
        this.depouillement = new Depouillement();
        this.depouillement.candidats = [];
        this.isSaving = false;
        this.findAllCandidatByAvisDac(this.getAvisDacId());
        this.display = true;
    }

    initLot(candidatId, avisDacId: number) {
        this.candidatLotService.iniLot(candidatId, avisDacId).subscribe((res: HttpResponse<ICandidatLot[]>) => {
            this.candidatLots = res.body;
            if (this.candidatLots.some(value => value.lot.infructueux === true)) {
                this.invalideLot = true;
            }
        });
    }

    annuler() {
        this.display = false;
    }

    annulerSomissionaire() {
        this.displaySoumissionnaireModal = false;
        this.soumissionnairesSelected = [];
    }

    filterDepouillement() {
        this.loadAll(this.getAvisDacId());
    }

    findAllCandidatByAvisDac(avisDacId: number) {
        if (this.depouillement.id === undefined) {
            this.candidatService.findAllByAvisDac(avisDacId).subscribe((res: HttpResponse<ICandidat[]>) => {
                this.depouillement.candidats = res.body;
            });
        }
    }

    showSoumissionnaireModal() {
        this.isSaving = false;
        this.candidatLot = new CandidatLot();
        this.candidatLot.candidat = new Candidat();
        this.lotService.findLotByAvisDac(this.getAvisDacId()).subscribe((res: HttpResponse<ILot[]>) => {
            this.lots = res.body;
            this.nbrsLots = this.lots.length;
        });
        this.displaySoumissionnaireModal = true;
    }


    saveSoumissionaire() {
        this.candidatLot.dossierPaye = false;
        this.candidatLot.retenu = false;
        this.candidatLotService.create(this.candidatLot).subscribe((res: HttpResponse<ICandidatLot>) => {
            this.candidatService.find(res.body.candidatId).subscribe((candidat: HttpResponse<ICandidat>) => {
                this.candidatLots.forEach(value => {
                    if (this.candidatLot.lots.some(value1 => value1.id === value.lotId)) {
                        candidat.body.soumisionniares.push(value);
                    }
                });
                this.depouillement.candidats.push(candidat.body);
            });
            this.displaySoumissionnaireModal = false;
        });
    }

    addCandidat() {
        this.candidatLot = new CandidatLot();
        this.candidatLot.candidat = new Candidat();
        // this.candidatLot.lotId = this.lotsSelected.id;
        this.candidatLots.push(this.candidatLot);
    }

    save() {
        window.console.log(this.depouillement);
        this.isSaving = true;
        if (this.depouillement.id !== undefined) {
            this.subscribeToSaveResponse(this.depouillementService.update(this.depouillement));
        } else {
            this.depouillement.avisDacId = this.avisDac.id;
            this.subscribeToSaveResponse(this.depouillementService.create(this.depouillement));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IDepouillement>>) {
        result.subscribe(() => {
            this.onSaveSuccess();
        }, () => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.display = false;
        if (this.depouillement.id !== undefined) {
            this.message('success', 'Modification', 'Modification effectuée avec succès.');
        } else {
            this.message('success', 'Enregistrement', 'Enregistrement effectué avec succès.');
        }
        this.filterDepouillement();
        this.candidatLots = [];
    }

    protected onSaveError() {
        this.message('warn', 'Erreur', 'Echec de l\'enregistrement');
        this.isSaving = false;
    }

    updateDepouillement(depouillement) {
        this.lots = [];
        this.lotsSelected = [];
        this.depouillement = depouillement;
        this.display = true;
    }

    supprimerDepouillement(depouillement: IDepouillement) {
        this.confirmationService.confirm({
            message: 'Êtes vous sûr de vouloir supprimer?',
            accept: () => {
                depouillement.deleted = true;
                this.depouillementService.update(depouillement).subscribe(() => {
                    this.loadAll(this.getAvisDacId());
                });
            }
        });
    }

    findCautionByLot() {
        this.cautionService.findAllByLot(this.lotTMP.id).subscribe((res: HttpResponse<ICaution[]>) => {
            this.cautions = res.body;
        });
    }

    updateEngagement(candidat, candidatLot) {
        this.candidatCautionLot = new CandidatCautionLot();
        this.candidatTMP = candidat;
        this.lotTMP = candidatLot.lot;
        this.displayCaution = true;
    }

    annulerCaution() {
        this.displayCaution = false;
    }

    validerEngagement() {
    this.candidatCautionLot.typeDeMontant = this.type.label;
        this.soumissionnaires.forEach(candidaLot => {
            if (candidaLot.lotId === this.lotTMP.id) {
                candidaLot.candidatCautionLots = [];
                candidaLot.candidatCautionLots.push(this.candidatCautionLot);
            }
        });

        window.console.log("++++++++====+++++++++{}",this.soumissionnaires)
        this.displayCaution = false;
    }

    removeLot(index) {
        this.soumissionnaires.splice(index, 1);
    }

    message(severite: string, resume: string, detaille: string) {
        this.messageService.add({key: 'key', severity: severite, summary: resume, detail: detaille});
    }

    /* showInfructueuxModal() {
      if (this.lots.length !== 0) {
        this.lots = this.lots.filter(value => value.infructueux);
      }
      this.display = true;
    } */

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
            this.depouillement.files = this.files;
        }
    }

    getFiles(depouillement: IDepouillement) {
        this.isLoading = true;
        this.depouillementTMP = depouillement;
        this.depouillementService.find(depouillement.id).subscribe((res: HttpResponse<IDepouillement>) => {
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
                this.fileManagerService.deleteFile(this.depouillementTMP.id, TypeDossier.DEPOUILLEMENT, file.fileName).subscribe(() => {
                    this.message('success', 'Suppression de fichier', 'Fichier supprimé avec succès');
                    this.getFiles(this.depouillementTMP);
                }, () => {
                    this.message('warn', 'Suppression de fichier', 'Echec de suppression');
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
            this.depouillementTMP.files = this.files;
        }
    }

    addFile(vale) {
        if (vale != null && this.fileListe.length !== 0) {
            this.isSaving = true;
            this.depouillementService.update(this.depouillementTMP).subscribe(() => {
                this.fileListe = undefined;
                this.getFiles(this.depouillementTMP);
                this.isSaving = false;
                this.message('success', 'Chargement de fichiers', 'Le chargement des fichiers effectué avec succès');
            }, () => {
                this.isSaving = false;
                this.message('warn', 'Erreur', 'Le chargement des fichiers à echouer');
            });
        }
    }

    /**
     * Pour ajouter les lots et caution du soummionnaire.
     * @param candidat
     */
    addLot(candidat) {
        this.candidatTMP = candidat;
        this.initLot(candidat.id, this.getAvisDacId());
        this.lotAndCautionModal = true;
    }

    closeLotAncautionModal() {
        this.soumissionnaires = [];
        this.lotAndCautionModal = false;
    }

    /**
     * Methode pour afficher et selectionner la liste des lots de l'avis.
     */
    onSelect() {
        this.lotsSelected = this.candidatTMP.soumisionniares;
        this.candidatTMP.soumisionniares = [];
        this.lotModal = true;
    }

    annulerLot() {
        this.lotModal = false;
    }

    validerLot() {
        this.depouillement.candidats.forEach(value => {
            if (value.id === this.candidatTMP.id) {
                value.soumisionniares = this.soumissionnaires;
            }
        });
        this.soumissionnaires = [];
        this.lotAndCautionModal = false;
    }

    /**
     * Ajout des lot actualisé du soummisionnaire
     */
    ajoutLotSoumissione() {
        this.soumissionnaires = this.lotsSelected;
        this.lotsSelected = [];
        this.lotModal = false;
        window.console.log(this.soumissionnaires);
    }

    updateLotCaution(candidat) {
        this.candidatTMP = candidat;
        this.soumissionnaires = this.candidatTMP.soumisionniares;
        this.initLot(candidat.id, this.getAvisDacId());
        this.lotAndCautionModal = true;
    }

  retirerCandidat(index){
      this.depouillement.candidats.splice(index,1);
  }

}
