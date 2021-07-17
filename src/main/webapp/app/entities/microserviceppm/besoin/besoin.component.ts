import {Component, OnInit, OnDestroy} from '@angular/core';
import {HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subject, Subscription} from 'rxjs';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';
import {Besoin, IBesoin} from 'app/shared/model/microserviceppm/besoin.model';
import {ITEMS_PER_PAGE} from 'app/shared/constants/pagination.constants';
import {BesoinService} from './besoin.service';
import {IUniteAdministrative} from 'app/shared/model/microserviceppm/unite-administrative.model';
import {ExerciceBudgetaire, IExerciceBudgetaire} from 'app/shared/model/microserviceppm/exercice-budgetaire.model';
import {ExerciceBudgetaireService} from 'app/entities/microserviceppm/exercice-budgetaire/exercice-budgetaire.service';
import {UniteAdministrativeService} from 'app/entities/microserviceppm/unite-administrative/unite-administrative.service';
import {ILigneBudgetaire, LigneBudgetaire} from 'app/shared/model/microserviceppm/ligne-budgetaire.model';
import {LigneBudgetaireService} from 'app/entities/microserviceppm/ligne-budgetaire/ligne-budgetaire.service';
import {ConfirmationService, MessageService, SelectItem} from 'primeng/api';
import {INaturePrestation} from 'app/shared/model/microserviceppm/nature-prestation.model';
import {NaturePrestationService} from 'app/entities/microserviceppm/nature-prestation/nature-prestation.service';
import * as moment from 'moment';
import {
    BesoinLigneBudgetaire, IBesoinLigneBudgetaire
} from 'app/shared/model/microserviceppm/besoin-ligne-budgetaire.model';
import {select, Store} from '@ngrx/store';
import {State} from "app/store/reducers";
import {selectetExerciceCourant} from 'app/store/selector';
import {takeUntil} from 'rxjs/operators';
import {BesoinLigneBudgetaireService} from "app/entities/microserviceppm/besoin-ligne-budgetaire/besoin-ligne-budgetaire.service";

