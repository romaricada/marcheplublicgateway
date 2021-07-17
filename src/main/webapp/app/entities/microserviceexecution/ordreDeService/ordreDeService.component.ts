import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpHeaders, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription, Observable} from 'rxjs';
import {JhiEventManager, JhiParseLinks} from 'ng-jhipster';
import {IAvenant} from 'app/shared/model/microserviceexecution/avenant.model';
import {ITEMS_PER_PAGE} from 'app/shared/constants/pagination.constants';
import {IContrat, Contrat} from "app/shared/model/microserviceexecution/contrat.model";
import {ContratService} from "app/entities/microserviceexecution/contrat/contrat.service";
import {ITypeAvenant, TypeAvenant} from "app/shared/model/microserviceexecution/type-avenant.model";
import {IOrdreService, OrdreService} from 'app/shared/model/microserviceexecution/ordre-service.model';
import {OrdreDeServiceService} from './ordreDeService.service';
import {MessageService, ConfirmationService} from 'primeng/api';
import {ReceptionService} from "app/entities/microservicedaccam/reception/reception.service";
import {IExerciceBudgetaire} from "app/shared/model/microserviceppm/exercice-budgetaire.model";

@Component ({
  selector: 'jhi-ordre-service',
  templateUrl: './ordreDeService.component.html'
})


export class OrdreDeServiceComponent implements OnInit, OnDestroy {
  protected get messageService(): MessageService {
    return this._messageService;
  }

  protected set messageService(value: MessageService) {
    this._messageService = value;
  }

  ordreDeServiceSelected: IOrdreService[];
  ordreDeServiceS: IOrdreService[];
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
  contrats: IContrat[];
  contrat: IContrat;
  predicate: any;
  displayOrdreService: Boolean;
  previousPage: any;
  displaych: boolean;
  ordreDeService: IOrdreService;
  exercice: IExerciceBudgetaire;

  reverse: any;


  constructor(
    protected parseLinks: JhiParseLinks,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected contratService: ContratService,
    protected confirmationService: ConfirmationService,
    protected ordreDeserviceService: OrdreDeServiceService,
    private _messageService: MessageService,
    protected receptionService: ReceptionService,
    protected eventManager: JhiEventManager
  ) {
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.routeData = this.activatedRoute.data.subscribe (data => {
      this.page = data.pagingParams.page;
      this.previousPage = data.pagingParams.page;
      this.reverse = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
    });
  }

