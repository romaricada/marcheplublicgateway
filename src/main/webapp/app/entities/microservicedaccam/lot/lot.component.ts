import {Component, OnInit, OnDestroy} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {JhiEventManager, JhiParseLinks} from 'ng-jhipster';
import {LotService} from 'app/entities/microservicedaccam/lot/lot.service';
import {ILot, Lot} from 'app/shared/model/microservicedaccam/lot.model';
import {IExerciceBudgetaire} from 'app/shared/model/microserviceppm/exercice-budgetaire.model';
import {ExerciceBudgetaireService} from 'app/entities/microserviceppm/exercice-budgetaire/exercice-budgetaire.service';
import {MessageService, ConfirmationService} from 'primeng/api';
import {Caution, ICaution} from 'app/shared/model/microservicedaccam/caution.model';
import {TypeCautionService} from 'app/entities/microservicedaccam/type-caution/type-caution.service';
import {AvisDacService} from 'app/entities/microservicedaccam/avis-dac/avis-dac.service';
import {IAvisDac} from 'app/shared/model/microservicedaccam/avis-dac.model';
import {ITypeCaution} from "app/shared/model/microservicedaccam/typeCaution.model";

@Component({
    selector: 'jhi-lot',
    templateUrl: './lot.component.html'
})
export class LotComponent implements OnInit, OnDestroy {
    lots: ILot[];
    lot: ILot;
    caution: ICaution;
    cautions: ICaution[];
    lotSelected: ILot[];
    exercices: IExerciceBudgetaire[];
    exercice: IExerciceBudgetaire;

    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    displayLigne: boolean;
    ajout = false;
    totalItems: any;
    isSavinge: boolean;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    isSaving: Boolean;
    display: Boolean;
    displayDelete: Boolean;
    status: String;
    nbresLots: any;
    index: number;
    avisDacs: IAvisDac[];
    avisDac: IAvisDac;
  typeCautions: ITypeCaution[];


    constructor(
        protected lotService: LotService,
        protected typeCautionService: TypeCautionService,
        protected exerciceBudgetaireService: ExerciceBudgetaireService,
        protected messageService: MessageService,
        protected confirmationService: ConfirmationService,
        protected aviDacService: AvisDacService,
        protected parseLinks: JhiParseLinks,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        protected eventManager: JhiEventManager
    ) {
    }

    add(lot: ILot) {

        if (lot === null) {
            this.lot = new Lot();
        } else {
            this.lot = lot;
        }
        this.display = true;
    }


    ngOnInit() {
        this.exercice = null;
        this.avisDac = null;
        this.lots = [];
        this.cautions = [];
        this.caution = new Caution();
        this.displayLigne = false;
        this.lot = new Lot();
        this.typeCautions = [];
        this.isSavinge = false;
        this.isSaving = false;
        // this.loadAll();
        this.exerciceBudgetaireService.findAllWithoutPage().subscribe((res: HttpResponse<IExerciceBudgetaire[]>) => {
            this.exercices = res.body;
        });

        this.typeCautionService.query().subscribe((res: HttpResponse<ITypeCaution[]>) => this.typeCautions = res.body);
        this.lotService.query().subscribe((res: HttpResponse<ILot[]>) => this.lots = res.body);



        this.registerChangeInLots();
    }

    actualisation() {
        this.exercice = null;
        this.avisDac = null;
        this.lots = [];
        this.lot = new Lot();
    }

    getExerciceId(): number {
        if (this.exercice !== null) {
            return this.exercice.id;
        } else {
            return 0;
        }
    }

