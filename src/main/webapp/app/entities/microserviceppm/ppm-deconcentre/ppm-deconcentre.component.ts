import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { ImportExportService } from 'app/entities/microserviceppm/import-export/import-export.service';
import { saveAs } from 'file-saver';
import { MenuItem, MessageService } from 'primeng/api';
import {ExerciceBudgetaire, IExerciceBudgetaire} from 'app/shared/model/microserviceppm/exercice-budgetaire.model';
import { ExerciceBudgetaireService } from 'app/entities/microserviceppm/exercice-budgetaire/exercice-budgetaire.service';
import {Activite, IActivite} from 'app/shared/model/microserviceppm/activite.model';
import { ActiviteService } from 'app/entities/microserviceppm/activite/activite.service';
import { PPMService } from 'app/entities/microserviceppm/ppm/ppm.service';
import {IPPM, PPM} from 'app/shared/model/microserviceppm/ppm.model';
import {PpmActivite} from "app/shared/model/microserviceppm/ppm-activite.model";
import {IReferentielDelai} from "app/shared/model/microserviceppm/referentiel-delai.model";
import {IModePassation, ModePassation} from "app/shared/model/microserviceppm/mode-passation.model";
import {INaturePrestation, NaturePrestation} from "app/shared/model/microserviceppm/nature-prestation.model";
import {IBesoin} from "app/shared/model/microserviceppm/besoin.model";
import {ILigneBudgetaire} from "app/shared/model/microserviceppm/ligne-budgetaire.model";
import {
  BesoinLigneBudgetaire,
  IBesoinLigneBudgetaire
} from "app/shared/model/microserviceppm/besoin-ligne-budgetaire.model";
import {IEtape} from "app/shared/model/microserviceppm/etape.model";

@Component({
  selector: 'jhi-ppm-deconcentre',
  templateUrl: './ppm-deconcentre.component.html',
  styleUrls: ['./ppm-deconcentre.scss']
})
export class PpmDeconcentreComponent implements OnInit, OnDestroy {
  activites: IActivite[];
  exercices: IExerciceBudgetaire[];
  exercice: IExerciceBudgetaire;
  ppms: IPPM[];
  error: any;
  success: any;
  eventSubscriber: Subscription;
  fichier: File;
  reference: string;
  display1: boolean;
  display: boolean;
  isSaving: boolean;
  isReloade: boolean;
  items: MenuItem[];
  ppm: IPPM;
  activite: IActivite;
  modePassation: IModePassation;
  naturePrestation: INaturePrestation;
  naturePrestations: INaturePrestation[];
  referentielDelais: IReferentielDelai[];
  calendriers: Object[];
  besoins: IBesoin[];
  besoinSelecteds: IBesoin[];
  totalMontantBesoin: number;
  exerciceBudgetaire: IExerciceBudgetaire;
  periodeLancementAppel: Date;
  dateProblableDemaragePrestation: Date;
  public eventMarkers: any;
  activiteSelecteds: IActivite[];
  lignebudgetaire: ILigneBudgetaire;
  besoinLigneBudgetaire: IBesoinLigneBudgetaire;
  priodeRemiseOffre: Date;
  dateProbableDemarage: Date;
  dateButoire: Date;
  debut: Date;
  fin: Date;
  natureTmp: INaturePrestation;
  // clonedBesoin: { [s: string]: IBesoin; } = {};
  taskfield: Object;
  detailListe = false;
  detailCalendar = false;
  libelle = '';
  // etapesSelecteds: IEtape[] = [];
  // displayDate = false;
  etapes: IEtape[] = [];



  constructor(
    protected importExportService: ImportExportService,
    protected activiteService: ActiviteService,
    protected ppmService: PPMService,
    protected parseLinks: JhiParseLinks,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected messageService: MessageService,
    protected exerciceBudgetaireService: ExerciceBudgetaireService
  ) {
  }

  loadAll() {
    if (this.exercice === null) {
      this.activites = [];
    } else {
      this.activiteService
        .findAllDeconcentreByAnneeExercice(this.exercice.id)
        .subscribe((res: HttpResponse<IActivite[]>) => {
          this.activites = res.body;
         /* window.console.log("==================");
          window.console.log(this.activites[1].besoinLignes);
          // window.console.log(this.exercices);
          window.console.log("==================");*/

          window.console.log("==========Activites========");
          window.console.log(this.activites);
          // window.console.log(this.exercices);
          window.console.log("==================");
        });
    }
  }


