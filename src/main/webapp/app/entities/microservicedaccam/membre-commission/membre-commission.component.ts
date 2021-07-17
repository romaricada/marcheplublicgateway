import {Component, OnInit, OnDestroy} from '@angular/core';
import {HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subject, Subscription} from 'rxjs';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {IMembreCommission, MembreCommission} from 'app/shared/model/microservicedaccam/membre-commission.model';
import {ITEMS_PER_PAGE} from 'app/shared/constants/pagination.constants';
import {MembreCommissionService} from './membre-commission.service';
import {IActivite} from 'app/shared/model/microserviceppm/activite.model';
import {IMembre, Membre} from 'app/shared/model/microservicedaccam/membre.model';
import {ActiviteService} from 'app/entities/microserviceppm/activite/activite.service';
import {MembreService} from 'app/entities/microservicedaccam/membre/membre.service';
import {ITache} from 'app/shared/model/microservicedaccam/tache.model';
import {ITypeCommission, TypeCommission} from 'app/shared/model/microservicedaccam/type-commission.model';
import {TypeCommissionService} from 'app/entities/microservicedaccam/type-commission/type-commission.service';
import {ConfirmationService, MessageService, SelectItem} from 'primeng/api';
import {Poste} from 'app/shared/model/enumerations/poste.model';
import {IUniteAdministrative} from "app/shared/model/microserviceppm/unite-administrative.model";
import {UniteAdministrativeService} from "app/entities/microserviceppm/unite-administrative/unite-administrative.service";
import {IExerciceBudgetaire} from "app/shared/model/microserviceppm/exercice-budgetaire.model";
import {ExerciceBudgetaireService} from "app/entities/microserviceppm/exercice-budgetaire/exercice-budgetaire.service";
import {takeUntil} from "rxjs/operators";
import {AvisDacService} from "app/entities/microservicedaccam/avis-dac/avis-dac.service";
import {AvisDac, IAvisDac} from "app/shared/model/microservicedaccam/avis-dac.model";
import {select, Store} from "@ngrx/store";
import {selectetExerciceCourant} from "app/store/selector";
import {State} from "app/store/reducers";

@Component({
    selector: 'jhi-membre-commission',
    templateUrl: './membre-commission.component.html'
})
export class MembreCommissionComponent implements OnInit, OnDestroy {
    membreCommissions: IMembreCommission[];
    membreCommisionSelected: IMembreCommission[];
    membreCommission: IMembreCommission;
    activites: IActivite[];
    membre: IMembre;
    membres: IMembre[];
    membreses: IMembre[];
    membress: IMembre[];
    tache: ITache;
    uniteadministratives: IUniteAdministrative[];
    dropDownuniteadministratives: Array<SelectItem>;
    taches: ITache[];
    typeCommission: ITypeCommission;
    typeCommission1: ITypeCommission;
    typeCommission2: ITypeCommission[];
    typeCommissions: ITypeCommission[];
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
    display: boolean;
    isSaving: boolean;
    displayDelete: boolean;
    deteteTexte: string;
    displayLigne: boolean;
    j: number;
    isSavinge: boolean;
    curentExercice: IExerciceBudgetaire;
    exercice: IExerciceBudgetaire;
    destroy$: Subject<boolean> = new Subject<boolean>();
    exercices: IExerciceBudgetaire[];
    avisDacs: IAvisDac[];
    avisDac: IAvisDac;
    nomAvisDac?: string;
    membre2: IMembre[];
    membreCommissionsTableau: IMembreCommission[];


    ajout = false;
    postes = [Poste.MEMBRE, Poste.OBSERVATEUR, Poste.PRESIDENT, Poste.RAPPORTEUR];