@Component({
    selector: 'jhi-besoin',
    templateUrl: './besoin.component.html',
    styleUrls: ['./besoin.component.scss']
})
export class BesoinComponent implements OnInit, OnDestroy {
    besoins: IBesoin[];
    besoinSelecteds: IBesoin[];
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
    besoin: IBesoin;
    exercicebudgetaires: IExerciceBudgetaire[];
    exercices: IExerciceBudgetaire[];
    uniteadministratives: IUniteAdministrative[];
    dropDownuniteadministratives: Array<SelectItem>;
    ligneBudgetaires: ILigneBudgetaire[];
    ligneBudgetaire: ILigneBudgetaire;
    displayLigne: boolean;
    displayAddligne: boolean;
    ligneBudgetaireSelecteds: ILigneBudgetaire[];
    besoinLigneBudgetaires: IBesoinLigneBudgetaire[];
    besoinLigneBudgetaire: IBesoinLigneBudgetaire[];
    displayBesoin: boolean;
    exercice: IExerciceBudgetaire;
   uniteAdministrative: IUniteAdministrative;
    natureprestations: INaturePrestation[];
    dropDownnatureprestations: Array<SelectItem>;
    displayDelete = false;
    deteteTexte: string;
    debut: Date;
    fin: Date;
    montant = 0;
    ligneValide = false;
    montantRestantligne: any;
    montantDotCorAE: number[]=[];
    montantDotCorAE1: number[]=[];
    rowIndex: number;
    destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(
        protected besoinService: BesoinService,
        protected parseLinks: JhiParseLinks,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        protected eventManager: JhiEventManager,
        protected exerciceBudgetaireService: ExerciceBudgetaireService,
        protected uniteAdministrativeService: UniteAdministrativeService,
        protected ligneBudgetaireService: LigneBudgetaireService,
        protected besoinLigneBudgetaireService: BesoinLigneBudgetaireService,
        protected jhiAlertService: JhiAlertService,
        protected messageService: MessageService,
        protected naturePrestationService: NaturePrestationService,
        protected confirmationService: ConfirmationService,
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

    loadAll(): void {
        this.besoinService
            .findAllByExerciceAndDirection(isNaN(this.exercice.id) ? 0 : this.exercice.id,
                isNaN(this.uniteAdministrative.id) ? 0 : this.uniteAdministrative.id, {
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe((res: HttpResponse<IBesoin[]>) => this.paginateBesoins(res.body, res.headers));
        // this.montantRestantAE();
    }

    loadPage(page: number): void {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/besoin'], {
            queryParams: {
                page: this.page,
                size: this.itemsPerPage,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    clear(): void {
        this.page = 0;
        this.router.navigate([
            '/besoin',
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }

    montantRestant(): any {
        this.besoinService.montantRestant(this.ligneBudgetaire.id, this.besoin.id).subscribe((res: HttpResponse<number>) => {
            this.montantRestantligne = res.body;
        });
    }

   /* montantDotCrAERestantRecup(): any {
      this.ligneBudgetaireService.findAllByExercice(this.exercice.id).subscribe(
        (res: HttpResponse<ILigneBudgetaire[]>) => {
          this.ligneBudgetaires = res.body;

        this.ligneBudgetaires.forEach(lb => {
        const besoinLigne: IBesoinLigneBudgetaire = new BesoinLigneBudgetaire();
        besoinLigne.montantEstime = lb.montantEstime;
          this.besoinService.montantDotCrAERestant(lb.id).subscribe((res1: HttpResponse<number[]>) => {
            this.montantDotCorAE = res1.body;
            window.console.log("=======ligneBudgetaire=======",res1.body.length );
            // lb.ligneBudget.dotCorAERestant = ;

            window.console.log("=======indice=======",this.besoinLigneBudgetaires.length );
            this.montantDotCorAE1.push(this.montantDotCorAE[0]);
            window.console.log("=====result===={}",this.montantDotCorAE1);
          })
            // this.besoin.besoinLignes.push(besoinLigne);
      });

        });
    }*/
   /* montantRestantAE(){
      this.besoinService.montantDotCrAERestant(this.uniteAdministrative.id).subscribe((res: HttpResponse<number[]>) => {
        this.montantDotCorAE = res.body;
        window.console.log("=======montantDotCorAE=======",this.montantDotCorAE );
      })
    }*/

    addligne(ligneBudgetaire: ILigneBudgetaire) {
        ligneBudgetaire === null ? (this.ligneBudgetaire = new LigneBudgetaire()) : (this.ligneBudgetaire = ligneBudgetaire);
        this.displayAddligne = true;
    }

    annulleLine() {
        this.displayAddligne = false
    }

    saveLigne() {
        this.isSaving = true;
        if (this.ligneBudgetaire.id !== undefined) {
            this.subscribeToSaveResponseLigne(this.ligneBudgetaireService.update(this.ligneBudgetaire));
            this.displayLigne = false;
        } else {
            this.subscribeToSaveResponseLigne(this.ligneBudgetaireService.create(this.ligneBudgetaire));
            this.displayLigne = false;
        }
    }

    protected subscribeToSaveResponseLigne(result: Observable<HttpResponse<ILigneBudgetaire>>) {
        result.subscribe(() => {
            this.message('myKey1', 'success', 'ENREGISTREMENT', 'Ligne budgetaire ajouté avec succès!!!');
            this.onSaveSuccessLigne()
        }, () => {
            this.message('myKey2', 'error', 'ENREGISTREMENT', "Echec de l'enregistrement!!!");
            this.onSaveErrorLigne()
        });
    }

    protected onSaveSuccessLigne() {
        this.isSaving = false;
        this.loadAll();
        this.displayAddligne = false;
    }

    protected onSaveErrorLigne() {
        this.isSaving = false;
        this.displayAddligne = false;
    }

    init(): void {
        this.debut = new Date();
        this.fin = new Date();
        this.besoinSelecteds = [];
        this.displayBesoin = false;
        this.ligneBudgetaires = [];
        this.besoinLigneBudgetaires = [];
        this.ligneBudgetaire = new LigneBudgetaire();
        this.ligneBudgetaireSelecteds = [];
        this.display = false;
        this.isSaving = false;
        this.uniteAdministrative = null;
        this.exercice = new ExerciceBudgetaire();
        this.besoin = new Besoin();
        this.besoin.besoinLignes = [];
        this.natureprestations = [];
       // this.besoin.montantRestant = this.montantRestant();
        this.findAllExercice();
        this.loadLigneBudgetaire();
        this.uniteAdministrativeService.findAll().subscribe(
            (res: HttpResponse<IUniteAdministrative[]>) => {
                if (res.body) {
                    this.uniteadministratives = res.body;
                    this.dropDownuniteadministratives = [];
                    this.uniteadministratives.forEach(v => {
                        this.dropDownuniteadministratives.push({
                            label: v.libelle,
                            value: v.id
                        });
                    });
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message));

        this.naturePrestationService
            .findAll().subscribe(
            (res: HttpResponse<INaturePrestation[]>) => {
                if (res.body) {
                    this.natureprestations = res.body;
                    this.dropDownnatureprestations = [];
                    res.body.forEach(v => {
                        this.dropDownnatureprestations.push(
                            {
                                label: v.libelle,
                                value: v.id
                            });
                    });
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit(): void {
        this.init();
        this.store.pipe(select(selectetExerciceCourant)).pipe(takeUntil(this.destroy$))
            .subscribe(exercice => {
                if (exercice) {
                    this.exercice = exercice;
                }
            });
        this.registerChangeInBesoins();
    }

    ngOnDestroy(): void {
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBesoins(): void {
        this.eventSubscriber = this.eventManager.subscribe('besoinListModification', () => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

  loadLigneBudgetaire(){
    this.besoinLigneBudgetaireService.query()
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        if (res.body) {
          this.besoinLigneBudgetaires = res.body;

          window.console.log("=======besoinLigneBudgetaires======={}", this.besoinLigneBudgetaires);
          // this.totaTMontant = soldeTotal(this.besoinLigneBudgetaires.map(v => v.montantEstime));
        }
      });
  }


    protected paginateBesoins(data: IBesoin[], headers: HttpHeaders): void {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.besoins = data;
        window.console.log("++++++++listes de besoins++++++++{}", this.besoins)
    }

    add(besoin: IBesoin): void {

        if (besoin === null) {
            this.besoin = new Besoin();
        } else {
            this.besoin = besoin;
            this.besoin.ligneBudgetaires = besoin.ligneBudgetaires;
            this.ligneBudgetaireSelecteds = this.besoin.ligneBudgetaires;
            this.montant = besoin.montantEstime;
        }
        this.display = true;
    }

    annuler(): void {
        this.display = false;
        this.besoin = new Besoin();
        this.ligneBudgetaireSelecteds = [];
    }

    annulerBesoin(): void {
        this.displayBesoin = false;
        this.besoin = new Besoin();
        this.ligneBudgetaireSelecteds = [];
        this.besoin.ligneBudgetaires = [];
    }

    save(): void {
        this.isSaving = true;
        this.besoin.exerciceId = this.exercice.id;
        this.besoin.dateFin = moment(this.fin);
        this.besoin.montantEstime = this.montant;
        this.besoin.uniteAdministrativeId = this.uniteAdministrative.id;
        if (this.besoin.id !== undefined && this.besoin.id !== null) {
            this.besoin.besoinLignes = [];
            this.besoin.ligneBudgetaires.forEach(lb => {
                const besoinLigne: IBesoinLigneBudgetaire = new BesoinLigneBudgetaire();
                besoinLigne.besoinId = this.besoin.id;
                besoinLigne.montantEstime = lb.besoinLigneBuget.montantEstime;
                besoinLigne.ligneBudget.montantEstime = lb.besoinLigneBuget.montantEstime;
                besoinLigne.ligneBudgetId = lb.id;
                besoinLigne.aecp = lb.besoinLigneBuget.aecp;
                besoinLigne.deleted = false;
                besoinLigne.id = lb.besoinLigneBuget.id;
                this.besoin.besoinLignes.push(besoinLigne);
                window.console.log("+++++++++=======besoinLigne========+++++++{}", this.besoin.besoinLignes);
            });

            this.subscribeToSaveResponse(this.besoinService.update(this.besoin));
        } else {
          window.console.log(this.besoin);
            this.subscribeToSaveResponse(this.besoinService.create(this.besoin));
        }
    }

  deleteElementBesoin(besoin: IBesoin) {
    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Etes-vous sûr de vouloir supprimer ?',
      accept: () => {
        if (besoin === null) {
          return;
        } else {
          window.console.log("+++++++++++++++++++",besoin);
          besoin.deleted = true;
          this.besoinService.update(besoin).subscribe(
            () => {
              this.loadAll();
              this.message('myKey1', 'success', 'SUPPRESSION', 'Suppression effectuée avec succès !');
            },
            () => this.message('myKey1','error', 'SUPPRESSION', 'Echec de la suppression !')
          );
        }
      }
    });
  }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IBesoin>>): void {
        result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
    }

    protected onSaveSuccess(): void {
        this.isSaving = false;
        this.display = false;
        this.montant = 0;
        this.message('myKey1', 'success', 'Ajout du besoin', 'Votre besoin ' + this.besoin.libelle + ' a été enregistré avec succès');
        this.loadAll();
    }

    protected onSaveError(): void {
        this.isSaving = false;
        this.message('myKey2', 'error', "Erreur d'ajout du besoin", 'Nous avons pas pu enregistrer votre besoin ' + this.besoin.libelle);
    }

    protected onError(errorMessage: string): void {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    addLigne(): void {
        this.ligneBudgetaireService.findAllByExercice(this.exercice.id).subscribe(
            (res: HttpResponse<ILigneBudgetaire[]>) => {
                this.ligneBudgetaires = res.body;
                if (this.besoin.id === undefined || this.besoin.besoinLignes.length === 0) {
                  // this.montantDotCrAERestantRecup();
                  this.montantDotCorAE = this.montantDotCorAE1;
                  this.ligneBudgetaires.forEach(lb => {
                    lb.selected = false;
                       // lb.besoinLigneBuget = new BesoinLigneBudgetaire();
                    this.besoinService.montantDotCrAERestant(lb.id).subscribe((res1: HttpResponse<number[]>) => {
                      // this.montantDotCorAE = res1.body;
                      window.console.log("=======ligneBudgetaire=======",res1.body.length );
                      // lb.ligneBudget.dotCorAERestant = ;

                      window.console.log("=======indice=======",this.besoinLigneBudgetaires.length );
                      lb.dotCorAERestant= res1.body[0];
                      // window.console.log("=====result===={}",this.montantDotCorAE1);
                    });
                    this.besoinService.montantDotCrCPRestant(lb.id).subscribe((res2: HttpResponse<number[]>) => {
                      lb.dotCorCPRestant= res2.body[0];
                    });
                    });

                } else {
                    this.ligneBudgetaireSelecteds = this.ligneBudgetaires.filter(l => l.besoinLigneBuget.besoinId === this.besoin.id);
                }
                if (this.ligneBudgetaireSelecteds.length > 0) {
                    this.ligneBudgetaireSelecteds.forEach(value => {
                        this.ligneBudgetaires.indexOf(value);
                    });
                }
            },
            (resError: HttpErrorResponse) => this.onError(resError.message)
        );
        this.displayLigne = true;
    }

    annulerLigne(): void {
        this.displayLigne = false;
        this.ligneBudgetaireSelecteds = [];
    }

    retirer(ligneBudgetaire: ILigneBudgetaire): void {
        this.besoin.ligneBudgetaires = this.besoin.ligneBudgetaires.filter(l => l.id !== ligneBudgetaire.id);
        this.calculerMontant();
    }

    message(cle: string, severite: string, resume: string, detaille: string): void {
        this.messageService.add({key: cle, severity: severite, summary: resume, detail: detaille});
    }

    valider(): void {
        // window.console.log(this.ligneBudgetaireSelecteds);
      this.displayLigne = false;
        this.besoin.ligneBudgetaires = this.ligneBudgetaireSelecteds;
        this.besoin.besoinLignes = [];
        this.besoin.ligneBudgetaires.forEach(lb => {
            const besoinLigne: IBesoinLigneBudgetaire = new BesoinLigneBudgetaire();
            // besoinLigne.besoinId = this.besoin.id;
            // besoinLigne.montantEstime = lb.besoinLigneBuget.montantEstime;
            besoinLigne.ligneBudgetId = lb.id;
            besoinLigne.selected = false;
            besoinLigne.aecp = false;
            besoinLigne.deleted = false;
            if (lb.besoinLigneBuget !== null && lb.besoinLigneBuget.id !== null) {
                besoinLigne.id = lb.besoinLigneBuget.id;
            }
            this.besoin.besoinLignes.push(besoinLigne);
            window.console.log('$$$$$$$$$$$$$ ' + this.besoin.besoinLignes.length);
        });
        this.displayLigne = false;
        this.calculerMontant();
    }

    determinerMontantReste(): void {
        if (this.ligneBudgetaireSelecteds) {
            window.console.log('**************    ' + this.ligneBudgetaireSelecteds.length);
        }
    }

    calculerMontant() {
        this.montant = 0;
        if (this.besoin.ligneBudgetaires.length > 0) {
            this.besoin.ligneBudgetaires.forEach(lb => {
                this.montant += lb.montantEstime;
            });
        }
        this.besoin.montantEstime = this.montant;
    }

    supprimer() {
        this.displayDelete = true;
        this.deteteTexte = 'Êtes vous sûr de vouloir' + this.besoinSelecteds.length + ' les besoins ci-dessous ? Cette action est irréversible !';
    }

    deleteMany(): void {
    }

    annulerDel() {
        this.besoinSelecteds = [];
        this.displayDelete = false;
        this.ligneBudgetaireSelecteds = [];
    }

    annulerSelectLigne() {
        this.ligneBudgetaireSelecteds = [];
        this.displayLigne = false;
    }

    confirmerDelete() {
        this.besoinService.updateAll(this.besoinSelecteds).subscribe(
            () => {
                this.loadAll();
                this.annulerDel();
            },
            () => this.message('myKey1', 'info', 'erreur de suppression', 'erreur de suppression des besoins sélectionnés')
        );
    }

    filterData() {
      this.loadAll();
      // this.montantRestantAE();
    }

    actualiser() {
        this.exercice = null;
        this.besoins = [];
    }

    findAllExercice(): void {
        this.exerciceBudgetaireService.findAllWithoutPage().subscribe(
            (res: HttpResponse<IExerciceBudgetaire[]>) => this.exercicebudgetaires = res.body
        );
    }

    verifierLigne(lingeBudgetaire: ILigneBudgetaire) {
        this.ligneBudgetaireService.verifierLigneMax(lingeBudgetaire).subscribe(
            (res: HttpResponse<number>) => {
                const reste = res.body;
                if (reste !== null) {
                    if (reste < 0) {
                        const aecp = lingeBudgetaire.besoinLigneBuget.aecp ? 'AE' : 'CP';
                        this.message('myKey3', 'error', 'Insufisance de budget', "Impossible d'imputer "
                            + lingeBudgetaire.besoinLigneBuget.montantEstime + ' en ' + aecp + '\n du budget ' + lingeBudgetaire.paragraphe + ' car vous avez un manque de ' + (lingeBudgetaire.besoinLigneBuget.montantEstime + reste));
                        this.ligneValide = true;
                    } else {
                        this.ligneValide = false;
                    }
                }

            }
        )

    }

    ligneSelected(lingeBudgetaire) {
        lingeBudgetaire.selected = !lingeBudgetaire.selected;
        // console.log(lingeBudgetaire.selected);
        lingeBudgetaire.besoinLigneBudgetaire = new BesoinLigneBudgetaire();
      /* this.ligneBudgetaireSelecteds.forEach(lbs => {
        lbs.selected = true;
      }); */
    }

    verifier() {}
}
