import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import {Subject, Subscription} from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { ImportExportService } from 'app/entities/microserviceppm/import-export/import-export.service';
import { saveAs } from 'file-saver';
import { MenuItem, MessageService } from 'primeng/api';
import { IExerciceBudgetaire } from 'app/shared/model/microserviceppm/exercice-budgetaire.model';
import { ExerciceBudgetaireService } from 'app/entities/microserviceppm/exercice-budgetaire/exercice-budgetaire.service';
import { IActivite } from 'app/shared/model/microserviceppm/activite.model';
import { ActiviteService } from 'app/entities/microserviceppm/activite/activite.service';
import { PPMService } from 'app/entities/microserviceppm/ppm/ppm.service';
import { IPPM } from 'app/shared/model/microserviceppm/ppm.model';
import {select, Store} from "@ngrx/store";
import {selectetExerciceCourant} from "app/store/selector";
import {takeUntil} from "rxjs/operators";
import {IAvisDac} from "app/shared/model/microservicedaccam/avis-dac.model";
import {State} from "app/store/reducers";

@Component({
  selector: 'jhi-import-export',
  templateUrl: './import-export.component.html',
  styleUrls: ['./import-export.scss']
})
export class ImportExportComponent implements OnInit {
  activites: IActivite[];
  activites1: IActivite[];
  exercices: IExerciceBudgetaire[];
  exercice: IExerciceBudgetaire;
  ppms: IPPM[];
  error: any;
  success: any;
  eventSubscriber: Subscription;
  fichier: File;
  reference: string;
  display: boolean;
  isSaving: boolean;
  isReloade: boolean;
  items: MenuItem[];
  destroy$: Subject<boolean> = new Subject<boolean>();
  avisDacs: IAvisDac[];
  avisDac: IAvisDac;


  constructor(
    protected importExportService: ImportExportService,
    protected activiteService: ActiviteService,
    protected ppmService: PPMService,
    protected parseLinks: JhiParseLinks,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected messageService: MessageService,
    protected exerciceBudgetaireService: ExerciceBudgetaireService,
    protected store: Store<State>
  ) {
  }

  /*loadAll() {
    if (this.exercice === null) {
      this.activites = [];
    } else {
      this.activiteService
        .findAllByAnneeExercice(this.exercice.id)
        .subscribe((res: HttpResponse<IActivite[]>) => {
          this.activites = res.body;
          window.console.log("==================");
          window.console.log(this.activites[1].besoinLignes);
          window.console.log("==================");
        });
    }
  }*/

  loadAll() {
    this.activiteService
      .query()
      .subscribe((res: HttpResponse<IActivite[]>) => {
        this.activites = res.body;
        window.console.log("========this.activites this.activites111=========={}",this.activites);
      });
  }

  ngOnInit() {
    this.display = false;
    this.isSaving = false;
    this.reference = '';
    this.isReloade = false;
    this.exercice = null;
    this.activites = [];
    this.loadAll();
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

    this.store.pipe(select(selectetExerciceCourant)).pipe(takeUntil(this.destroy$))
      .subscribe(exercice => {
        if (exercice) {
          this.exercice = exercice;
          this.actualisation();

          if (this.exercice === null) {
            this.activites = [];
          } else {
            this.loadAll()
          }

        }
      });

    // this.registerChangeInActivites();
  }


  actualisation(){
    this.activites = [];
    this.activites = null;
  }


  /*ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }*/

  /*registerChangeInActivites() {
    this.eventSubscriber = this.eventManager.subscribe('activiteListModification', () => this.loadAll());
  }
*/
  showMessage(severity: string, summary: string, detail: string) {
    this.messageService.add({ severity, summary, detail });
  }

  displayModal() {
    this.display = true;
    this.fichier = null;
    this.isSaving = false;
    this.isReloade = false;
    this.reference = '';
  }

  closeModal() {
    this.display = false;
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
    this.importExportService.importDataPPM(this.exercice.id, this.fichier, this.reference, this.isReloade).subscribe(
      () => {
        this.display = false;
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
    window.console.log('==============' + this.activites);
  }
}