 /* loadAll() {
      this.activiteService
        .findAllDeconcentreByAnneeExercice(this.exercice.id)
        .subscribe((res: HttpResponse<IActivite[]>) => {
          this.activites = res.body;
        });
    }
*/
  init(): void {
    this.display1 = false;
    this.isSaving = false;
    this.reference = '';
    this.isReloade = false;
    // this.exercice = null;
    // this.activites = [];

    this.exerciceBudgetaire = new ExerciceBudgetaire();
    this.besoinLigneBudgetaire = new BesoinLigneBudgetaire();
    this.exercice = new ExerciceBudgetaire();
    this.ppm = new PPM();
    this.exercices = [];
    this.activites = [];
    this.activiteSelecteds = [];
    this.activite = new Activite();
    this.priodeRemiseOffre = new Date();
    this.dateProbableDemarage = new Date();
    this.dateButoire = new Date();
    this.referentielDelais = [];
    // this.checkedAll = true;
    this.totalMontantBesoin = 0;
    this.besoins = [];
    this.naturePrestations = [];
    this.naturePrestation = new NaturePrestation();
    this.besoinSelecteds = [];
    // this.pPMSelected = [];
    this.loadAll();
    // this.registerChangeInPPMS();
    // this.loadBesoin();
    // this.loadNaturePrestation();
    // this.loadAll1();
    // this.loadCurentExercice();
    this.display = false;
    this.modePassation = new ModePassation();
    this.debut = new Date();
    this.fin = new Date();
    this.periodeLancementAppel= new Date();
    this.dateProblableDemaragePrestation= new Date();
    this.calendriers = [];
    this.activite.ppmActivite = new PpmActivite();

    this.eventMarkers = [{
      day: Date.now(),
      label: 'Research phase'
    }];
  }


