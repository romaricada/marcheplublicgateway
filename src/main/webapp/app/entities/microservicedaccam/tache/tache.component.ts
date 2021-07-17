import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {ITache, Tache} from 'app/shared/model/microservicedaccam/tache.model';

import {ITEMS_PER_PAGE} from 'app/shared/constants/pagination.constants';
import {TacheService} from './tache.service';
import {ExerciceBudgetaire, IExerciceBudgetaire} from "app/shared/model/microserviceppm/exercice-budgetaire.model";
import {IActivite} from "app/shared/model/microserviceppm/activite.model";
import {ITypeCommission} from "app/shared/model/microservicedaccam/type-commission.model";
import {IMembreCommission, MembreCommission} from "app/shared/model/microservicedaccam/membre-commission.model";
import {ExerciceBudgetaireService} from "app/entities/microserviceppm/exercice-budgetaire/exercice-budgetaire.service";
import {ActiviteService} from "app/entities/microserviceppm/activite/activite.service";
import {MembreCommissionService} from "app/entities/microservicedaccam/membre-commission/membre-commission.service";
import {TypeCommissionService} from "app/entities/microservicedaccam/type-commission/type-commission.service";
import {MenuItem, MessageService} from "primeng/api";
import {filter, map} from "rxjs/operators";
import {EtapeActivitePpmService} from "app/entities/microserviceppm/etape-activite-ppm/etape-activite-ppm.service";
import {IEtapeActivitePpm} from "app/shared/model/microserviceppm/etape-activite-ppm.model";
import {ITacheEtape, TacheEtape} from "app/shared/model/microservicedaccam/tache-etape.model";
import {IMembre, Membre} from "app/shared/model/microservicedaccam/membre.model";
import {IJourFerier} from "app/shared/model/microserviceppm/jour-ferier.model";
import {IUniteAdministrative} from "app/shared/model/microserviceppm/unite-administrative.model";
import {UniteAdministrativeService} from "app/entities/microserviceppm/unite-administrative/unite-administrative.service";
import {Poste} from "app/shared/model/enumerations/poste.model";
import {MembreService} from "app/entities/microservicedaccam/membre/membre.service";
import {TypeDelai} from "app/shared/model/enumerations/TypeDelai";
import {ITacheWorkflow, TacheWorkflow} from "app/shared/model/microservicedaccam/tache-workflow.model";
import {IWorkflow, Workflow} from "app/shared/model/microservicedaccam/workflow.model";
import {ILot} from "app/shared/model/microservicedaccam/lot.model";
import {LotService} from "app/entities/microservicedaccam/lot/lot.service";

@Component({
  selector: 'jhi-tache',
  templateUrl: './tache.component.html',
  styleUrls: ['./tache.component.scss']
})
export class TacheComponent implements OnInit, OnDestroy {
  taches: ITache[];
  tache: ITache;
  tacheTMP: ITache[];
  display: boolean;
  ifDescrib = true;
  display2: boolean;
  display3: boolean;
  toSaisi: boolean;
  tacheEtape: ITacheEtape;
  display4: boolean;
  select1: number;
  exercices: IExerciceBudgetaire[]=[];
  exercice: IExerciceBudgetaire;
  items1: MenuItem[];
  curentExercice: IExerciceBudgetaire;
  activites: IActivite[];
  activite: IActivite;
  typeComissions: ITypeCommission[];
  typeComission: ITypeCommission;
  membreCommissions: IMembreCommission[] = [];
  membreCommissionsToRemove: IMembreCommission[] = [];
  membreCommissionNoteAffected: IMembreCommission[] = [];
  membreCommissionsToAffecte: IMembreCommission[] = [];
  refToRemove: ITacheEtape[] = [];
  refNoteAffected: ITacheEtape[] = [];
  refToAffecte: ITacheEtape[] = [];
  etapeActivitePpms: IEtapeActivitePpm[]=[];
  newMembreCommission: IMembreCommission;
  displayAddMembre:boolean;
  uniteadministratives: IUniteAdministrative[];
  postes = [Poste.MEMBRE, Poste.OBSERVATEUR, Poste.PRESIDENT, Poste.RAPPORTEUR];
  membres: IMembre[]=[];
  etaValide: number;
  typeDelais = [TypeDelai.J , TypeDelai.M, TypeDelai.A];
  tacheworkflow: ITacheWorkflow;
  tacheworkflows: ITacheWorkflow[];
  workflow: IWorkflow;
  workflows: IWorkflow[];
  lots: ILot[];
  lot:ILot;

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
  cont: number;
  myOption: string;

