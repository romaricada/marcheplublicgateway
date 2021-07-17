import {ReportService} from 'app/entities/microservicedaccam/reports/reportService';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpHeaders, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subject, Subscription} from 'rxjs';
import {JhiEventManager, JhiParseLinks} from 'ng-jhipster';
import {IReception, Reception} from 'app/shared/model/microservicedaccam/reception.model';

import {ITEMS_PER_PAGE} from 'app/shared/constants/pagination.constants';
import {ReceptionService} from './reception.service';

import {ConfirmationService, MessageService} from "primeng/api";

import {IActivite} from "app/shared/model/microserviceppm/activite.model";

import {ActiviteService} from "app/entities/microserviceppm/activite/activite.service";
import {IExerciceBudgetaire} from "app/shared/model/microserviceppm/exercice-budgetaire.model";

import {ExerciceBudgetaireService} from "app/entities/microserviceppm/exercice-budgetaire/exercice-budgetaire.service";
import {ILot} from "app/shared/model/microservicedaccam/lot.model";
import {LotService} from "app/entities/microservicedaccam/lot/lot.service";
import {TypeReception} from 'app/shared/model/enumerations/TypeReception';
import {ICandidatCautionLot} from "app/shared/model/microservicedaccam/candidatCautionLot.model";
import {CandidatCautionLotService} from "app/entities/microservicedaccam/candidatCautionLot/candidatCautionLot.service";
import {AvisDac, IAvisDac} from "app/shared/model/microservicedaccam/avis-dac.model";

import {AvisDacService} from "app/entities/microservicedaccam/avis-dac/avis-dac.service";
import {takeUntil} from "rxjs/operators";
import {select, Store} from "@ngrx/store";
import {selectetExerciceCourant} from "app/store/selector";
import {State} from "app/store/reducers";

@Component({
    selector: 'jhi-reception',
    templateUrl: './reception.component.html'
})
export class ReceptionComponent implements OnInit, OnDestroy {

    receptions: IReception[];
    receptionSelected: IReception[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    totalItems: any;
    itemsPerPage: any;
    reception: IReception;
    page: any;
    isSaving: boolean;
    displayAdd: boolean;
    displaych: boolean;
    predicate: any;
    display: Boolean;
    previousPage: any;
    reverse: any;
    displayDelete: boolean;
    dateDp: any;
    lot: ILot;
    activites: IActivite[];
    activite: IActivite;
    avisDac: IAvisDac;
    avisDacs: IAvisDac[];
    exercices: IExerciceBudgetaire[];
    exercice: IExerciceBudgetaire;
    candidatCautionLot: ICandidatCautionLot;
    candidatCautionLots: ICandidatCautionLot[];
    date: Date;
    modiSatatus: boolean;
    imprime: boolean;
    destroy$: Subject<boolean> = new Subject<boolean>();
    nomAvisDac: string;
    deleted?: boolean;
    deteteTexte: string;

  constructor(
        protected receptionService: ReceptionService,

        protected parseLinks: JhiParseLinks,
        protected activatedRoute: ActivatedRoute,
        protected avisDacService: AvisDacService,
        protected router: Router,
        protected messageService: MessageService,
        protected lotService: LotService,
        protected confirmationService: ConfirmationService,
        protected exerciceBudgetaireService: ExerciceBudgetaireService,
        protected candidatCautionLotService: CandidatCautionLotService,
        protected eventManager: JhiEventManager,
        protected activiteService: ActiviteService,
        protected reportService: ReportService,
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
        this.receptionService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe((res: HttpResponse<IReception[]>) => this.paginateReceptions(res.body, res.headers));
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    loadCandidatCautionLot() {
        this.candidatCautionLotService.query().subscribe((res: HttpResponse<ICandidatCautionLot[]>) => {
            this.candidatCautionLots = res.body;
        })
    }

    loadExercicice(){

      this.receptionService.findReceptionByExercice(this.exercice.id).subscribe((rest:HttpResponse<IReception[]>)=>
        this.receptions=rest.body);

        this.avisDacService.findListAvisDacByExercice(this.exercice.id).subscribe((res: HttpResponse<IAvisDac[]>) => {
          if(res.body){
            res.body.forEach(value => {
              value.nomAvisDac = value.numeroAvis + ' / ' + value.objet;
            });
          }
          this.avisDacs = res.body;

        });
    }

    transition() {
        this.router.navigate(['/reception'], {
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
            '/reception',
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }

  loadAllReceptionbyAvisDac() {
      this.receptionService.findReceptionByAvisDac(this.avisDac.id).subscribe((res:HttpResponse<IReception[]>)=> {
        this.receptions = res.body;
      });
    }

    ngOnInit() {
        this.displayAdd = false;
        this.modiSatatus = false;
        this.imprime = false;
        this.date = new Date();
        this.exercice = null;
        this.activite = null;
        this.lot = null;
        this.reception = new Reception();
        this.avisDac = null;
        this.isSaving = false;
        this.displaych = false;
        this.display = false;
        this.activites = [];
        this.avisDacs = [];

        // this.loadAll();
        this.loadCandidatCautionLot();

        this.avisDac = new AvisDac();

        this.loadAll();

        // this.loadReceptionByActivite();

   /*   this.avisDacService.query().subscribe((res : HttpResponse<IReception[]>)=> this.avisDacs = res.body); */



        this.exerciceBudgetaireService.findAllWithoutPage().subscribe((res: HttpResponse<IExerciceBudgetaire[]>) => {
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
                  this.avisDacs = res.body;
                }
              });

          }
        });

        this.registerChangeInReceptions();

    }