  ngOnInit() {
    this.init();
    this.items = [
      {
        label: 'Exporter un model ppm',
        icon: 'pi pi-fw pi-file',
        command: () => {
          this.exportModel();
        },
      },
      {
        label: 'Exporter un ppm en excel',
        icon: 'pi pi-fw pi-file',

        command: () => {
          this.exportPPM();
        },
      },
      {
        label: 'Exporter un ppm en pdf',
        icon: 'pi pi-fw pi-file',
        command: () => {
          this.exportPPMToPdf();
        },
      }];

    this.exerciceBudgetaireService.findAllWithoutPage().subscribe((res: HttpResponse<IExerciceBudgetaire[]>) => {
      this.exercices = res.body;
    });
    this.ppmService.findAllPPM().subscribe((res: HttpResponse<IPPM[]>) => {
      this.ppms = res.body;
      window.console.log('==============');
      // window.console.log(this.ppms);
      window.console.log('==============');
    });
    this.registerChangeInActivites();

  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  registerChangeInActivites() {
    this.eventSubscriber = this.eventManager.subscribe('activiteListModification', () => this.loadAll());
  }

  showMessage(severity: string, summary: string, detail: string) {
    this.messageService.add({ severity, summary, detail });
  }

  displayModal() {
    this.display1 = true;
    this.fichier = null;
    this.isSaving = false;
    this.isReloade = false;
    this.reference = '';
  }

  closeModal() {
    this.display1 = false;
  }

  exportModel() {
    this.importExportService.exportDataModel().subscribe(
      value => {
        const filename = value.headers.get('filename');
        this.saveFile(value.body, filename, value.headers.get('content-type'));
      },
      () => {
        this.showMessage('warn', 'Erreur', 'Erreur de téléchargement du model ppm !');
      }
    );
  }

  exportPPM() {
    this.importExportService.exportDataPPM(this.exercice.id).subscribe(
      value => {
        const filename = value.headers.get('filename');
        this.saveFile(value.body, filename, value.headers.get('content-type'));
      },
      (error1: HttpErrorResponse) => {
        if (error1.status === 404) {
          this.showMessage('warn', 'Avertissement', 'Une erreur a survenue lors de l\'exportation du ppm!');
        }
      }
    );
  }


  exportPPMToPdf() {
    this.importExportService.exportDataPPMToPdf(this.exercice.id).subscribe(
      value => {
        const filename = value.headers.get('filename');
        this.saveFile(value.body, filename, value.headers.get('content-type'));
      },
      (error1: HttpErrorResponse) => {
        if (error1.status === 404) {
          this.showMessage('warn', 'Avertissement', 'Une erreur a survenue lors de l\'exportation du ppm!');
        }
      }
    );
  }

  importData() {
    const isExiste = this.ppms.some(value => value.idExercice === this.exercice.id);
    if (isExiste) {
      this.isReloade = true;
      this.showMessage('info', 'Information', 'Un ppm a été déjà importé pour cet\'exercice  ' + this.exercice.annee + '!');
    } else {
      this.saveImportation();
    }
  }

  saveImportation() {
    this.isSaving = true;
    this.importExportService.importDataPPMDeconcentre(this.exercice.id, this.fichier, this.reference, this.isReloade).subscribe(
      () => {
        this.display1 = false;
        this.showMessage('success', 'Information', 'Importation effectée avec succès !');
        this.loadAll();
      },
      () => {
        this.isSaving = false;
        this.showMessage('error', 'Avertissement', 'Une erreur a survenue lors de l\'importation du ppm !');
      });
  }

  saveFile(data: any, filename?: string, type?: string) {
    const blob = new Blob([data], { type: `${type}; charset=utf-8` });
    saveAs(blob, filename);
  }

  setFileData(event) {
    if (event.target.files.length > 0) {
      this.fichier = event.target.files[0];
    }
  }

  filterActivite() {
    this.loadAll();
    window.console.log('====================Activités======================');
    window.console.log('==============' + this.activites);
    window.console.log('===================================================');
  }

  /* add(activite: IActivite) {
    if (activite === null) {

      this.ppm = new PPM();
      this.activite = new Activite();
      this.activite.ppm = new PPM();
      this.activite.ppmActivite = new PpmActivite();

      this.pPMService.generateCodePPM().subscribe(
        (res: HttpResponse<IPPM>) => {
          this.ppm = res.body;

        }, () => this.message('myKey3', 'error', 'erreur de génération','erreur de génération du code PPM ')
      );

      this.activiteService.generateCodeActivite().subscribe(
        (resAct: HttpResponse<IActivite>) => {
          // this.codeActivite = res.body;

          this.activite.codeLignePlan = resAct.body.codeLignePlan;
        }, () => this.message('myKey3', 'error', 'erreur de génération','erreur de génération du code de l\'Activité')
      );

    } else {
       window.console.log(activite);
      this.activite = activite;
      this.ppm = activite.ppm;
      this.activite.ppmActivite = activite.ppmActivite;
      this.modePassation = activite.modePassation;
      this.naturePrestation = activite.naturePrestation;
      this.loadCurentExercice();

      this.pPMService.getEtapePpmActivite(this.activite.ppmActivite.id, this.modePassation.id).subscribe(
        (res: HttpResponse<IReferentielDelai[]>) => {
          this.referentielDelais = res.body;
          this.setCalendar();
        }, () => this.message('myKey3','error', 'erreur de chargement', "Une erreur s'est produite lors du chargement de délais de réfférence")
      );

      this.loadBesoinByNature();

      this.besoinSelecteds = activite.besoins;
      window.console.log('m   m   m   m   m     ' + this.besoinSelecteds.length + '    m   m   m   m');
      // this.activite = activite ;
    }

    this.display = true;
  } */


/*
  loadCurentExercice() {
    this.exerciceBudgetaireService
      .findCurrentExerciceByElaborerIsTrue()
      .subscribe(
        (res: HttpResponse<IExerciceBudgetaire>) => {
          // this.exercicebudgetaires = res.body;
          this.exercice = res.body;
          if (this.exercice === null) {
            this.exercice = new ExerciceBudgetaire();
          }
        },
        () => this.exercice = new ExerciceBudgetaire()
      );
  }
*/

 /* setCalendar() {

    if (this.referentielDelais.length > 0) {
      this.referentielDelais.forEach(ref => {

        // const calend = {'title': ref.etapeLibelle, 'start': ref.debut.toString(), 'end': ref.fin.toString()}; Duration: 5, Progress: 30
        this.calendriers = this.calendriers.concat(
          {
            TaskID: ref.id, TaskName: '' + ref.etape.libelle, StartDate: ref.debut, EndDate: ref.fin, Duration: ref.duration, Progress: ref.progress
          }
        );
      });

      // this.fc.dateAlignment.
      // this.options = {...this.options,  weekends: false};

      window.console.log(this.calendriers);
    }
  } */
  /* loadBesoinByNature() {
    if (this.naturePrestation !== null && this.exercice !== undefined) {
      this.besoinService.findAllByNaturePrestation(isNaN(this.naturePrestation.id) ? 0 : this.naturePrestation.id, isNaN(this.exercice.id) ? 0 : this.exercice.id)
        .subscribe(
          (res: HttpResponse<IBesoin[]>) => { this.besoins = res.body;},
          () => this.message('myKey1', 'error', 'Erreur de chargement', "Une erreur s'est produit lors du chargement des besoins")
        );
    } else{
      this.besoins = [];
    }
  } */
  message(cle: string, severite: string, resume: string, detaille: string) {
    this.messageService.add({ key: cle, severity: severite, summary: resume, detail: detaille });
  }
  protected subscribeToSaveResponse(result: Observable<HttpResponse<IActivite>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.display = false;
    this.loadAll();
    this.ppm = new PPM();
    this.activite = new Activite();
    this.activite.ppmActivite = new PpmActivite();
    this.activite.ppm = new PPM();
    this.referentielDelais = [];
    // this.besoins = [];
  }

  protected onSaveError() {
    this.message('mykey2', 'error', "Erreur d'enregistrement", "Une erreur s'est produite lors de l'enregistrement de votre activité");
  }

  /* save() {
    this.activite.deleted = false;
    this.activite.passationId = this.modePassation.id;
    this.activite.naturePrestationId = this.naturePrestation.id;
    this.activite.total = this.totalMontantBesoin;
    this.activite.besoins = this.besoinSelecteds;
    this.activite.reported = false;
    this.activite.referentielDelais = this.referentielDelais;
    this.ppm.idExercice = this.exerciceBudgetaire.id;

    this.activite.ppm = this.ppm;


    this.periodeLancementAppel= new Date();
    this.dateProblableDemaragePrestation= new Date();

    /!* this.activite.ppmActivite.dateProblableDemaragePrestation = moment(this.dateProblableDemaragePrestation);
    this.activite.ppmActivite.periodeLancementAppel = moment(this.periodeLancementAppel);
    this.activite.ppmActivite.dateButtoire = moment(this.dateButoire);
    this.activite.ppmActivite.periodeRemiseOffre = moment(this.priodeRemiseOffre); *!/
    window.console.log(this.activite);
    if (this.activite.id !== undefined) {
      this.subscribeToSaveResponse(this.activiteService.update(this.activite));
    } else {
      // window.console.log(this.referentielDelais);
      this.subscribeToSaveResponse(this.activiteService.create(this.activite));
    }
  } */

  /* loadNaturePrestation() {
    this.naturePrestationService.query().subscribe(
      (res: HttpResponse<INaturePrestation[]>) => (this.naturePrestations = res.body)
    )
  } */

  /* registerChangeInPPMS() {
    this.eventSubscriber = this.eventManager.subscribe('pPMListModification', () => this.loadAll());
  } */

  /* onRowEditInit(besoin: IBesoin) {
    this.natureTmp = new NaturePrestation();
    this.clonedBesoin[besoin.id] = {...besoin};
  } */

 /* onRowEditSave(besoin: IBesoin) {
    besoin.naturePrestationId = this.natureTmp.id;
    this.besoinService.update(besoin).subscribe(
      (res: HttpResponse<IBesoin>) => {
        besoin = res.body;
        delete this.clonedBesoin[besoin.id];
      }, () => this.message('myKey2','success', 'Success', 'Besoin mis à jour avec succès')
    );

  } */

 /* onRowEditCancel(besoin: IBesoin, index: number) {
    this.besoins[index] = this.clonedBesoin[besoin.id];
    delete this.clonedBesoin[besoin.id];
  } */

  annuler() {
    this.display = false;
    this.modePassation = new ModePassation();
    this.referentielDelais = [];
  }

  /* selectBesoins() {
    if(this.besoinSelecteds.length > 0) {
      this.besoinSelecteds.forEach(besoin => {
        this.totalMontantBesoin = this.totalMontantBesoin + besoin.montantEstime;

        window.console.log('=========================   ' + this.totalMontantBesoin);

      });
      if (this.totalMontantBesoin > 0) {
        this.loadMontant(this.naturePrestation.id, this.totalMontantBesoin);
      } else {
        this.message('myKey2','error', 'erreur sur le montant', 'votre activité doit avoir un montant valide');
      }
    } else {
      this.totalMontantBesoin = 0;
    }
  } */

  /* loadMontant(naturePrestationId: number, totalMontantBesoin: number) {

    this.naturePrestationModePassationService.getAllNaturePrestationModePassations(naturePrestationId, totalMontantBesoin)
      .subscribe(
        (res: HttpResponse<IModePassation>) => {
          if (res.body !== null) {
            this.modePassation = res.body;
            this.loadReferentielDelais();
          } else {
            this.message('myKey2','error', 'erreur sur le mode de passation', 'nous avons pas pu charger le mode de passation conforme à votre montant et à la nature de votre besoin');
            this.modePassation = new ModePassation();
            window.console.log('-------------------------->' + this.modePassation.libellePassation);
          }
        }, () => {
          this.message('myKey2','error', 'erreur sur le mode de passation', 'nous avons pas pu charger le mode de passation conforme à votre montant et à la nature de votre besoin');
          this.modePassation = new ModePassation();
        }
      );
  } */

  /* loadReferentielDelais() {
    this.referentielDelaiService.findReferentielDelaiByModePassationId(this.modePassation.id).subscribe(
      (res: HttpResponse<IReferentielDelai[]>) => {
        this.referentielDelais = res.body;
        window.console.log(':::::::::::::::::::::::::      ' + this.referentielDelais.length);
      }, () => this.message('', '', '', '')
    )
  } */

 /* calculerDalai(): void {

    if (this.libelle !== null && this.naturePrestation !== null && this.modePassation !== null) {
      const ref: IReferentielDelai = new ReferentielDelai();
      ref.modePassation = this.modePassation;
      ref.fin = this.activite.ppmActivite.dateButtoire;
      ref.etapes = this.etapesSelecteds;
      ref.observation = this.libelle;
      this.referentielDelaiService.getReferentielDelaiByModePassationId(ref).subscribe(
        (res: HttpResponse<IReferentielDelai[]>) => {
          this.referentielDelais = res.body;
          this.displayDate = false;
          this.etapes = [];
          this.etapesSelecteds = [];
          this.setDateCalcule();
          this.setCalendar();
        }, () => this.message('myKey2','error', 'ERREUR', 'Nous n\'navons pas pu caluculer vos delais')
      );
    }
  } */

/*
  setDateCalcule() {
    if (this.referentielDelais) {
      this.referentielDelaiService.getDateCalcule(this.referentielDelais).subscribe(
        (res: HttpResponse<DateCalcule[]>) => {
          if (res.body !== undefined) {

            if (res.body.find(r => r.libelle === 'PERIODELANCEMENTAPPELCONCURENCE') !== undefined) {
              this.activite.ppmActivite.periodeLancementAppel = res.body.find(r => r.libelle === 'PERIODELANCEMENTAPPELCONCURENCE').date;
              // this.activite.ppmActivite.periodeLancementAppel = res.body.find(r => r.libelle === 'PERIODELANCEMENTAPPELCONCURENCE').date;
              // window.console.log('PERIODELANCEMENTAPPELCONCURENCE================  ' + this.periodeLancementAppel + '    ================');
            } // else { this.periodeLancementAppel = new Date(); }

            if (res.body.find(r => r.libelle === 'PERIODEREMISEOFFRES') !== undefined) {
              this.activite.ppmActivite.periodeRemiseOffre = res.body.find(r => r.libelle === 'PERIODEREMISEOFFRES').date;
              // this.activite.ppmActivite.periodeRemiseOffre = moment(res.body.find(r => r.libelle === 'PERIODEREMISEOFFRES').date);
              // window.console.log('PERIODEREMISEOFFRES================  ' + this.priodeRemiseOffres + '    ================');
            } // else { this.priodeRemiseOffre = new Date(); }

            if (res.body.find(r => r.libelle === 'DATEPROBABLEDEMARAGEPRESTATIONS') !== undefined) {
              this.activite.ppmActivite.dateProblableDemaragePrestation = res.body.find(r => r.libelle === 'DATEPROBABLEDEMARAGEPRESTATIONS').date;
              // this.activite.ppmActivite.dateProblableDemaragePrestation = moment(res.body.find(r => r.libelle === 'DATEPROBABLEDEMARAGEPRESTATIONS').date);
              // window.console.log('DATEPROBABLEDEMARAGEPRESTATIONS================  ' + this.dateProblableDemaragePrestation + '    ================');
            } // else { this.dateProblableDemaragePrestation = new Date(); }
            // this.priodeRemiseOffres = res.body.find(r => r.libelle === 'PERIODEREMISEOFFRES').date;
            // this.dateProblableDemaragePrestation = res.body.find(r => r.libelle === 'DATEPROBABLEDEMARAGEPRESTATIONS').date;
            // this.periodeLancementAppel = res.body.find(r => r.libelle === 'PERIODELANCEMENTAPPELCONCURENCE').date;
          }
        }
      );
    }
  }
*/
/*
  viewMore(): void {
    this.detailCalendar = false;
    this.detailListe = false;
  }
*/

}