  constructor(
    protected tacheService: TacheService,
    protected parseLinks: JhiParseLinks,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected exerciceService: ExerciceBudgetaireService,
    protected activiteService: ActiviteService,
    protected membreCommissionService: MembreCommissionService,
    protected typCommissionService: TypeCommissionService,
    protected jhiAlertService: JhiAlertService,
    protected etapeActiviteService: EtapeActivitePpmService,
    protected messageService: MessageService,
    protected uniteadministrativeService: UniteAdministrativeService,
    protected membreService: MembreService,
    protected lotService: LotService
  ) {
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.routeData = this.activatedRoute.data.subscribe(data => {
      this.page = data.pagingParams.page;
      this.previousPage = data.pagingParams.page;
      this.reverse = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
    });
  }


  static moveElmementFromTab1ToTab2(objet: any, table1: any[], table2: any[]) {
    const index = table1.indexOf(objet);
    table1.splice(index, 1);
    if (!table2.includes(objet)) {
      table2.push(objet);
    }
  }

  loadExercice() {
    this.exerciceService.findAllWithoutPage()
      .subscribe((res: HttpResponse<IExerciceBudgetaire[]>) => {
        this.exercices = res.body;
      })
  }

  findCurrentSession() {
    this.exerciceService.findCurrentExercice()
      .subscribe((res: HttpResponse<IExerciceBudgetaire>) => {
        res.body !== null ? this.curentExercice = res.body : this.curentExercice = new ExerciceBudgetaire();
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
  loadLotByActivite() {
    this.lotService.findLotByAvisDac(this.activite.id).subscribe((res: HttpResponse<ILot[]>) => {
      this.lots = res.body;
    })
  }

  loadTypeCommission() {
    this.typCommissionService.findAllTypeCommisWithoutPage()
      .subscribe((res: HttpResponse<ITypeCommission[]>)=> {
        this.typeComissions = res.body;
      });
  }

  loadAllMembres() {
    this.membreService.findAll()
      .subscribe(
        (res: HttpResponse<IMembre[]>) => {
          this.membres = res.body;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  loadAll() {
    this.tacheService
      .query()
      .pipe(
        filter((res: HttpResponse<ITache[]>) => res.ok),
        map((res: HttpResponse<ITache[]>) => res.body)
      )
      .subscribe(
        (res: ITache[]) => {
          this.taches = null;
          this.tacheTMP = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  transition() {
    this.router.navigate(['/tache'], {
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
      '/tache',
      {
        page: this.page,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    ]);
    this.loadAll();
  }

  ngOnInit() {
    this.items1 = [
      {label: 'Toutes', icon: 'fa fa-fw fa-tasks', command: () => {this.select1 = 0; this.activiteLoad()}},
      {label: 'Tache en cours', icon: 'fa fa-fw fa-calendar', command: () => {this.select1 = 1; this.activiteLoad()}},
      {label: 'Tache validée', icon: 'fa fa-fw fa-book', command: () => {this.select1 = 2; this.activiteLoad()}},
      {label: 'Tache Terminer', icon: 'fa fa-fw fa-book', command: () => {this.select1 = 3; this.activiteLoad()}},
    ];
    this.loadAll();
    this.registerChangeInTaches();
    this.tache = new Tache();
    this.loadExercice();
    this.findCurrentSession();
    this.loadTypeCommission();
    this.exercices = [];
    this.cont = 0;
    this.tacheTMP = [];
    this.toSaisi = false;
    this.tacheEtape = new TacheEtape();

    this.newMembreCommission = new MembreCommission();
    this.newMembreCommission.membre = new Membre();

    this.loadAllMembres();

    this.uniteadministrativeService
      .findAll()
      .subscribe((res: HttpResponse<IJourFerier[]>) => this.uniteadministratives = res.body);
    this.tacheworkflow = new TacheWorkflow();
    this.tacheworkflows = [];
    this.workflow = new Workflow();
    this.tacheworkflows = [];
    this.select1 = 0;
  }


  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITache) {
    return item.id;
  }

  registerChangeInTaches() {
    this.eventSubscriber = this.eventManager.subscribe('tacheListModification', () => this.loadAll());
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateTaches(data: ITache[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    this.taches = data;
  }

  /* *
   * Fonction d'enregistrement de la tâche
   */
  save() {
    if(this.tache.id !== undefined) {
      this.tacheService.update(this.tache).subscribe(() => {
        this.loadAll();
        this.annuler();
      })
    } else {
      this.tacheService.create(this.tache).subscribe(() => {
        this.loadAll();
        this.annuler();
      });
    }

  }

  /* *
   * la fonction executer lors de la selection d'une activite
   */
  onActiviteChange() {
    if(this.activite) {
      this.tache.avisDacId = this.activite.id;
      this.loadLotByActivite();
    } else {
      this.tache.avisDacId = null;
    }
  }

  /* *
   * la fonction executer lors de la selection d'un type de commission
   */
  onTypeChange() {
    if (this.activite && this.typeComission) {
      this.membreCommissionService.findAllByActiviteAndTypeCommiss(this.activite.id, this.typeComission.id)
        .subscribe((res: HttpResponse<IMembreCommission[]>) => {
          this.membreCommissions = res.body;
        });
    }
  }

  /* *
   * les fonction d'affiche du dialoge de creation et de la modification de la tache
   */
  creeTache() {
    this.tache = new Tache();
    this.tache.membreCommissions = [];
    this.tache.tacheEtapes = [];
    this.calculerEtatValidite();
    this.display = true;
  }

  modifTache(tach: ITache) {
    if (tach) {
      this.tache = tach;
      this.activite = this.activites.find(value => value.id === this.tache.avisDacId);
      if(this.tache.membreCommissions.length > 0) {
        this.typeComission = this.typeComissions.find(value =>
          value.id === this.tache.membreCommissions[0].typeCommission.id);
      }
    }
    this.loadMembreNoteAffected();
    this.loadRefNoteAffected();
    this.display = true;
  }

  boolVoir(tacheV: ITache) {
    if (tacheV) {
      this.tache = tacheV;
      this.activite = this.activites.find(value => value.id === this.tache.avisDacId);
      if(this.tache.membreCommissions.length > 0) {
        this.typeComission = this.typeComissions.find(value =>
          value.id === this.tache.membreCommissions[0].typeCommission.id);
      }
    }
    this.loadMembreNoteAffected();
    this.display4 = true;
  }

  annuler() {
    this.activite = null;
    this.membreCommissions = [];
    this.typeComission = null;
    this.tache = new Tache();
    this.display = false;
  }
  /* ********************** fin ***************************/
  annuler4 () {
    this.display4 = false;
  }

  /* ********************** fin ************************** */
  /* ************************************************************
   * les fonction pour letraitement des membres a une tache
   * ***********************************************************
   */
  loadMembreNoteAffected() {
    if(this.activite && this.typeComission) {
      this.membreCommissionService.findAllByActiviteAndTypeCommiss(this.activite.id, this.typeComission.id)
        .subscribe((res: HttpResponse<IMembreCommission[]>) => {
          this.membreCommissionNoteAffected = res.body;
          window.console.log(this.membreCommissionNoteAffected);
          if (this.tache.membreCommissions.length > 0) {
            this.tache.membreCommissions.forEach(value => {
              this.membreCommissionNoteAffected = this.membreCommissionNoteAffected
                .filter(value1 => value1.id !== value.id);
            });
          }
        });
    }
  }

  ajouteMembre() {
      this.membreCommissionNoteAffected = [];
      if (this.activite && this.typeComission) {
        this.loadMembreNoteAffected();
      }
    this.display2 = true;
  }

  closeMembreDiaglog() {
    this.membreCommissionsToAffecte = [];
    this.membreCommissionNoteAffected = [];
    this.display2 = false;
  }

  removeMembre(membreCommiss: IMembreCommission) {
    if(membreCommiss.id !== undefined) {
      TacheComponent.moveElmementFromTab1ToTab2(membreCommiss, this.tache.membreCommissions,
        this.membreCommissionNoteAffected);
    } else {
      const index = this.tache.membreCommissions.indexOf(membreCommiss);
      this.tache.membreCommissions.splice(index, 1);
    }
  }

  addMembre(membreCommiss: IMembreCommission) {
    TacheComponent.moveElmementFromTab1ToTab2(membreCommiss,
      this.membreCommissionNoteAffected, this.tache.membreCommissions);
  }

  addSelectedMembre() {
    if(this.membreCommissionsToAffecte.length > 0) {
      this.membreCommissionsToAffecte.forEach(value => {
        this.addMembre(value);
      });
    }
  }

  removeSelectedMembre() {
    if(this.membreCommissionsToRemove.length > 0) {
      this.membreCommissionsToRemove.forEach(value => {
        this.removeMembre(value);
      });
    }
  }
  /* ******************************** fin ************************/

  /* *************************************************************
   * les fonction pour le traitement  des eTapes  a d'une tache
   * ************************************************************
   */
  /* * fonction pour loader les etapes non affecter a une taches **/
  loadRefNoteAffected() {
    if(this.activite) {
      this.refNoteAffected = [];
      this.etapeActiviteService.findAllByActivite(this.activite.id)
        .subscribe((res: HttpResponse<IEtapeActivitePpm[]>) => {
          this.etapeActivitePpms = res.body;
          res.body.forEach(value => {
            const myTacheEtape: ITacheEtape = new TacheEtape();
            myTacheEtape.etapeActivitePpmId = value.id;
            myTacheEtape.etapeLibelle = value.etape.libelle;
            this.refNoteAffected.push(myTacheEtape);
          });

          if (this.tache.tacheEtapes.length > 0) {
            this.tache.tacheEtapes.forEach(value => {
              this.refNoteAffected = this.refNoteAffected
                .filter(value1 => value1.etapeActivitePpmId !== value.etapeActivitePpmId);
            });
          }
          this.calculerEtatValidite();
        });
    }
  }

  ajouteRef() {
    this.refNoteAffected = [];
    if (this.activite) {
      this.loadRefNoteAffected();
    }
    this.display3 = true;
  }

  closeRefDiaglog() {
    this.refToAffecte = [];
    this.refNoteAffected = [];
    this.display3 = false;
  }

  removeRef(tacheTape: ITacheEtape) {
    if (tacheTape.etapeActivitePpmId != null) {
      TacheComponent.moveElmementFromTab1ToTab2(tacheTape, this.tache.tacheEtapes,
        this.refNoteAffected);
    } else {
      const index = this.tache.tacheEtapes.indexOf(tacheTape);
      this.tache.tacheEtapes.splice(index, 1);
    }
  }

  addRef(tacheEtape: IMembreCommission) {
    TacheComponent.moveElmementFromTab1ToTab2(tacheEtape,
      this.refNoteAffected, this.tache.tacheEtapes);
  }
  addSelectedRef() {
    if(this.refToAffecte.length > 0) {
      this.refToAffecte.forEach(value => {
        this.addRef(value);
        this.calculerEtatValidite();
      });
    }
  }

  removeSelectedRef() {
    if(this.refToRemove.length > 0) {
      this.refToRemove.forEach(value => {
        if(!value.estRealise) {
          this.removeRef(value);
          this.calculerEtatValidite();
        }
      });
    }
  }

  exerciceLoad () {
    this.activiteService.findAllByAnneeExercice(this.getExerciceId()).subscribe((res: HttpResponse<IActivite[]>) => {
      if (res.body.length > 0) {
        res.body.forEach(value => {
          value.nomActivite = value.codeLignePlan + ' ' + value.naturePrestationLibelle;
        });
      }
      this.activites = res.body;
      this.taches = null;
    });
  }
  getExerciceId(): number {
    if (this.exercice !== null) {
      return this.exercice.id;
    } else {
      return 0;
    }
  }

  activiteLoad() {
    this.taches = null;
    if (this.activite !== null && this.activite.id !== undefined) {
      if (this.select1 === 0) {
        window.console.log("------------------------------");
        window.console.log(this.tacheTMP);
        this.taches = this.tacheTMP.filter(t => t.avisDacId === this.activite.id);
      }
      if (this.select1 === 1) {
        this.taches = this.tacheTMP;
        window.console.log(this.taches);
      }
    } else
      this.taches = null;
  }

  saisirEtape() {
    if(this.toSaisi) {
      this.toSaisi=false;
    } else {
      this.tacheEtape = new TacheEtape();
      this.toSaisi=true;
    }
  }

  ajouterEtapeSaisie() {
    if(this.tacheEtape) {
      if(!this.tache.tacheEtapes.some(value => value.etapeLibelle.includes(this.tacheEtape.etapeLibelle))) {
        this.tache.tacheEtapes.push(this.tacheEtape);
        this.calculerEtatValidite();
        this.tacheEtape = new TacheEtape();
      } else {
        this.showMessage('info', 'AJOUT D\'UNE ETAPE', 'Une même existe dans votre Tâche')
      }
    }
  }

  /* **** ajout d'un nouveau membre***** */
  showDialoToaddMembre() {
    this.newMembreCommission = new MembreCommission();
    this.newMembreCommission.membre = new Membre();
    this.displayAddMembre = true;
  }

  annulerAjouMembre() {
    this.newMembreCommission = new MembreCommission();
    this.newMembreCommission.membre = new Membre();
    this.displayAddMembre = false;
  }

  saveMembre() {
    if(this.newMembreCommission) {
      this.membreCommissionService.findAllByActiviteAndTypeCommiss(this.activite.id, this.typeComission.id)
        .subscribe((res: HttpResponse<IMembreCommission[]>) => {
          this.membreCommissionNoteAffected = res.body;

          if(!this.membreCommissionNoteAffected.some(value =>
            value.membre.email.includes(this.newMembreCommission.membre.email) &&
            value.membre.nom.includes(this.newMembreCommission.membre.nom) &&
            value.membre.telephone.includes(this.newMembreCommission.membre.telephone)
          )) {
            this.newMembreCommission.typeCommissionId = this.typeComission.id;
            this.newMembreCommission.avisDacId = this.activite.id;
            this.tache.membreCommissions.push(this.newMembreCommission);
            this.newMembreCommission = new MembreCommission();
            this.newMembreCommission.membre = new Membre();
            this.displayAddMembre = false;
          } else {
            this.showMessage('info', 'AJOUT D\'UN MEMBRE', 'Un même meme existe dans votre Tâche')
          }});
    }
  }

  calculerEtatValidite() {
    if (this.tache.tacheEtapes.length>0) {
      const nbrEtape:number = this.tache.tacheEtapes.length;
      const nbEtapeValide:number = this.tache.tacheEtapes.filter(value => value.estRealise).length;
      this.etaValide = Math.trunc((nbEtapeValide / nbrEtape) * 100);
    } else {
      this.etaValide = 0;
    }
  }

  onLoChange() {
    this.tache.lotId = this.lot.id;
  }

  showMessage(sever: string, sum: string, det: string) {
    this.messageService.add({
      severity: sever,
      summary: sum,
      detail: det
    });
  }
}