    loadExercicice() {
        this.aviDacService.findListAvisDacByExercice(this.getExerciceId()).subscribe((res: HttpResponse<IAvisDac[]>) => {
            if (res.body) {
                res.body.forEach(value => {
                    value.nomAvisDac = value.numeroAvis + ' ' + value.objet;
                });
            }
            this.avisDacs = res.body;
        });
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    showMessage(cle: string, sever: string, sum: string, det: string) {
        this.messageService.add({
            key: cle,
            severity: sever,
            summary: sum,
            detail: det
        });
    }

    getAvisDacId(): number {
        if (this.avisDac !== null) {
            return this.avisDac.id;
        } else {
            return 0;
        }
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.display = false;
        this.loadAllLotByAvis();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    registerChangeInLots() {
        this.eventSubscriber = this.eventManager.subscribe('lotListModification', () => this.loadExercicice());
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ILot>>) {
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


    /* ifExistCaution(): boolean {
      return this.cautions.some(
        value => value.id !== this.caution.id &&
          value.libelle === this.caution.libelle &&
          value.validite === this.caution.validite &&
          value.montant === this.caution.montant &&
          value.lotId === this.caution.lotId &&
          value.typeCautionId === this.caution.typeCautionId
      );
    } */

    save() {
        if (!this.ifExist()) {
            this.isSaving = true;
            if (this.lot.id !== undefined) {
                this.subscribeToSaveResponse(this.lotService.update(this.lot));
            } else {
                this.lot.avisDacId = this.avisDac.id;
                this.subscribeToSaveResponse(this.lotService.create(this.lot));
            }
        } else {
            this.showMessage('myKey1', 'error', 'ENREGISTREMENT', 'cette offre existe déjà !');
        }
    }

    deleteAll() {
        this.lotService.deleteAll(this.lotSelected).subscribe(
            () => {
                //  this.loadAllLotByActivite();
                this.showMessage('myKey1', 'success', 'SUPPRESSION', 'Suppression effectuée avec succès !');
            },
            () => this.showMessage('myKey1', 'error', 'SUPPRESSION', 'Echec de la suppression !')
        );

        this.displayDelete = false;
    }

    deleteElement(lot: ILot) {
        this.confirmationService.confirm({
            header: 'Confirmation',
            message: 'Etes-vous sûr de vouloir supprimer ?',
            accept: () => {
                if (lot === null) {
                    return;
                } else {
                    lot.deleted = true;
                    this.lotService.delete(lot.id).subscribe(
                        () => {
                            this.loadAllLotByAvis();
                            this.showMessage('myKey1', 'success', 'SUPPRESSION', 'Suppression effectuée avec succès !');
                        },
                        () => this.showMessage('myKey1', 'error', 'SUPPRESSION', 'Echec de la suppression !')
                    );
                }
            }
        });
    }

    annulerDelete() {
        this.lot = new Lot();
        this.displayDelete = false;
    }

    annuler() {
        this.lot = new Lot();
        this.display = false;
    }

    supprimer() {
        this.displayDelete = true;
    }

    ifExist(): boolean {
        /*  if (this.lot.id) {
            return this.lots.some(value => value.id !== this.lot.id && value.libelle === this.lot.libelle);
          } else {
            return this.lots.some(value => value.libelle === this.lot.libelle);
          }*/
        return this.lots.some(
            value => value.id !== this.lot.id &&
                value.libelle === this.lot.libelle &&
                value.activiteId === this.lot.activiteId &&
                value.description === this.lot.description
        );
    }


    showMessageConfimation(status: boolean): string {
        if (status) {
            return 'Êtes-vous sûr de vouloir rendre fructueux ce lot du marché?';
        } else {
            return 'Êtes-vous sûr de vouloir rendre infructueux cet lot du marché?';
        }
    }

    changeStatus(lot, status: boolean) {
        this.confirmationService.confirm({
            header: 'Confirmation',
            message: this.showMessageConfimation(status),
            accept: () => {
                lot.infructueux = status;
                this.lotService.changeStatus(lot).subscribe((res: HttpResponse<any>) => {
                    window.console.log(res);
                    this.showMessage('myKey1', 'success', 'Mise à jour', 'Operation effectuée avec succès !');
                    this.loadAllLotByAvis();
                }, () => {
                    this.showMessage('myKey1', 'error', 'Mise à jour', 'Echec de l\' operation !');
                });
            }
        });
    }

    loadAllLotByAvis() {
        this.loadExercicice();
        this.lots = this.avisDac.lots;
    }
}