  actualisation(){
    this.avisDacs = [];
    this.avisDac = null;

    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IReception>>) {
        result.subscribe(
            () => {
                this.showMessage('success', 'ENREGISTREMENT', 'offre modifier avec succès!');
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
        this.displayAdd = false;
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    save() {
      this.isSaving = true;
      this.reception.avisDacId = this.avisDac.id;
      if (this.reception.id !== undefined) {
        this.subscribeToSaveResponse(this.receptionService.update(this.reception));
        this.loadAll();
        this.displayAdd = false;
      } else {
         this.subscribeToSaveResponse(this.receptionService.create(this.reception));
        this.loadAll();
         this.displayAdd = false;
      }

      this.display = false;

    }

    enre() {
        this.displaych = true;
    }

    supprimer() {
        this.displayDelete = true;
    }

    annuler() {
        this.reception = new Reception();
        this.display = false;
        this.loadAll();

    }

    annulerDelete() {
        this.reception = new Reception();
        this.displayDelete = false;
    }

    registerChangeInReceptions() {
        this.eventSubscriber = this.eventManager.subscribe('receptionListModification', () => this.loadAll());
    }

    add(reception: IReception) {
        reception === null ? (this.reception = new Reception()) : (this.reception = reception);
        this.display = true;
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

// ******************************************************************************************************** */
    imprimer(reception: IReception) {
      reception.avisDacId = this.avisDac.id;
        this.reportService
            .imprimerOffre(reception.avisDacId , this.exercice.id, reception.id)
            .subscribe(response => window.open(URL.createObjectURL(new Blob([response], {type: 'application/pdf'})), '_blank'));
    }



  ImprimerLot(reception: IReception) {
    reception.avisDacId =this.avisDac.id;
    this.reportService
      .ImprimerLot(reception.avisDacId , this.exercice.id, reception.id)
      .subscribe(response => window.open(URL.createObjectURL(new Blob([response], {type: 'application/pdf'})), '_blank'));
  }


// ******************************************************************************************************** */

    deleteAll() {
      /* this.receptionSelected.forEach(reception => {
        reception.avisDacId = reception.avisDac.id;

      }); */
       this.receptionService.deleteAll(this.receptionSelected).subscribe(
            () => {
                this.loadAll();
                this.showMessage('success', 'SUPPRESSION', 'Suppression effectuée avec succès !');
            },
            () => this.showMessage('error', 'SUPPRESSION', 'Echec de la suppression !')
        );

        this.displayDelete = false;
    }

  supprimerOffre() {
    this.displayDelete = true;
  }


    deleteElement(reception: IReception) {

      this.confirmationService.confirm({
            header: 'Confirmation',
            message: 'Etes-vous sûr de vouloir supprimer ?',
            accept: () => {
                if (reception === null) {
                    return;
                } else {


                    reception.deleted = true;
                  window.console.log(reception);
                    this.receptionService.update(reception).subscribe(
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

  supprimerOffreRecption() {
    this.displayDelete = true;
    this.deteteTexte =
      'Êtes vous sûr de vouloir ' + this.receptionSelected.length + ' reception des offres ci-dessous ? Cette action est irréversible !';
  }


  showMessage(sever: string, sum: string, det: string) {
        this.messageService.add({
            severity: sever,
            summary: sum,
            detail: det
        });
    }

    /* ifExist(): boolean {
        return this.receptions.some(
            value => value.id !== this.reception.id &&
                value.nom === this.reception.nom &&
                value.prenom === this.reception.prenom &&
                value.telephone === this.reception.telephone
        );
    }*/

    protected paginateReceptions(data: IReception[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.receptions = data;
    }

  findListAvisDacByExercice() {
        this.imprime = true;
        this.receptionService.findListAvisDacByExercice(this.getExerciceId()).subscribe((res: HttpResponse<IReception[]>) => {
            if (res.body.length > 0) {
                res.body.forEach(value => {
                    value.nomAvisDacs = value.nom + ' ' + value.prenom;
                });
            }
            this.receptions = res.body;

        });
    }


  loadReceptionByNumeroDac(){
    this.avisDacService.findListAvisDacByExercice(this.getExerciceId()).pipe(takeUntil(this.destroy$))
      .subscribe((res: HttpResponse<IAvisDac[]>) => {
        if (res.body){
          res.body.forEach(value => {
            value.nomAvisDac = value.numeroAvis + ' / ' +value.objet;
          });
          this.avisDacs = res.body;
        }
      });
    this.receptionService.findListAvisDacByExercice(this.exercice.id).subscribe((rest:HttpResponse<IReception[]>)=>this.receptions=rest.body);
  }

  getExerciceId(): number {
    if (this.avisDac !== null) {
      return this.avisDac.id;
    } else {
      return 0;
    }
  }

    changeTypeReception(reception: IReception) {
        window.console.log(reception);
        if (reception.typeReception === TypeReception.RETRAIT) {
            this.reception = reception;
            this.modiSatatus = true;
        } else {
            this.confirmationService.confirm({
                header: 'Confirmation',
                message: 'Etes-vous sûr de changer le type ?',
                accept: () => {
                    reception.typeReception = TypeReception.RETRAIT;
                    this.receptionService.update(reception).subscribe(() => {
                        this.reception = new Reception();
                        this.loadReceptionByNumeroDac();
                        this.showMessage('success', 'Mise à jour', 'Operation effectuée avec sucès!');
                    });
                }
            });
        }
    }

    modifier() {
        this.receptionService.update(this.reception).subscribe(() => {
            this.modiSatatus = false;
            this.reception = new Reception();
            this.loadReceptionByNumeroDac();
            this.showMessage('success', 'Mise à jour', 'Operation effectuée avec sucès!');
        });
    }

    fermer() {
        this.modiSatatus = false;
    }


}
