import {Component, OnInit} from '@angular/core';
import {ITache, Tache} from "app/shared/model/microservicedaccam/tache.model";
import {ITacheEtape, TacheEtape} from "app/shared/model/microservicedaccam/tache-etape.model";
import {IExerciceBudgetaire} from "app/shared/model/microserviceppm/exercice-budgetaire.model";
import {ConfirmationService, MessageService, SelectItem} from "primeng/api";
import {IActivite} from "app/shared/model/microserviceppm/activite.model";
import {ITypeCommission, TypeCommission} from "app/shared/model/microservicedaccam/type-commission.model";
import {IMembreCommission, MembreCommission} from "app/shared/model/microservicedaccam/membre-commission.model";
import {IEtapeActivitePpm} from "app/shared/model/microserviceppm/etape-activite-ppm.model";
import {IUniteAdministrative} from "app/shared/model/microserviceppm/unite-administrative.model";
import {Poste} from "app/shared/model/enumerations/poste.model";
import {IMembre, Membre} from "app/shared/model/microservicedaccam/membre.model";
import {TacheService} from "app/entities/microservicedaccam/tache/tache.service";
import {JhiAlertService, JhiDataUtils, JhiEventManager, JhiParseLinks} from "ng-jhipster";
import {ActivatedRoute, Router} from "@angular/router";
import {ExerciceBudgetaireService} from "app/entities/microserviceppm/exercice-budgetaire/exercice-budgetaire.service";
import {ActiviteService} from "app/entities/microserviceppm/activite/activite.service";
import {MembreCommissionService} from "app/entities/microservicedaccam/membre-commission/membre-commission.service";
import {TypeCommissionService} from "app/entities/microservicedaccam/type-commission/type-commission.service";
import {EtapeActivitePpmService} from "app/entities/microserviceppm/etape-activite-ppm/etape-activite-ppm.service";
import {UniteAdministrativeService} from "app/entities/microserviceppm/unite-administrative/unite-administrative.service";
import {MembreService} from "app/entities/microservicedaccam/membre/membre.service";
import {HttpResponse} from "@angular/common/http";
import {IJourFerier} from "app/shared/model/microserviceppm/jour-ferier.model";
import {TacheComponent} from "app/entities/microservicedaccam/tache/tache.component";
import {LotService} from "app/entities/microservicedaccam/lot/lot.service";
import {ILot} from "app/shared/model/microservicedaccam/lot.model";
import {Etat} from "app/shared/model/enumerations/etat";
import {TypeDossier} from "app/shared/model/enumerations/typeDossier";
import {FileMenagerService} from "app/entities/file-manager/file-menager.service";
import {Fichier} from "app/entities/file-manager/file-menager.model";
import {DataUtils} from "app/entities/file-manager/dataUtils";

@Component({
  selector: 'jhi-create-tache',
  templateUrl: './create-tache.component.html',
  styleUrls: ['./create-tache.component.scss']
})
export class CreateTacheComponent implements OnInit {
  taches: ITache[];
  tache: ITache;
  tacheTMP: ITache[];
  display: boolean;
  ifDescrib = true;
  display2: boolean;
  display3: boolean;
  toSaisi: boolean;
  tacheEtape: ITacheEtape;

  exercices: IExerciceBudgetaire[] = [];
  exercice: IExerciceBudgetaire;
  // activeItem: MenuItem;

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
  etapeActivitePpms: IEtapeActivitePpm[] = [];

  newMembreCommission: IMembreCommission;
  displayAddMembre: boolean;
  uniteadministratives: IUniteAdministrative[];
  postes = [Poste.MEMBRE, Poste.OBSERVATEUR, Poste.PRESIDENT, Poste.RAPPORTEUR];
  membres: IMembre[] = [];

