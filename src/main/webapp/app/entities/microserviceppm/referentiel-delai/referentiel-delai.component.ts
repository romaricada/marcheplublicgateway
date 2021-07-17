import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import { JhiAlertService, JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { IReferentielDelai, ReferentielDelai } from 'app/shared/model/microserviceppm/referentiel-delai.model';
import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { ReferentielDelaiService } from './referentiel-delai.service';
import { Etape, IEtape } from 'app/shared/model/microserviceppm/etape.model';
import { Acteur, IActeur } from 'app/shared/model/microserviceppm/acteur.model';
import {IModePassation, ModePassation} from 'app/shared/model/microserviceppm/mode-passation.model';
import { EtapeService } from 'app/entities/microserviceppm/etape/etape.service';
import { ActeurService } from 'app/entities/microserviceppm/acteur/acteur.service';
import { ModePassationService } from 'app/entities/microserviceppm/mode-passation/mode-passation.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { filter, map } from 'rxjs/operators';
import {INormeReference, NormeReference} from 'app/shared/model/microserviceppm/norme-reference.model';


@Component({
  selector: 'jhi-referentiel-delai',
  templateUrl: './referentiel-delai.component.html',
  styleUrls: ['./referentiel-delai.component.scss']
})
export class ReferentielDelaiComponent implements OnInit, OnDestroy {
  referentielDelais: IReferentielDelai[];
  referentielDelaiTMP: IReferentielDelai[];
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
  referentiel: IReferentielDelai;
  etape: IEtape;
  etapes: IEtape[];
  acteur: IActeur;
  acteurTMP: IActeur[];
  modePassation : IModePassation;
  acteurs: IActeur[];
  filtreActeur: IActeur;
  modepassationId: number;
  modepassations: IModePassation[];
  modepassationsList: IModePassation[];
  isSaving: boolean;
  referentielDelaisSelect: IReferentielDelai[];
  referentielDelaisList: IReferentielDelai[];
  referentielDelaisForm: IReferentielDelai[];
  displaySupprimer: boolean;
  normeReferences: INormeReference[];
  normeReference : INormeReference;

  constructor(
    protected referentielDelaiService: ReferentielDelaiService,
    protected etapeService: EtapeService,
    protected acteurService: ActeurService,

    protected modePassationService: ModePassationService,
    protected parseLinks: JhiParseLinks,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected jhiAlertService: JhiAlertService,
    protected messageService: MessageService,
    protected confirmationService: ConfirmationService
  ) {
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.routeData = this.activatedRoute.data.subscribe(data => {
      this.page = data.pagingParams.page;
      this.previousPage = data.pagingParams.page;
      this.reverse = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
    });
  }

  loadAllNorme() {
    this.referentielDelaiService.getNormeReferences()
      .subscribe(
        (res: HttpResponse<INormeReference[]>) => {
          this.normeReferences = res.body;
        },
        () => this.showMessage('error', 'Chargement', 'erreur de chargement')

      );


    this.modePassationService.findAllByModePassation().subscribe((res: HttpResponse<IModePassation[]>) => {
      this.modepassationsList = res.body;
      window.console.log("==============modepassationsList===================");
      window.console.log(this.modepassationsList);
      window.console.log("==============modepassationsList===================");
    });
  }

  loadAllReferentiel(){
    this.referentielDelaiService
      .query()
      .subscribe(
        (res: HttpResponse<IReferentielDelai[]>) => (this.referentielDelaisList = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }
  loadAll(): void {}

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  transition() {
    this.router.navigate(['/referentiel-delai'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    });

  }

  clear() {
    this.page = 0;
    this.router.navigate([
      '/referentiel-delai',
      {
        page: this.page,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    ]);

  }

  ngOnInit() {
    this.normeReferences = [];
    this.referentielDelaisSelect = [];
    this.referentielDelaisForm = [];
    this.init();
    this.loadAllNorme();
    this.loadAllReferentiel();
    this.displayAdd = false;
    this.referentiel = new ReferentielDelai();
    this.acteurTMP = [];
    this.filtreActeur = {};
    this.registerChangeInReferentielDelais();
  }

  init() {
    this.etapeService
      .query()
      .subscribe(
        (res: HttpResponse<IEtape[]>) => {
          this.etapes = res.body.filter(e => e.deleted === false)
        },
        (res: HttpErrorResponse) => this.onError(res.message));
    this.acteurService
      .query()
      .pipe(
        filter((res: HttpResponse<IReferentielDelai[]>) => res.ok),
        map((res: HttpResponse<IReferentielDelai[]>) => res.body)
      )
      .subscribe(
        (res: IActeur[]) => {
          this.acteurs = res.filter(a => !a.deleted);
          window.console.log('+++++++++++++++++++++' + this.acteurs.length);
          this.acteurTMP = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message));
    this.modePassationService
      .query()
      .subscribe(
        (res: HttpResponse<IModePassation[]>) => (this.modepassations = res.body.filter(m => m.deleted === false)),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IReferentielDelai) {
    return item.id;
  }

  registerChangeInReferentielDelais() {
    this.eventSubscriber = this.eventManager.subscribe('referentielDelaiListModification', () => this.loadAllNorme());
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateReferentielDelais(data: IReferentielDelai[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    this.referentielDelais = data;
  }

  /* add(referentiel: IReferentielDelai) {
    referentiel === null ? (this.referentiel = new ReferentielDelai()) : (this.referentiel = referentiel);
    this.displayAdd = true;
  } */
  add (ref: IReferentielDelai){
    if(ref != null){
      this.referentiel = ref;
    } else {
      this.referentiel =  new ReferentielDelai();
      this.referentiel.acteur = new Acteur();
      this.referentiel.etape = new Etape();
      this.referentiel.normeReference = new NormeReference();
      this.referentiel.modePassation = new ModePassation();

    }
    this.displayAdd = true;

  }


  update(data) {
    this.modepassationId = data.id;
    this.referentielDelaisForm = data.referenciels;
    this.displayAdd = true;
  }



  addReferentiel() {
    this.referentielDelaisForm = [];
    this.modepassationId = null;
    this.displayAdd = true;
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
  protected subscribeToSaveResponse(result: Observable<HttpResponse<IReferentielDelai>>) {
    result.subscribe(
      () => {
        this.showMessage('success', 'ENREGISTREMENT', 'Un referentiel de delai ajouté avec succès!');
        this.onSaveSuccess();
      },
      () => {
        this.showMessage('error', 'ENREGISTREMENT', "Echec d'enregistrement!");
        this.onSaveError();
      }
    );
  }

 save() {
    window.console.log('=========================');
    window.console.log(this.referentielDelaisForm);
    window.console.log('==========================');

     this.referentielDelaiService.saveList(this.referentielDelaisForm).subscribe((res: HttpResponse<number>) => {
       window.console.log(res.body);
       this.onSaveSuccess();
     });





  }


  /* save() {
    if (!this.ifExist()) {
      this.isSaving = true;
      if (this.referentiel.id !== undefined) {
        this.subscribeToSaveResponse(this.referentielDelaiService.update(this.referentiel));
        this.displayAdd = false;
      } else {
        this.referentiel.modePassationId = this.modePassation.id
        this.referentielDelaiService.saveList(this.referentielDelaisForm).subscribe((res: HttpResponse<number>) => {
          window.console.log(res.body);
          this.displayAdd = false;
        });
      }
    }
      else {
      this.showMessage('error', 'ENREGISTREMENT', 'cette offre existe déjà !');
    }
    this.referentiel = new ReferentielDelai();
    this.referentiel.normeReference = new NormeReference();
    this.referentiel.etape = new Etape();
    this.referentiel.acteur = new Acteur();
  }





ifExist(): boolean{
    return this.referentielDelais.some(
      value => value.id != this.referentiel.id &&
        value.modePassationId === this.referentiel.modePassationId &&
        value.etape === this.referentiel.etape &&
        value.normeReference === this.referentiel.normeReference &&
        value.acteur === this.referentiel.acteur
    );

}
*/


  /* ifExist(): boolean {
    if (this.referentiel.id) {
      return this.referentielDelais.some(value => value.id !== this.referentiel.id );
    }
  }*/




  protected onSaveSuccess() {
    this.showMessage('success', 'ENREGISTREMENT', 'Referentiel delai ajouté avec succès.');
    this.isSaving = false;
   this.loadAllNorme();
    this.displayAdd = false;
  }

  protected onSaveError() {
    this.showMessage('error', 'ENREGISTREMENT', "Echec d'enregistrement.");
    this.isSaving = false;
    this.displayAdd = false;
  }

  annulle() {
    this.displayAdd = false;
    this.loadAllNorme();
  }

  supprimer() {
    this.displaySupprimer = true;
    this.loadAllNorme();
  }

  annulleSuppri() {
    this.displaySupprimer = false;
  }

  deleteAll(referentielDelaisSelect) {
    // console.log("---------------------------");
    // console.log(referentielDelaisSelect);
    this.referentielDelaiService
      .updateAll(referentielDelaisSelect)

      .subscribe(
        () => {

          this.showMessage('error', 'SUPPRESSION', 'Suppression effectuée avec succès !!!');
        }, () => this.showMessage('error', 'SUPPRESSION', 'Echec de la suppression !!!')
      );
    this.displaySupprimer = false;
  }

  showMessage(sever: string, sum: string, det: string) {
    this.messageService.add({
      severity: sever,
      summary: sum,
      detail: det
    });

  }

  loadActeurs() {
    window.console.log(this.filtreActeur);
    if (this.filtreActeur !== null) {
      this.referentielDelais = this.referentielDelaiTMP.filter(a => a.acteur.libelle === this.filtreActeur.libelle);
    } else {
      this.referentielDelais = this.referentielDelaiTMP;
    }
  }

  supprimerElement(modePassation) {
    window.console.log('============');
    window.console.log(modePassation.id);
    window.console.log('============');
    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Etes-vous sûr de vouloir supprimer ?',
      accept: () => {
        this.referentielDelaiService.removeList(modePassation.id).subscribe(() => {
            this.loadAll();
            this.modePassationService.findAllByModePassation().subscribe((res: HttpResponse<IModePassation[]>) => {
              this.modepassationsList = res.body;
            });
            this.showMessage('success', 'SUPPRESSION', 'Suppression effectuée avec succès !');
          },
          () => this.showMessage('error', 'SUPPRESSION', 'Echec de la suppression !'));
      }
    });
    this.loadAllNorme();
  }

  modeSelect(modePassationId) {
    if (this.referentielDelaisForm.length === 0) {
      this.referentiel = new ReferentielDelai();
      this.referentiel.etape = new Etape();
      this.referentiel.acteur = new Acteur();
      this.referentiel.normeReference = new NormeReference();
      this.referentiel.modePassationId = modePassationId;
      window.console.log("******2**"+this.referentiel.modePassationId);
      window.console.log("******3**"+this.referentiel.etape);
      window.console.log("******4**"+this.referentiel.acteur);
      window.console.log("******5**"+this.referentiel.normeReference.id);
       this.referentielDelaisForm.push(this.referentiel);
    } else {
      this.referentielDelaisForm.forEach(value => value.modePassationId === modePassationId);
    }
  }

  addLigne(modepassationId) {
    this.referentiel = new ReferentielDelai();
    this.referentiel.etape = new Etape();
    this.referentiel.acteur = new Acteur();
    this.referentiel.normeReference = new NormeReference();
    this.referentiel.modePassationId = modepassationId;
   this.referentielDelaisForm.push(this.referentiel);
    window.console.log('+++++++++++++++++++++' + this.acteurs.length);
  }

  addByKey(event) {
    if (event.key === 'Enter') {
      this.addLigne(this.modepassationId);
      window.console.log(event);
    }
  }

  retirer(refereciel: IReferentielDelai) {
    const index = this.referentielDelaisForm.indexOf(refereciel);
    this.referentielDelaisForm.splice(index, 1);
  }

  initValue(refDelai) {
    if (!refDelai.intervalle) {
      refDelai.normeMin = undefined;
      refDelai.normeMax = undefined;
      refDelai.referentielMin = undefined;
      refDelai.referentielMin = undefined;
    } else {
      refDelai.norme = undefined;
      refDelai.referentiel = undefined;
    }
  }

}
