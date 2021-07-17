import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import {Observable, Subject, Subscription} from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import {Avenant, IAvenant} from 'app/shared/model/microserviceexecution/avenant.model';
import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { AvenantService } from './avenant.service';
import {Contrat, IContrat} from "app/shared/model/microserviceexecution/contrat.model";
import {ContratService} from "app/entities/microserviceexecution/contrat/contrat.service";
import {ITypeAvenant, TypeAvenant} from "app/shared/model/microserviceexecution/type-avenant.model";
import {TypeAvenantService} from "app/entities/microserviceexecution/type-avenant/type-avenant.service"
import {ConfirmationService, MessageService} from "primeng/api";
import {select, Store} from "@ngrx/store";
import {selectetExerciceCourant} from "app/store/selector";
import {takeUntil} from "rxjs/operators";
import {State} from "app/store/reducers";
import {IExerciceBudgetaire} from "app/shared/model/microserviceppm/exercice-budgetaire.model";

@Component({
  selector: 'jhi-avenant',
  templateUrl: './avenant.component.html'
})
export class AvenantComponent implements OnInit, OnDestroy {
  avenants: IAvenant[];
  avenant: IAvenant;
  avenantSelected: IAvenant[];
  displayDelete: boolean;
  isSaving: boolean;
  error: any;
  success: any;
  eventSubscriber: Subscription;
  routeData: any;
  links: any;
  totalItems: any;
  itemsPerPage: any;
  page: any;
  ajout = false;
  typeAvenant: ITypeAvenant;
  typeAvenants: ITypeAvenant[];
  contrats: IContrat[];
  contrat: IContrat;
  exercice: IExerciceBudgetaire;
  predicate: any;
  display: Boolean;
  previousPage: any;
  displaych: boolean;
  ajouterTypeAvenant: boolean;
  reverse: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    protected typeAvenantService: TypeAvenantService,
    protected avenantService: AvenantService,
    protected parseLinks: JhiParseLinks,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected contratService: ContratService,
    protected confirmationService: ConfirmationService,
    protected messageService: MessageService,
    protected eventManager: JhiEventManager,
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
    this.avenantService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IAvenant[]>) => this.paginateAvenants(res.body, res.headers));
      this.typeAvenantService.query().subscribe((res:HttpResponse<ITypeAvenant[]>)=>this.typeAvenants = res.body);
  }

  selectTypeAvenant(): void {
    if (!this.ajouterTypeAvenant) {
      this.avenant.typeAvenant = new TypeAvenant();
      this.avenant.typeAvenantId = undefined;
      this.ajouterTypeAvenant = true;
    } else {
      this.avenant.typeAvenant = new TypeAvenant();
      this.ajouterTypeAvenant = false;
    }
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  transition() {
    this.router.navigate(['/avenant'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    });
    this.loadAll();
  }
  supprimer() {
    this.displayDelete = true;
  }
  annuler() {
    this.avenant = new Avenant();
    this.display = false;

  }
  fermerFormulaire() {
    this.typeAvenant = new TypeAvenant();


    this.display = false;
  }
  ajouter(): void {
    if(!this.ajout) {
      this.typeAvenant = new TypeAvenant();
      this.ajout = true;
    }
  }

  clear() {
    this.page = 0;
    this.router.navigate([
      '/avenant',
      {
        page: this.page,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    ]);
    this.loadAll();
  }
  ngOnInit() {
    this.loadAll();
    this.display = false;
    this.contrat = new Contrat();
    this.isSaving = false;
    this.displaych = false;
    this.avenant = new Avenant();
    this.avenant.typeAvenant = new TypeAvenant();
    this.typeAvenant = new TypeAvenant();
    this.registerChangeInAvenants();
    this.store.pipe(select(selectetExerciceCourant)).pipe(takeUntil(this.destroy$))
      .subscribe(exercice => {
        if (exercice) {
          this.exercice = exercice;
          this.actualisation();
          this.findAllContratbyExerceId();
        }
      });
  }

  findAllContratbyExerceId(){
    this.contratService.findAllContratByExerceId(this.exercice.id).pipe(takeUntil(this.destroy$))
      .subscribe((res: HttpResponse<IContrat[]>) => {
        this.contrats = res.body;
        window.console.log("========{contrat}========", this.contrats);
      });
  }

  actualisation() {
    this.contrats = [];
  }

  add(avenant: IAvenant) {
    avenant === null ? (this.avenant = new Avenant()) : (this.avenant = avenant);
    this.display = true;
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IAvenant) {
    return item.id;
  }

  registerChangeInAvenants() {
    this.eventSubscriber = this.eventManager.subscribe('avenantListModification', () => this.loadAll());
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateAvenants(data: IAvenant[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    this.avenants = data;
  }


// Enregistrent et modification d'un avenant
  save(){
    this.avenant.typeAvenantId = this.avenant.typeAvenant.id;
    this.avenant.contratId = this.contrat.id;
    this.avenant.contrat= this.contrat;

    if (this.avenant.id !== undefined) {
      this.subscribeToSaveResponse(this.avenantService.update(this.avenant));
      this.loadAll();
      this.display = false;
    } else {
     this.subscribeToSaveResponse(this.avenantService.create(this.avenant));
     this.loadAll();
      this.display = false;
    }


  }
 // Afficher des messages
  showMessage( cle: string,sever: string, sum: string, det: string) {
    this.messageService.add({
      key: cle,
      severity: sever,
      summary: sum,
      detail: det
    });
  }

  // suppression d'un avenant
  deleteElement(avenant: IAvenant) {
    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Etes-vous sûr de vouloir supprimer ?',
      accept: () => {
        if (avenant === null) {
          return;
        } else{
          avenant.deleted = true;
          this.avenantService.delete(avenant.id).subscribe(
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
// obtenir l'id du contrat
  getAvenantId(): number {
    // eslint-disable-next-line no-console
    console.log("rescuperation du contrat"+this.contrat.id);
    if (this.contrat !== null) {
      return this.contrat.id;
    } else {
      return 0;
    }
  }
  // Filtre par avenant
  findAvenantByContrat() {
    this.avenantService.findAvenantByContrat(this.getAvenantId()).subscribe((res: HttpResponse<IAvenant[]>) => {
      this.avenants = res.body;
    });
  }


 /* loadContrat() {

  }

  deleteElement(avenant: IAvenant) {

  }

  save() {

  } */
  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAvenant>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }
  protected onSaveSuccess() {
    this.isSaving = false;

  }

  protected onSaveError() {
    this.isSaving = false;
  }

}
