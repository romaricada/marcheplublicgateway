import {Component, OnInit, OnDestroy} from '@angular/core';
import {HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';

import {Observable, Subject, Subscription} from 'rxjs';

import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {ImportExportService} from 'app/entities/microserviceppm/import-export/import-export.service';
import {ILigneBudgetaire, LigneBudgetaire} from 'app/shared/model/microserviceppm/ligne-budgetaire.model';
import {ITEMS_PER_PAGE} from 'app/shared/constants/pagination.constants';
import {AeCp} from 'app/shared/model/enumerations/ae-cp.model';

import {ConfirmationService, MessageService, MenuItem} from 'primeng/api';

import {IExerciceBudgetaire} from 'app/shared/model/microserviceppm/exercice-budgetaire.model';
import {ExerciceBudgetaireService} from 'app/entities/microserviceppm/exercice-budgetaire/exercice-budgetaire.service';

import {saveAs} from 'file-saver';

import {IBesoinLigneBudgetaire} from 'app/shared/model/microserviceppm/besoin-ligne-budgetaire.model';
import {IUniteAdministrative} from 'app/shared/model/microserviceppm/unite-administrative.model';

import {UniteAdministrativeService} from '../unite-administrative/unite-administrative.service';

import {LigneBudgetaireService} from './ligne-budgetaire.service';
import {select, Store} from "@ngrx/store";
import {selectetExerciceCourant} from "app/store/selector";
import {takeUntil} from "rxjs/operators";
import {IAvisDac} from "app/shared/model/microservicedaccam/avis-dac.model";
import {State} from "app/store/reducers";
import {AvisDacService} from "app/entities/microservicedaccam/avis-dac/avis-dac.service";

@Component({
    selector: 'jhi-ligne-budgetaire',
    templateUrl: './ligne-budgetaire.component.html',
    styleUrls: ['./ligne-budgetaire.component.scss']
})
export class LigneBudgetaireComponent implements OnInit, OnDestroy {
    ligneBudgetaires: ILigneBudgetaire[];
    besoinligneBudgetaireTMP: IBesoinLigneBudgetaire[];
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
    displayAdd: boolean;
    isSaving: boolean;
    ligneBudgetaire: ILigneBudgetaire;
    ligneSelect: ILigneBudgetaire[];
    displaySuppri: boolean;
    exercices: IExerciceBudgetaire[];
    uniteadministratives: IUniteAdministrative[];
    uniteAdministrative: IUniteAdministrative;
    exercice: IExerciceBudgetaire;
    typeAeCps = [{libelle: 'AE', value: AeCp.AE}, {libelle: 'CP', value: AeCp.CP}];
    type: any;
    fichier: File;
    reference: string;
    display: boolean;
    isReloade: boolean;
    items: MenuItem[];
    destroy$: Subject<boolean> = new Subject<boolean>();
    avisDacs: IAvisDac[];
    avisDac: IAvisDac;


    constructor(
        protected ligneBudgetaireService: LigneBudgetaireService,
        protected parseLinks: JhiParseLinks,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        protected eventManager: JhiEventManager,
        protected messageService: MessageService,
        protected confirmationService: ConfirmationService,
        protected jhiAlertService: JhiAlertService,
        protected exerciceBudgetaireService: ExerciceBudgetaireService,
        protected uniteAdministrativeService: UniteAdministrativeService,
        protected importExportService: ImportExportService,
        protected avisDacService: AvisDacService,
        protected store: Store<State>
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
    }

    loadAll() {
        this.ligneBudgetaireService.findAllByExercice(this.getAnneeId()).subscribe((res: HttpResponse<ILigneBudgetaire[]>) => {
            this.ligneBudgetaires = res.body;
        });
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/ligne-budgetaire'], {
            queryParams: {
                page: this.page,
                size: this.itemsPerPage,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    clear() {
        this.page = 0;
        this.router.navigate([
            '/ligne-budgetaire',
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }

    ngOnInit() {
        this.exercice = null;
        this.loadAll();
        this.displayAdd = false;
        this.displaySuppri = false;
        this.ligneSelect = [];
        this.besoinligneBudgetaireTMP = [];
        this.type = undefined;
        this.registerChangeInLigneBudgetaires();
        this.ligneBudgetaire = new LigneBudgetaire();
        this.exerciceBudgetaireService
            .query()
            .subscribe(
                (res: HttpResponse<ILigneBudgetaire[]>) => (this.exercices = res.body),
                (res: HttpErrorResponse) => this.onError(res.message)
            );

        this.uniteAdministrativeService
            .findAll()
            .subscribe(
                (res: HttpResponse<IUniteAdministrative[]>) => (this.uniteadministratives = res.body),
                (res: HttpErrorResponse) => this.onError(res.message)
            );

        this.items = [
            {
                label: 'Exporter un model de budget',
                icon: 'pi pi-fw pi-file',
                command: () => {
                    this.exportModel();
                }
            },
            {
                label: 'Importer un budget',
                icon: 'pi pi-fw pi-file',

                command: () => {
                    this.displayModal();
                }
            }
        ];

        this.store.pipe(select(selectetExerciceCourant)).pipe(takeUntil(this.destroy$))
            .subscribe(exercice => {
                if (exercice) {
                    this.exercice = exercice;
                    this.actualisation();

                    this.ligneBudgetaireService.findAllByExercice(this.getAnneeId()).subscribe((res: HttpResponse<ILigneBudgetaire[]>) => {
                        this.ligneBudgetaires = res.body;
                    });
                }
            });
        this.registerChangeInLigneBudgetaires();
    }

    actualisation() {
        this.avisDacs = [];
        this.avisDac = null;
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInLigneBudgetaires() {
        this.eventSubscriber = this.eventManager.subscribe('ligneBudgetaireListModification', () => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    protected paginateLigneBudgetaires(data: ILigneBudgetaire[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.ligneBudgetaires = data;
    }

    add(ligneBudgetaire: ILigneBudgetaire) {
        ligneBudgetaire === null ? (this.ligneBudgetaire = new LigneBudgetaire()) : (this.ligneBudgetaire = ligneBudgetaire);
        this.displayAdd = true;
    }

    previousState() {
        this.displayAdd = false;
    }

    save() {
        this.isSaving = true;
        this.ligneBudgetaire.section = '23';
        if (this.ligneBudgetaire.id !== undefined) {
          this.subscribeToSaveResponse(this.ligneBudgetaireService.update(this.ligneBudgetaire));
        } else {
          this.subscribeToSaveResponse(this.ligneBudgetaireService.create(this.ligneBudgetaire));
        }

    }

    protected  subscribeToSaveResponse(result: Observable<HttpResponse<ILigneBudgetaire>>) {
        result.subscribe(
            () => {
                this.message('myKey1', 'success', 'ENREGISTREMENT', 'Ligne budgetaire ajouté avec succès!!!');
                this.onSaveSuccess();
            },
            () => {
                this.message('myKey2', 'error', 'ENREGISTREMENT', "Echec de l'enregistrement!!!");
                this.onSaveError();
            }
        );
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.loadAll();
        this.displayAdd = false;
    }

    protected onSaveError() {
        this.isSaving = false;
        this.displayAdd = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    message(cle: string, severite: string, resume: string, detaille: string) {
        this.messageService.add({key: cle, severity: severite, summary: resume, detail: detaille});
    }

    supprimer() {
        this.displaySuppri = true;
    }

    annulle() {
        this.displaySuppri = false;
        this.displayAdd = false;
    }

    deleteAll(ligneSelect) {
        this.ligneBudgetaireService.updateAll(ligneSelect).subscribe(
            () => {
                this.loadAll();
                this.showMessage('success', 'SUPPRESSION', 'Suppression effectuée avec succès !!!');
            },
            () => this.showMessage('error', 'SUPPRESSION', 'Echec de la suppression !!!')
        );
        this.displaySuppri = false;
    }

    showMessage(sever: string, sum: string, det: string) {
        this.messageService.add({
            severity: sever,
            summary: sum,
            detail: det
        });
    }

    getAnneeId(): number {
        if (this.exercice !== null) {
            return this.exercice.id;
        } else {
            return 0;
        }
    }

    supprimerElement(lignebudgetaire: ILigneBudgetaire) {
        this.confirmationService.confirm({
            header: 'Confirmation',
            message: 'Etes-vous sûr de vouloir supprimer ?',
            accept: () => {
                if (lignebudgetaire === null) {
                    return;
                } else {
                    this.ligneBudgetaireService.findbesoin(lignebudgetaire.id).subscribe((rest: HttpResponse<IBesoinLigneBudgetaire[]>) => {
                        this.besoinligneBudgetaireTMP = rest.body;
                        if (this.besoinligneBudgetaireTMP.length > 0) {
                            this.showMessage('error', 'SUPPRESSION IMPOSSIBLE', 'Ligne déjà utilisée dans un sous PPM !!');
                        } else {
                          window.console.log("====================Dans la fonction de supression=====================");
                          window.console.log(lignebudgetaire);
                          window.console.log("====================Dans la fonction de supression=====================");
                            lignebudgetaire.deleted = true;
                            window.console.log("====================Dans la fonction de supression=====================");
                            this.ligneBudgetaireService.update(lignebudgetaire).subscribe(
                                () => {
                                    this.loadAll();
                                    this.showMessage('success', 'SUPPRESSION', 'Suppression effectuée avec succès !');
                                },
                                () => this.showMessage('error', 'SUPPRESSION', 'Echec de la suppression !')
                            );
                        }
                    });
                }
            }
        });
    }

    displayModal() {
        this.display = true;
        this.fichier = null;
        this.isSaving = false;
        // this.isReloade = false;
        this.reference = '';
    }

    saveImportation() {
        this.isSaving = true;
        this.importExportService.importDataBudget(this.exercice.id, this.uniteAdministrative.id, this.fichier, this.isReloade).subscribe(
            () => {
                this.display = false;
                this.showMessage('success', 'Information', 'Importation effectée avec succès !');
                this.loadAll();
            },
            () => {
                this.isSaving = false;
                this.showMessage('error', 'Avertissement', "Une erreur a survenue lors de l'importation du budget !");
            }
        );
    }

    importData() {
        const isExiste =
            this.ligneBudgetaires.some(
                value => value.annee === this.exercice.annee && value.uniteAdministrativeId === this.uniteAdministrative.id
            ) || null;
        if (isExiste) {
            this.isReloade = true;
            this.showMessage('info', 'Information', "Un budget a été déjà importé pour l'exercice  " + this.exercice.annee + '!');
        } else {
            this.isReloade = false;
            this.saveImportation();
        }
    }

    setFileData(event) {
        if (event.target.files.length > 0) {
            this.fichier = event.target.files[0];
        }
    }

    closeModal() {
        this.display = false;
    }

    exportModel() {
        this.importExportService.exportBudgetModel().subscribe(
            value => {
                const filename = value.headers.get('filename');
                this.saveFile(value.body, filename, value.headers.get('content-type'));
            },
            () => {
                this.showMessage('warn', 'Erreur', 'Erreur de téléchargement du model ppm !');
            }
        );
    }

    saveFile(data: any, filename?: string, type?: string) {
        const blob = new Blob([data], {type: `${type}; charset=utf-8`});
        saveAs(blob, filename);
    }

    verifier() {
        if (
            this.ligneBudgetaire.dotCorAE < 0 ||
            this.ligneBudgetaire.dotInitAE < 0 ||
            this.ligneBudgetaire.dotCorCP < 0 ||
            this.ligneBudgetaire.dotInitCP < 0
        ) {
            this.isSaving = true;
        } else {
            this.isSaving = false;
        }
    }

  verifyChapitre(): void {
    if (this.ligneBudgetaire.chapitre.length !== 10) {
      this.message('myKey1', 'error', 'ERREUR', 'Le chapitre doit forcément comporté 10 chiffres !!!');
      this.ligneBudgetaire.chapitre =  null;
    }
  }

  verifyAction(): void {
    if (this.ligneBudgetaire.action.length !== 5) {
      this.message('myKey1', 'error', 'ERREUR', 'action doit forcément comporté 5 chiffres !!!');
      this.ligneBudgetaire.action =  null;
    }
  }

  verifyActivite(): void {
    if (this.ligneBudgetaire.activite.length !== 7) {
      this.message('myKey1', 'error', 'ERREUR', 'Activité doit forcément comporté 7 chiffres !!!');
      this.ligneBudgetaire.activite =  null;
    }
  }

  verifyArticle(): void {
    if (this.ligneBudgetaire.article.length !== 2) {
      this.message('myKey1', 'error', 'ERREUR', 'Article doit forcément comporté 2 chiffres !!!');
      this.ligneBudgetaire.article =  null;
    }
  }

  verifyParagraphe(): void {
    if (this.ligneBudgetaire.paragraphe.length !== 3) {
      this.message('myKey1', 'error', 'ERREUR', 'Le paragraphe doit forcément comporté 3 chiffres !!!');
      this.ligneBudgetaire.paragraphe =  null;
    }
  }

    filterData() {}
}