    constructor(
        protected membreCommissionService: MembreCommissionService,
        protected parseLinks: JhiParseLinks,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        protected eventManager: JhiEventManager,
        protected jhiAlertService: JhiAlertService,
        protected  activiteService: ActiviteService,
        protected membreService: MembreService,
        private  confirmationService: ConfirmationService,
        protected  typeCommissionService: TypeCommissionService,
        protected  uniteadministrativeService: UniteAdministrativeService,
        protected  messageService: MessageService,
        protected exerciceService: ExerciceBudgetaireService,
        protected exerciceBudgetaireService: ExerciceBudgetaireService,
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

    findCurrentSession() {
        this.exerciceService.findCurrentExercice()
            .subscribe((res: HttpResponse<IExerciceBudgetaire>) => {
                this.curentExercice = res.body;
                this.loadActivieByExercice(this.curentExercice);
            })
    }

    loadActivieByExercice(exercice: IExerciceBudgetaire) {
        this.activiteService.findAllByAnneeExercice(exercice.id)
            .subscribe((res: HttpResponse<IActivite[]>) => {
                if (res.body.length > 0) {
                    res.body.forEach(value => {
                        value.nomActivite = value.codeLignePlan + ' ' + value.naturePrestationLibelle;
                    });
                }
                this.activites = res.body;
            })
    }

    deleteComission(commission: IMembreCommission) {
        this.confirmationService.confirm({
            header: 'Confirmation',
            message: 'Etes-vous sûr de vouloir supprimer ?',
            accept: () => {
                if (commission === null) {
                    return;
                } else {
                    commission.deleted = true;
                    this.membreCommissionService.update(commission).subscribe(
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

    ngOnInit() {
        this.initeElement();
        this.uniteadministratives = [];
        this.avisDac = null;
        this.typeCommission = new TypeCommission();
        this.typeCommission.membreCommissions = [];
        this.typeCommission.membres = [];
        this.membreCommission.membre = new Membre();

        this.uniteadministrativeService
            .findAll()
            .subscribe(res => {
                if (res.body) {
                    this.uniteadministratives = res.body;
                    this.dropDownuniteadministratives = [];
                    res.body.forEach(u => {
                        this.dropDownuniteadministratives.push({
                            value: u.id,
                            label: u.libelle
                        });
                    });

                }
            });

        this.typeCommissionService.query()
            .subscribe(
                (res: HttpResponse<ITypeCommission[]>) => (this.typeCommissions = res.body),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        /* la methode pour charger la liste des activités en fonction des l'exercice actif*/
        this.findCurrentSession();
        this.registerChangeInMembreCommissions();

        this.exerciceBudgetaireService.findAllWithoutPage().pipe(takeUntil(this.destroy$))
            .subscribe((res: HttpResponse<IExerciceBudgetaire[]>) => {
                this.exercices = res.body;
            });

        this.store.pipe(select(selectetExerciceCourant)).pipe(takeUntil(this.destroy$))
            .subscribe(exercice => {
                if (exercice) {
                    this.exercice = exercice;
                    this.actualisation();

                    this.avisDacService.findListAvisDacByExercice(this.getExerciceId()).pipe(takeUntil(this.destroy$))
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
        this.avisDacs = [];
        this.avisDac = null;
        this.typeCommission2 = null;
    }

    loadAll() {
        this.membreCommissionService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe((res: HttpResponse<IMembreCommission[]>) => this.paginateMembreCommissions(res.body, res.headers));
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/membre-commission'], {
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
            '/membre-commission',
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }

    initeElement(): void {
        this.membreCommisionSelected = [];
        this.membres = [];
        this.displayDelete = false;
        this.display = false;
        this.membreCommission = new MembreCommission();
        this.membre = new Membre();
        this.membre.cases = false;
        this.isSaving = false;
        this.isSavinge = false;
        this.displayLigne = false;
    }

    registerChangeInMembreCommissions() {
        this.eventSubscriber = this.eventManager.subscribe('membreCommissionListModification', () => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    protected paginateMembreCommissions(data: IMembreCommission[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.membreCommissions = data;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ITypeCommission>>) {
        result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
    }

    message(cle: string, severite: string, resume: string, detaille: string) {
        this.messageService.add({key: cle, severity: severite, summary: resume, detail: detaille});
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.display = false;
        this.message('myKey1', 'success', 'Ajout du membre commission', 'Enregistré effectué avec succès');
        this.loadMembreCommissionByTypeAndAvisDac();
    }

    protected onSaveError() {
        this.isSaving = false;
        this.message('myKey2', 'error', "Erreur d'ajout du membre de commission", 'Erreur d\'enregistrement');
    }

    ngOnDestroy(): void {
        this.eventManager.destroy(this.eventSubscriber);
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    /* ************* les methodes pour gestion des membre commission ********** */

    /* methode pour creer un type de commission */
    loadMembreToAdd(typeCommission: ITypeCommission) {
        if (typeCommission.id === undefined) {
            this.typeCommission = new TypeCommission();
            this.typeCommission.membreCommission = new MembreCommission();
            this.membres = this.membreses;
        } else {
            this.typeCommission = typeCommission;
            if (this.typeCommission.membreCommissions.length > 0) {
                this.typeCommission.membreCommissions.forEach(membreComiss => {
                    this.membres = this.membreses.filter(membre => membre.id !== membreComiss.membreId);
                });
            } else {
                this.membres = this.membreses;
            }
        }
    }

    /* methode pour afficher le modal d'ajout de nouveaux membre commission */
    showDialogToAddTypeMembreNew() {
        this.typeCommission = new TypeCommission();
        this.typeCommission.membreCommissions = [];
        this.membreCommisionSelected = [];
        this.avisDac = new AvisDac();
        this.display = true;
    }

    fermerFormulaire() {
        this.typeCommission = new TypeCommission();
        this.typeCommission.membreCommissions = [];
        this.membreCommisionSelected = [];
        this.membres = [];
        this.display = false;
    }

    /* methode pour afficher le modl d'ajout de nouveaux membre commission */
    showDialogToAddTypeMembreModif(membreCommission1: IMembreCommission) {
        if (this.display) {
            this.typeCommission = new TypeCommission();
            this.membreCommisionSelected = [];
            this.display = false;
        } else {
            if (!membreCommission1) {
                this.membreCommission = new MembreCommission()
            } else {
                this.membreCommission = membreCommission1;
                this.typeCommission = this.typeCommission2.find(ua => ua.id === membreCommission1.typeCommissionId);
                this.avisDac = this.avisDacs.find(a => a.id === membreCommission1.avisDacId);
                this.typeCommission.membreCommission = this.membreCommission;
                this.typeCommission.referenceArrete = this.membreCommission.referenceArrete;
                const thesMembre = membreCommission1.membre;
                thesMembre.post = membreCommission1.poste;
                this.membres = [];
                this.membres.push(thesMembre);
                this.display = true;
            }
        }
    }

    findMembreByTypeCommission(typeId: number): void {
        window.console.log('bien' + this.membre);
        this.membreCommissionService.getMembreByTypeCommission(typeId).subscribe(
            (res: HttpResponse<IMembre[]>) => {
                this.membress = res.body;

                this.membres.forEach(m => {
                    m.cases = true;

                    const mc = this.membreCommissions.find(me => me.membre.id === m.id);
                    if (mc !== undefined) {
                        m.post = mc.poste;
                    }
                });
            }, () => this.message('', '', '', '')
        );
    }

    supprimer() {
        this.displayDelete = true;
        this.deteteTexte =
            'Êtes vous sûr de vouloir ' + this.membreCommisionSelected.length + ' membres de commission ci-dessous ? Cette action est irréversible !';
    }

    filterData() {
        if (this.typeCommission !== null) {
            this.typeCommissionService.find(this.typeCommission.id).subscribe(
                (res: HttpResponse<ITypeCommission>) => {
                    if (res.body !== null) {
                        this.typeCommission = res.body;
                    } else {
                        this.typeCommission = new TypeCommission();
                        this.typeCommission.membreCommission = new MembreCommission();
                    }
                },
                () => this.message('myKey2', 'error', 'Erreur ', 'Nous avons pas pu trouver  votre commission ')
            );
        }
    }

    annulerDel() {
        this.displayDelete = false;
    }

    confirmerDelete() {
        this.membreCommissionService.updateAll(this.membreCommisionSelected).subscribe(
            () => {
                this.loadAll();
                this.annulerDel();
            },
            () => this.message('myKey1', 'info', 'erreur de suppression', 'erreur de suppression des membres sélectionnés')
        );
    }

    /**
     * Recupération des membre commission par avis et par type commission
     */
    loadMembreCommissionByTypeAndAvisDac() {
        this.membreCommissionService.findAllByAvisDacAndTypeCommiss(this.getAvisDacId(), this.getTypeCommissionId())
            .subscribe((membreComiss: HttpResponse<IMembreCommission[]>) => {
                this.membreCommissionsTableau = membreComiss.body;
            });
    }

    ifExist(): boolean {
        if (this.typeCommission.id) {
            return this.typeCommissions.some(value => value.id !== this.typeCommission.id && value.libelle === this.typeCommission.libelle);
        } else {
            return this.typeCommissions.some(value => value.libelle === this.typeCommission.libelle);
        }
    }

    findUniteById(id: number): IUniteAdministrative {
        return this.uniteadministratives.find(value => value.id === id);
    }

    deleteElement(nature: IMembreCommission) {
        this.confirmationService.confirm({
            header: 'Confirmation',
            message: 'Etes-vous sûr de vouloir supprimer ?',
            accept: () => {
                if (nature === null) {
                    return;
                } else {
                    nature.deleted = true;
                    this.membreCommissionService.update(nature).subscribe(
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

    /* *********** FIN des methodes pour la gestion des membre commission ********** */

    /* les methodes pour l'ajout des membre */

    onclik(membr: IMembre) {
        if (membr) {
            if (!membr.cases) {
                membr.cases = true;
            } else {
                membr.post = null;
                membr.cases = false;
            }
        }
    }

    ajouter(): void {
        if (!this.ajout) {
            this.typeCommission = new TypeCommission();
            this.membres = this.membreses;
            this.ajout = true;
        } else {
            this.ajout = false;
        }
    }

    addMembre(membre: IMembre) {
        membre === null ? (this.membre = new Membre()) : (this.membre = membre);
        this.displayLigne = true;
    }


    saveMembre() {
        if (!this.ifExistMembre2()) {
            this.membre.typeCommission = this.typeCommission;
            this.membre.typeCommission.avisDacId = this.avisDac.id;
            this.membre.typeCommissionId = this.typeCommission.id;
            this.membreService.create(this.membre).subscribe((membr: HttpResponse<IMembre>) => {
                const membre1 = membr.body;
                this.loadTypeCommission();
                this.ajout = false;
                this.typeCommissionService.find(membre1.typeCommissionId).subscribe((res: HttpResponse<ITypeCommission>) => {
                    this.typeCommission = res.body;
                    this.membre.typeCommission = this.typeCommission;
                    this.membre.typeCommissionId = this.typeCommission.id;
                    this.loadMembreByTypeCommission();
                    window.console.log(this.typeCommission);

                });
                this.showMessage('success', 'ENREGISTREMENT', 'Ajout du membre effuctué !');
            });
        } else {
            this.showMessage('error', 'ENREGISTREMENT', 'Le membre existe déjà !');
        }

        this.displayLigne = false;
        this.loadTypeCommission();
        this.loadMembreByTypeCommission();
        this.ajout = false;

    }

    saveMembreCommission() {
        this.isSavinge = true;
        this.membreCommission.avisDacId = this.avisDac.id;
        if (this.typeCommission.id !== undefined) {
            this.subscribeToSaveResponse(this.typeCommissionService.update(this.typeCommission));
        } else {
            this.subscribeToSaveResponse(this.typeCommissionService.create(this.typeCommission));
        }
    }


    ifExistMembre(): boolean {
        if (this.membre.id) {
            return this.membres.some(value => value.id !== this.membre.id && value.nom === this.membre.nom && value.email === this.membre.email);
        } else {
            return this.membres.some(value => value.nom === this.membre.nom);
        }
    }


    ifExistMembre2() {
        if (this.membre.id) {
            return this.membres.find(value => value.id !== this.membre.id && value.nom === this.membre.nom && value.email === this.membre.email);
        }
    }


    annulerMembre() {
        this.membre = new Membre();
        this.displayLigne = false;
    }

    /* ******* FIN ****** */

    showMessage(sever: string, sum: string, det: string) {
        this.messageService.add({
            severity: sever,
            summary: sum,
            detail: det
        });
    }


    loadTypeCommission() {
        this.typeCommissionService.findAllTypeCommisByAvisDac(this.getAvisDacId()).pipe(takeUntil(this.destroy$))
            .subscribe((res: HttpResponse<ITypeCommission[]>) => {
                this.typeCommission2 = res.body;
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

    getTypeCommissionId(): number {
        if (this.typeCommission1 !== null) {
            return this.typeCommission1.id;
        } else {
            return 0;
        }
    }

    loadMembreByTypeCommission() {
        this.membreService.findMembreByTypeCommission(this.typeCommission.id).pipe(takeUntil(this.destroy$))
            .subscribe((res: HttpResponse<IMembre[]>) => {
                this.membres = res.body;
                this.membreses = res.body;
                this.membre2 = res.body;
            });
    }
}