  loadAll() {
    this.ordreDeserviceService
      .query ({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort ()
      })
      .subscribe ((res: HttpResponse<IOrdreService[]>) => this.paginateOdreDeService (res.body, res.headers));
  }


  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition ();
    }
  }

  transition() {
    this.router.navigate (['/ordeDeservice'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    });
    this.loadAll ();
  }

  deleteOrdreService(ordreDeService: IOrdreService) {
    window.console.log (ordreDeService)
    // this.displayDelete = true;
    this.confirmationService.confirm ({
      header: 'Confirmation',
      message: 'Etes-vous sûr de vouloir supprimer ?',
      accept: () => {
        if (this.ordreDeService === null) {
          window.console.log ("=====================1=====================")
          return;
        } else {
          this.ordreDeService.deleted = true;
          this.ordreDeserviceService.delete (ordreDeService.id).subscribe (
            () => {
              this.loadAll ();
              this.showMessage ({
                sever: 'success',
                sum: 'SUPPRESSION',
                det: 'ordre de Service supprimer avec succès!!'
              });
            },
            () => this.showMessage ({sever: 'error', sum: 'SUPPRESSION', det: "Echec de suppression!"})
          );
        }
      }
    });
  }

  supprimer() {
    this.displayDelete = true;
  }

  annulerOrdreService() {
    this.displayOrdreService = false;
    this.displayDelete = false;

  }

  fermerFormulaire() {
    this.displayOrdreService = false;
  }

  ajouter(): void {
    if (!this.ajout) {
      this.typeAvenant = new TypeAvenant ();
      this.ajout = true;
    }
  }

  clear() {
    this.page = 0;
    this.router.navigate ([
      '/avenant',
      {
        page: this.page,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    ]);
    this.loadAll ();
  }

  ngOnInit() {
    this.loadAll ();
    this.displayOrdreService = false;
    this.contrat = null;
    this.isSaving = false;
    this.displaych = false;
    this.ordreDeService = new OrdreService ();
    this.contratService.query ().subscribe ((res: HttpResponse<IContrat[]>) => this.contrats = res.body);
    this.loadAll ();
    this.ordreDeserviceService.query ().subscribe ((res: HttpResponse<IOrdreService[]>) => this.ordreDeServiceS = res.body);
  }

  addOrdreDeService() {
    this.displayOrdreService = true;
    this.ordreDeserviceService.query ().subscribe ((res: HttpResponse<IOrdreService[]>) => this.ordreDeServiceS = res.body);
  }

  modif(ordre: IOrdreService) {
    if(ordre === null){
      this.ordreDeService = new OrdreService ();
    }
    else {

      this.ordreDeService = ordre;
      this.ordreDeService.NumeroOs= ordre.numeroOs1;
    }

    this.displayOrdreService = true;
  }


  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrdreService>>) {
    result.subscribe (
      () => {
        this.showMessage ({sever: 'success', sum: 'ENREGISTREMENT', det: 'offre de Service ajouté avec succès!'});
        this.onSaveSuccess ();
      },
      () => {
        this.showMessage ({sever: 'error', sum: 'ENREGISTREMENT', det: "Echec d'enregistrement!"});
        this.onSaveError ();
      }
    );
  }


  showMessage({sever, sum, det}: { sever: string; sum: string; det: string; }) {
    this.messageService.add ({
      severity: sever,
      summary: sum,
      detail: det
    });
  }


  showsMessage(sever: string, sum: string, det: string) {
    this.messageService.add ({
      severity: sever,
      summary: sum,
      detail: det
    });
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.loadAll ();
    this.displayOrdreService = false;
  }

  protected onSaveError() {
    this.isSaving = false;
  }

  saveOrdreService() {

    this.isSaving = true;
    if (this.ordreDeService.id !== undefined) {
      this.subscribeToSaveResponse (this.ordreDeserviceService.update (this.ordreDeService));
      this.displayOrdreService = false;
    } else {
      this.ordreDeService.contratId = this.contrat.id;
      this.subscribeToSaveResponse (this.ordreDeserviceService.create (this.ordreDeService));
      this.displayOrdreService = false;

    }
  }

  annuler() {
    this.ordreDeService = new OrdreService ();
    this.displayOrdreService = false;
    this.loadAll ();

  }


  /* protected subscribeToSaveResponseS(result: Observable<HttpResponse<IReception>>) {
     result.subscribe(
       () => {
         this.showMessage({ sever: 'success', sum: 'ENREGISTREMENT', det: 'offre de Service ajouté avec succès!' });
         this.onSaveSuccess();
       },
       () => {
         this.showMessage({ sever: 'error', sum: 'ENREGISTREMENT', det: "Echec d'enregistrement!" });
         this.onSaveError();
       }
     );
   } */


  saveOffre() {
    this.isSaving = true;
    this.ordreDeService.contrat = this.contrat;
    this.ordreDeService.contratId = this.contrat.id;
    this.ordreDeService.numeroOs1= this.ordreDeService.NumeroOs;

    window.console.log ("===============" );
    window.console.log (this.ordreDeService.NumeroOs );
    window.console.log ("===============" );
    if (this.ordreDeService.id !== undefined) {

      this.subscribeToSaveResponse (this.ordreDeserviceService.update (this.ordreDeService));
      this.displayOrdreService = false;
    } else {

      window.console.log (this.ordreDeService);
      this.subscribeToSaveResponse (this.ordreDeserviceService.create (this.ordreDeService));
      this.ordreDeService = new OrdreService ();
      this.contrat = new Contrat ();
      this.displayOrdreService = false;
    }

    /*
      this.ordreDeService.contrat?.reference = '';
      this.ordreDeService?.delai = '';
      this.ordreDeService.libelle = '';
      this.ordreDeService?.etat = ''
      this.ordreDeService?.dateDebut = '',
      this.ordreDeService?.dateFin = '' ;
      */

    this.loadAll ();

  }

// obtenir l'id du contrat
  getContratId(): number {

    window.console.log ("rescuperation du contrat" + this.contrat.id);
    if (this.contrat !== null) {
      return this.contrat.id;
    } else {
      return 0;
    }
  }

  findAllOrdreServiceByContrat() {
    this.ordreDeserviceService.findAllOrdreServiceByContrat (this.getContratId ()).subscribe ((res: HttpResponse<IOrdreService[]>) =>
      this.ordreDeServiceS = res.body)
  }


  ngOnDestroy() {

  }

  trackId(index: number, item: IAvenant) {
    return item.id;
  }

  registerChangeInAvenants() {
    this.eventSubscriber = this.eventManager.subscribe ('avenantListModification', () => this.loadAll ());
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push ('id');
    }
    return result;
  }

  protected paginateOdreDeService(data: IOrdreService[], headers: HttpHeaders) {
    // this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt (headers.get ('X-Total-Count'), 10);
    this.ordreDeServiceS = data;
  }

  annulerDelete() {
    this.ordreDeService = new OrdreService ();
    this.displayDelete = false;
  }

  deleteAll() {
    this.ordreDeService.contratId = this.contrat.id;
    this.ordreDeserviceService.deleteAll (this.ordreDeServiceSelected).subscribe (
      () => {
        this.loadAll ();
        this.showMessage ({sever: 'success', sum: 'ENREGISTREMENT', det: 'offre de Service ajouté avec succès!'});
      },
      () => this.showMessage ({sever: 'error', sum: 'ENREGISTREMENT', det: "Echec d'enregistrement!"})
    );

    this.displayDelete = false;
  }

}