  etaValide: number;
  cont: number;
  id1: number;
  id2: number;
  id3: number;
  objectId: string;
  addNewType: boolean;
  types: SelectItem[];
  fichiers: Fichier[];
  files: Fichier[];
  isSaving: boolean;

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
    protected lotService: LotService,
    protected fileManagerService: FileMenagerService,
    protected fileUtils: DataUtils,
    protected dataUtils: JhiDataUtils,
    protected confirmationService: ConfirmationService
  ) { }
  /* ******************************** fin ************************/
  /* *
   * methode to move element from tab1 to Tab2 of the same type
   * @param objet
   * @param table1
   * @param table2
   */
  static moveElmementFromTab1ToTab2Copi(objet: any, table1: any[], table2: any[]) {
    const index = table1.indexOf(objet);
    table1.splice(index, 1);
    if (!table2.includes(objet)) {
      table2.push(objet);
    }
  }

  previousState() {
    window.history.back();
  }

  loadExercice() {
    this.exerciceService.findAllWithoutPage()
      .subscribe((res: HttpResponse<IExerciceBudgetaire[]>) => {
        this.exercices = res.body;
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

  loadTypeCommission() {
    this.typCommissionService.findAllTypeCommisWithoutPage()
      .subscribe((res: HttpResponse<ITypeCommission[]>) => {
        this.typeComissions = res.body;
      });
  }

  loadAllMembres() {
    this.membreService.findAll()
      .subscribe(
        (res: HttpResponse<IMembre[]>) => {
          this.membres = res.body;
        });
  }

  ngOnInit() {

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
    this.initElement();

    this.activatedRoute.params.subscribe(params => {
      this.id1 = params['id1'];
      this.id2 = params['id2'];
      this.id3 = params['id3'];
      this.updateElementId();
      this.findTacheByObjectId(this.objectId);
    });

    /* const id1 = this.activatedRoute.snapshot.queryParams.id1;
    const id2 = this.activatedRoute.snapshot.queryParams.id2;*/
  }

  updateElementId() {
    if (this.id2.toString().includes('null') && !this.id1.toString().includes('null')) {
      this.objectId = this.id1 + '' + this.id3;
      this.tache.avisDacId = this.id1;
    }
    if (!this.id2.toString().includes('null') && this.id1.toString().includes('null')) {
      this.objectId = this.id2 + '' + this.id3;
      this.tache.lotId = this.id2;
      this.lotService.find(this.tache.lotId).subscribe((res: HttpResponse<ILot>) => {
        this.tache.avisDacId = res.body.activiteId;
      });
    }
    if (!this.id2.toString().includes('null') && !this.id1.toString().includes('null')) {
      this.objectId = this.id1 + '' + this.id2 + '' + this.id3;
      this.tache.avisDacId = this.id1;
      this.tache.lotId = this.id2;
    }
  }

  findTacheByObjectId(objectId: string) {
    this.isSaving = true;
    this.tacheService.findByObjectId(objectId)
      .subscribe((res: HttpResponse<ITache>) => {
        this.tache = res.body;
        if (this.tache) {
          this.modifTache(this.tache);
        } else {
          this.creeTache();
        }
        this.isSaving = false;
      });
  }

  initElement() {
    this.tache = new Tache();
    this.tache.tacheEtapes = [];
    this.tache.membreCommissions = [];
    this.calculerEtatValidite();
  }

  findTacheByid(id: number) {
    this.tacheService.find(id).subscribe((res: HttpResponse<ITache>) => {
      this.modifTache(res.body);
    })
  }

  /* *
   * Fonction d'enregistrement de la tâche
   */
  save() {
    this.tache.typeCommission = this.typeComission;
    this.tache.etatAvancement = this.etaValide;
    window.console.log(this.tache);
    if (this.tache.id !== undefined) {
      this.tacheService.update(this.tache).subscribe((tache: HttpResponse<ITache>) => {
        this.findTacheByid(tache.body.id);
        this.showMessage('key1','info', 'CREATION', 'Tâche modifier avec succès !');
      });
    } else {
      this.tacheService.create(this.tache).subscribe((tache: HttpResponse<ITache>) => {
        this.findTacheByid(tache.body.id);
        this.showMessage('key1','info', 'MODIFICATION', 'Tâche modifier avec succès !');
      });
    }

  }

  /* *
   * la fonction executer lors de la selection d'un type de commission
   */
  onTypeChange() {
    if (this.typeComission) {
      this.membreCommissionService.findAllByActiviteAndTypeCommiss(this.tache.avisDacId, this.typeComission.id)
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
    this.updateElementId();
    this.tache.objectId = this.objectId;
    window.console.log(this.tache);
    this.calculerEtatValidite();
  }

  modifTache(tach: ITache) {
    if (tach) {
      this.tache = tach;
      this.getFiles(this.tache);
      this.typCommissionService.findAllTypeCommisWithoutPage()
        .subscribe((res: HttpResponse<ITypeCommission[]>) => {
          this.typeComissions = res.body;
          if (this.tache.membreCommissions.length > 0) {
            this.typeComission = this.typeComissions.find(value =>
              value.id === this.tache.membreCommissions[0].typeCommission.id)
          }
        });
    }
    this.loadMembreNoteAffected();
    this.loadRefNoteAffected();
    this.calculerEtatValidite();
    // this.display = true;
  }

  annuler() {
    this.activite = null;
    this.membreCommissions = [];
    this.typeComission = null;
    this.tache = new Tache();
    this.display = false;
  }
  /* ********************** fin ***************************/

  /* ************************************************************
   * les fonction pour letraitement des membres a une tache
   * ***********************************************************
   */
  loadMembreNoteAffected() {
    if (this.typeComission) {
      this.membreCommissionService.findAllByActiviteAndTypeCommiss(this.tache.avisDacId, this.typeComission.id)
        .subscribe((res: HttpResponse<IMembreCommission[]>) => {
          this.membreCommissionNoteAffected = res.body;
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
    if (this.typeComission) {
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
    if (membreCommiss.id !== undefined) {
      CreateTacheComponent.moveElmementFromTab1ToTab2Copi(membreCommiss, this.tache.membreCommissions,
        this.membreCommissionNoteAffected);
    } else {
      const index = this.tache.membreCommissions.indexOf(membreCommiss);
      this.tache.membreCommissions.splice(index, 1);
    }
  }

  addMembre(membreCommiss: IMembreCommission) {
    CreateTacheComponent.moveElmementFromTab1ToTab2Copi(membreCommiss,
      this.membreCommissionNoteAffected, this.tache.membreCommissions);
  }

  addSelectedMembre() {
    if (this.membreCommissionsToAffecte.length > 0) {
      this.membreCommissionsToAffecte.forEach(value => {
        this.addMembre(value);
      });
    }
  }

  removeSelectedMembre() {
    if (this.membreCommissionsToRemove.length > 0) {
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
    this.refNoteAffected = [];
    this.etapeActiviteService.findAllByActivite(this.tache.avisDacId)
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

  ajouteRef() {
    this.refNoteAffected = [];
    this.loadRefNoteAffected();
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
    if (this.refToAffecte.length > 0) {
      this.refToAffecte.forEach(value => {
        this.addRef(value);
        this.calculerEtatValidite();
      });
    }
  }

  removeSelectedRef() {
    if (this.refToRemove.length > 0) {
      this.refToRemove.forEach(value => {
        if (!value.estRealise) {
          this.removeRef(value);
          this.calculerEtatValidite();
        }
      });
    }
  }

  exerciceLoad() {
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

  saisirEtape() {
    if (this.toSaisi) {
      this.toSaisi = false;
    } else {
      this.tacheEtape = new TacheEtape();
      this.toSaisi = true;
    }
  }

  ajouterEtapeSaisie() {
    if (this.tacheEtape) {
      if (!this.tache.tacheEtapes.some(value => value.etapeLibelle.includes(this.tacheEtape.etapeLibelle))) {
        this.tache.tacheEtapes.push(this.tacheEtape);
        this.calculerEtatValidite();
        this.tacheEtape = new TacheEtape();
      } else {
        this.showMessage('key1','info', 'AJOUT D\'UNE ETAPE', 'Une même existe dans votre Tâche')
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
    if (this.newMembreCommission) {
      this.membreCommissionService.findAllByActiviteAndTypeCommiss(this.tache.avisDacId, this.typeComission.id)
        .subscribe((res: HttpResponse<IMembreCommission[]>) => {
          this.membreCommissionNoteAffected = res.body;

          if (!this.membreCommissionNoteAffected.some(value =>
            value.membre.email.includes(this.newMembreCommission.membre.email) &&
            value.membre.nom.includes(this.newMembreCommission.membre.nom) &&
            value.membre.telephone.includes(this.newMembreCommission.membre.telephone)
          )) {
            // this.newMembreCommission.typeCommissionId = this.typeComission.id;
            this.newMembreCommission.avisDacId = this.tache.avisDacId;
            this.tache.membreCommissions.push(this.newMembreCommission);
            this.newMembreCommission = new MembreCommission();
            this.newMembreCommission.membre = new Membre();
            this.displayAddMembre = false;
          } else {
            this.showMessage('key1','info', 'AJOUT D\'UN MEMBRE', 'Un même meme existe dans votre Tâche')
          }
        });
    }
  }

  calculerEtatValidite() {
    if (this.tache.tacheEtapes.length > 0) {
      const nbrEtape: number = this.tache.tacheEtapes.length;
      const nbEtapeValide: number = this.tache.tacheEtapes.filter(value => value.estRealise).length;
      this.etaValide = Math.trunc((nbEtapeValide / nbrEtape) * 100);
    } else {
      this.etaValide = 0;
    }
    this.tache.etatAvancement = this.etaValide;
    if (this.etaValide === 0) {
      this.tache.etat = Etat.INITIAL;
    }
    if (this.etaValide > 0 && this.etaValide < 100) {
      this.tache.etat = Etat.ENCOURS;
    }

    if (this.etaValide === 100) {
      this.tache.etat = Etat.TERMINE;
    }
  }

  /* ********************** */
  addType() {
    this.typeComission = new TypeCommission();
    this.addNewType = !this.addNewType;
  }

  calculDateFin(ref: ITacheEtape) {
    if (ref) {
      this.tacheService.calculateDateByDelai(ref)
        .subscribe((res: HttpResponse<ITacheEtape>) => {
          ref.dateFin = res.body.dateFin;
        });
    }
  }

  showMessage(theKey: string, sever: string, sum: string, det: string) {
    this.messageService.add({
      severity: sever,
      summary: sum,
      detail: det,
      key: theKey
    });
  }

  /* ** for files manager ** */

  retirerFihier(file) {
    this.confirmationService.confirm({
      message: 'Êtes vous sûr de vouloir supprimer?',
      accept: () => {
        this.fileManagerService.deleteFile(this.tache.id, TypeDossier.TACHE, file.fileName).subscribe((res: HttpResponse<any>) => {
          window.console.log(res.body);
          this.showMessage('key2','success', 'Suppression de fichier', 'Fichier supprimé avec succès');
        });
      }
    });
  }

  setFileData(event) {
    this.fichiers = event.target.files;
    if (event.target.files.length > 0) {
      this.files = [];
      for (let i = 0; i < event.target.files.length; i++) {
        const file = new Fichier();
        this.fileUtils.setFileData(event, file, 'file', false, i);
        file.fileName = event.target.files[i].name;
        this.files.push(file);
      }
      this.tache.files = this.files;
    }
  }

  dowloadFichier(file) {
    this.dataUtils.downloadFile(file.fileContentType, file.file, file.fileName);
  }

  getFiles(tache: ITache) {
    this.tache = tache;
    this.fichiers = this.tache.files;
    window.console.log(this.fichiers);
  }
}
