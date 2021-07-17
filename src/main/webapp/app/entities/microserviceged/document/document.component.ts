import {Component, OnInit} from '@angular/core';
import {HttpHeaders, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {IDocument, Document} from 'app/shared/model/microserviceged/document.model';
import {ITEMS_PER_PAGE} from 'app/shared/constants/pagination.constants';
import {DocumentService} from './document.service';
import {IUniteAdministrative, UniteAdministrative} from 'app/shared/model/microserviceppm/unite-administrative.model';
import {UniteAdministrativeService} from 'app/entities/microserviceppm/unite-administrative/unite-administrative.service';
import {ITypeEntrepot, TypeEntrepot} from 'app/shared/model/microserviceged/type-entrepot.model';
import {Entrepot, IEntrepot} from 'app/shared/model/microserviceged/entrepot.model';
import {EntrepotService} from 'app/entities/microserviceged/entrepot/entrepot.service';
import {ITypeDocument, TypeDocument} from 'app/shared/model/microserviceged/type-document.model';
import {TypeEntrepotService} from 'app/entities/microserviceged/type-entrepot/type-entrepot.service';
import {ConfirmationService, MessageService, TreeNode} from 'primeng/api';
import {ITypeArchive, TypeArchive} from 'app/shared/model/microserviceged/type-archive.model';
import {TypeArchiveService} from 'app/entities/microserviceged/type-archive/type-archive.service';
import * as moment from 'moment';

import {TypeDocumentService} from 'app/entities/microserviceged/type-document/type-document.service';
import {ILocale, Locale} from 'app/shared/model/microserviceged/locale.model';
import {LocaleService} from 'app/entities/microserviceged/locale/locale.service';
import {FileMenagerService} from 'app/entities/file-manager/file-menager.service';
import {Fichier} from 'app/entities/file-manager/file-menager.model';
import {DataUtils} from 'app/entities/file-manager/dataUtils';



@Component({
  selector: 'jhi-document',
  templateUrl: './document.component.html'
})
export class DocumentComponent implements OnInit {
  documents: IDocument[];
  document: IDocument;
  typeDocument: ITypeDocument;
  typeDocuments: ITypeDocument[];
  documentSelected: IDocument[];
  entrepot: IEntrepot[];
  files: TreeNode[];
  selectedFiles: TreeNode[];
  typeEntrepots: ITypeEntrepot[];
  typeEntrepot: ITypeEntrepot;
  locales: ILocale[];
  locale: ILocale;
  entrepots: IEntrepot[];
  uniteadministratives: IUniteAdministrative[];
  entrepot1: IEntrepot;
  entrepotsTree: any;
  entrepotes: any[] = [];
  entrepotsForFilter: IEntrepot[] = [];
  typeArchivages: ITypeArchive[];
  typeArchivage: ITypeArchive;
  ajout = false;
  uniteAdministrative: IUniteAdministrative;
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
  displayDelete: boolean;
  ajout1 = false;
  isSavinge: boolean;
  isSaving: boolean;
  date: Date;
  fichiers: FileList;
  file: Fichier;

  constructor(
    protected documentService: DocumentService,
    protected parseLinks: JhiParseLinks,
    protected activatedRoute: ActivatedRoute,
    protected uniteadministrativeService: UniteAdministrativeService,
    protected typeEntrepotService: TypeEntrepotService,
    protected typeDocumentService: TypeDocumentService,
    protected entrepotService: EntrepotService,
    protected messageService: MessageService,
    protected confirmationService: ConfirmationService,
    protected localeService: LocaleService,
    protected typeAchiveService: TypeArchiveService,
    protected  fileManagerService: FileMenagerService,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected fileUtils: DataUtils



  ) {
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.routeData = this.activatedRoute.data.subscribe(data => {
      this.page = data.pagingParams.page;
      this.previousPage = data.pagingParams.page;
      this.reverse = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
    });
  }

  /* Initilisation des objets */

  initeElement(): void {
    this.isSavinge = false;
    this.display = false;
    this.displayDelete = false;
    this.uniteAdministrative = new UniteAdministrative();
    this.typeArchivage = new TypeArchive();
    this.typeDocument = new TypeDocument();
    this.locale = new Locale();


  }

  initDataFile() {
    this.files = [];
    this.selectedFiles = [];
  }

  /* Afficher l UA par id*/
  findUniteById(id: number): IUniteAdministrative {

    return this.uniteadministratives.find(value => value.id === id);
  }

  /* methode pour afficher le model d'ajout de nouveaux document */
  initObject() {
    this.document = new Document();
    this.document.typeDocument = new TypeDocument();
    this.document.typeArchive = new TypeArchive();
    this.file = null;
  }

  showDialogToAddDocument() {
    this.inialiseFirstEntrepoListe();
    this.initObject();
    this.entrepot1 = new Entrepot();
    this.documentSelected = [];
    this.display = true;
  }

  fermerFormulaire() {
    this.initObject();
    this.documentSelected = [];
    this.display = false;
  }

  /* supprimer un document */
  supprimer() {
    this.displayDelete = true;
  }

  loadAll() {
    this.documentService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IDocument[]>) => this.paginateDocuments(res.body, res.headers));
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  transition() {
    this.router.navigate(['/document'], {
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
      '/document',
      {
        page: this.page,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    ]);
    this.loadAll();
  }

  ngOnInit() {
    this.initDataFile();
    this.initObject();
    this.typeArchivages = [];
    this.entrepotsForFilter = [];
    this.typeDocuments = [];
    this.documents = [];
    this.entrepotsTree = [];
    this.entrepot = [];
    this.uniteadministratives = [];

    this.loadAll();
    this.initeElement();
    this.findNivieau0();

    this.typeAchiveService.query().subscribe((res: HttpResponse<ITypeArchive[]>) => this.typeArchivages = res.body);
    this.typeDocumentService.query().subscribe((res: HttpResponse<ITypeDocument[]>) => this.typeDocuments = res.body);
    this.documentService.query().subscribe((res: HttpResponse<IDocument[]>) => this.documents = res.body);

    this.uniteadministrativeService
      .findAll()
      .subscribe((res: HttpResponse<IUniteAdministrative[]>) => this.uniteadministratives = res.body);

    this.localeService
      .query()
      .subscribe((res: HttpResponse<ILocale[]>) => this.locales = res.body);

    this.entrepotService
      .query()
      .subscribe((res: HttpResponse<IEntrepot[]>) => this.entrepots = res.body);

    this.typeEntrepotService
      .query()
      .subscribe((res: HttpResponse<TypeEntrepot[]>) => {
        this.typeEntrepots = res.body;

        for (let i = 0; i < this.typeEntrepots.length; i++) {
          this.entrepotes[i] = [];
          // this.entrepotsTree[i] = [];
        }


         this.inialiseFirstEntrepoListe();
        // for (let i = 0; i < this.typeEntrepots.length; i++) {
        /* if (this.typeEntrepots.length > 0) {
          this.entrepotService.findEntrepotChildrenByTypeEntrepot(this.typeEntrepots[0]!.id).subscribe(
            (res1: HttpResponse<IEntrepot[]>) => {
               this.entrepotsTree[0] = res1.body;
              window.console.log('*********************' + this.entrepotsTree[0].length);
              this.entrepotsTree[0].forEach(emp => {
                this.files = this.files.concat({
                  'label': emp.libelle,
                  'data': 'Documents Folder',
                  'expandedIcon': 'pi pi-folder-open',
                  'collapsedIcon': 'pi pi-folder',
                  'children': [{}]
                });
              });
            });
        } */
      });
    this.entrepotService.setTreeNode().subscribe(
      (res: HttpResponse<TreeNode[]>) => this.files = res.body,

    );

         // this.loadEntrepotsAndChinldren();

        /*  this.typeEntrepots.forEach(value => {
          this.EntrepotsForFilter= this.Entrepots.filter(value1 => value1.typeEntrepotId === value.id);
          window.console.log('valeur' +value.id);
          this.EntrepotsForFilter.forEach(value1 => {
            this.Entrepotes=this.EntrepotsForFilter.filter(value2 => value2.entrepotId === value1.entrepotId);
            window.console.log('valeur 2**********************' +value.id);
            window.console.log('valeur 1*********************' +value1.id);
          })
        })
      });

    this.entrepotService.setTreeNode().subscribe(
      (res: HttpResponse<TreeNode[]>) => this.files = res.body,
    );

    this.registerChangeInDocuments();
  }*/
  }

  loadEntrepotsAndChinldren() {
    for(let i = 0; i < this.typeEntrepots.length; i++) {
      if(this.typeEntrepots[i + 1] !== undefined && this.typeEntrepots[i + 1] !== null) {
        this.entrepotService.findEntrepotChildrenByTypeEntrepot(this.typeEntrepots[i +1].id).subscribe(
          (res: HttpResponse<IEntrepot[]>) => {
            this.entrepotsTree[i].forEach(entrepot => {
              this.entrepotsTree[i + 1] = res.body.filter(e => e.entrepotId === entrepot.id);
              window.console.log('**************************************************************');
              window.console.log(this.entrepotsTree[i + 1]);
              window.console.log('**************************************************************');
              /* this.entrepotsTree[i].forEach(emp => {
                this.files = this.files.concat({
                  'label': emp.libelle,
                  'data': 'Documents Folder',
                  'expandedIcon': 'pi pi-folder-open',
                  'collapsedIcon': 'pi pi-folder',
                  'children': this.setChildren(res.body)
                });
              }); */
            });
            window.console.log(this.files);
          }
        );
      }
    }
  }

  /* setChildren(datas: any): TreeNode[] {

    let children: TreeNode[] = [];
    datas.forEach(data => {
      children = children.concat({
        'label': data.libelle,
        'data': 'Documents Folder',
        'expandedIcon': 'pi pi-folder-open',
        'collapsedIcon': 'pi pi-folder',
        'children': []
      })
    });
    return children;
  } */


  onEntrepotChangez(i): void {
    window.console.log('**************************    ' + typeof (i));
    window.console.log(this.entrepot);
    if (this.entrepot[i] !== undefined) {
      this.entrepotService.findEntrposFils(this.entrepot[i].id).subscribe(
        (res: HttpResponse<IEntrepot[]>) => {
          this.entrepotes[i + 1] = res.body;
        }, () => this.message('myKey2', 'error', "Erreur d'ajout du membre de commission", 'Nous avons pas pu enregistrer votre document ' + this.document.libelle)
      );
    }
  }

  findNivieau0(){
    this.entrepotService.findEntrposFils(0).subscribe(
      (res: HttpResponse<IEntrepot[]>) => {
        this.entrepotes[0] = res.body;
        this.entrepotes.forEach(value => {
          if (value !== undefined) {
            this.entrepotService.findEntrposFils(value.id).subscribe((res1: HttpResponse<IEntrepot[]>) => {
              this.entrepots = res1.body;
              window.console.log("********************************************");
              window.console.log(this.entrepots);
              window.console.log("********************************************");
            });
          }
        })

      }, () => this.message('myKey2', 'error', "Erreur d'ajout du membre de commission", 'Nous avons pas pu enregistrer votre document ' + this.document.libelle)
    );
  }

  inialiseFirstEntrepoListe() {
    this.entrepotService.findEntrposFils(0).subscribe(
      (res: HttpResponse<IEntrepot[]>) => {
        this.entrepotes[0] = res.body;

      }, () => this.message('myKey2', 'error', "Erreur d'ajout du membre de commission", 'Nous avons pas pu enregistrer votre document ' + this.document.libelle)
    );
  }



  filtreByTypeEntrepot() {
    // this.Entrepotes= this.EntrepotsForFilter;
    this.entrepotsForFilter = [];
    if (this.typeEntrepot.id !== undefined) {
      this.entrepotService.findEntrepotByTypeEntrepotAndDeletedIsFalse(this.typeEntrepot.id).subscribe((entro: HttpResponse<IEntrepot[]>) => {
        this.entrepotsForFilter = entro.body;
      });
      window.console.log('**************************' + this.entrepotsForFilter);
    }
  }

  loadEntrepotByTypeEntrepot(typeEntrepot: TypeEntrepot) {

    this.entrepotes = [];
    if (typeEntrepot !== undefined) {
      this.entrepotService.findEntrepotByTypeEntrepotAndDeletedIsFalse(typeEntrepot.id).subscribe((entro: HttpResponse<IEntrepot[]>) => {
        this.entrepotes = entro.body;

      });

    }
  }

  loadEntrepotByOrdre(typeEntrepot: TypeEntrepot) {
    this.entrepotes = [];
    if (typeEntrepot !== undefined) {
      this.entrepotService.findEntrposFils(typeEntrepot.ordre).subscribe((entro: HttpResponse<IEntrepot[]>) => {
        this.entrepotes = entro.body;

      });

    }

  }

  trackId(index: number, item: IDocument) {
    return item.id;
  }

  registerChangeInDocuments() {
    this.eventSubscriber = this.eventManager.subscribe('documentListModification', () => this.loadAll());
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateDocuments(data: IDocument[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    this.documents = data;
    this.documents.forEach(m => {
      m.typeDocument = this.documents.find(u => u.id === m.typeDocumentId);
    });
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDocument>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.display = false;
    this.message('myKey1', 'success', 'Ajout du membre commission', 'Votre document' + this.document.libelle + ' a été enregistré avec succès');
    this.loadAll();
  }

  protected onSaveError() {
    this.isSaving = false;
    this.message('myKey2', 'error', "Erreur d'ajout du membre de commission", 'Nous avons pas pu enregistrer votre document ' + this.document.libelle);
  }

  message(cle: string, severite: string, resume: string, detaille: string) {
    this.messageService.add({key: cle, severity: severite, summary: resume, detail: detaille});
  }

  onEntrepotChange(i): void {
    window.console.log('**************************    ' + typeof (i));
    window.console.log(this.entrepot);
    if (this.entrepot[i] !== undefined) {
      this.entrepotService.findEntrposFils(this.entrepot[i].id).subscribe(
        (res: HttpResponse<IEntrepot[]>) => {
          this.entrepotes[i + 1] = res.body;
        }, () => this.message('myKey2', 'error', "Erreur d'ajout du membre de commission", 'Nous avons pas pu enregistrer votre document ' + this.document.libelle)
      );
    }
  }

  ajouter(): void {
    if (!this.ajout) {
      this.typeArchivage = new TypeArchive();
      this.document.typeArchivageId = undefined;
      this.ajout = true;
    } else {
      this.ajout = false;
      this.document.typeArchivageId = undefined;
      this.typeArchivage = new TypeArchive();
    }
  }

  ajouter1(): void {
    if (!this.ajout1) {
      this.ajout1 = true;
      this.typeDocument = new TypeDocument();
    } else {
      this.ajout1 = false;
      this.typeDocument = new TypeDocument();
    }
  }

  /*  Enregistrement du document*/
  saveDocument() {
    this.isSaving = true;
    this.document.date = moment(this.date);
    if (this.typeDocument.id !== undefined) {
      this.document.typeDocumentId = this.typeDocument.id;
    }
    this.entrepot.forEach(entrepo => {
      this.document.entrepotId = entrepo.id;
    });
    if (this.document.id !== undefined) {
      this.documentService.update(this.document).subscribe(() => {
        /* if (document.status === 200) {
          this.uploadFilesofDocument(this.file, document.body.id);
          this.showMessage('info', 'MODIFICATION', 'Document modifier avec succès !');
          this.display = false;
        }*/
      });
    } else {
      this.documentService.create(this.document).subscribe(() => {
        /* if (document.status === 200) {
          this.uploadFilesofDocument(this.file, document.body.id);
          this.showMessage('info', 'CREATION', 'Document modifier avec succès !');
          this.display = false;
        }*/
      });
    }
  }

  /* Modification du document */
  showDialogToModifDocument(document: Document) {

    this.inialiseFirstEntrepoListe();
    this.document = document;
   // this.getFiles(this.document);
    this.entrepotService.findByrArbo(document.entrepotId).subscribe((res: HttpResponse<IEntrepot[]>) => {
      this.entrepot = res.body;
      for (let i = 0; i <= this.entrepot.length - 1; i++) {
        if (this.entrepot[i] !== undefined) {
          this.entrepotService.findEntrposFils(this.entrepot[i].id).subscribe(
            (res1: HttpResponse<IEntrepot[]>) => {
              this.entrepotes[i + 1] = res1.body;
            }, () => this.message('myKey2', 'error', "Erreur d'ajout du membre de commission", 'Nous avons pas pu enregistrer votre document ' + this.document.libelle)
          );
        }
      }
    });
    this.typeDocument = this.typeDocuments.find(type => type.id === document.typeDocumentId);
    this.display = true;
  }

  /* suppresion */
  annulerDel() {
    this.displayDelete = false;
  }

  deleteComission(document: IDocument) {
    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Etes-vous sûr de vouloir supprimer ?',
      accept: () => {
        if (document === null) {
          return;
        } else {
          document.deleted = true;
          this.documentService.update(document).subscribe(
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

  confirmerDelete() {
    this.documentService.updateAll(this.documentSelected).subscribe(
      () => {
        this.loadAll();
        this.LoadDocument();
        this.annulerDel();
      },
      () => this.message('myKey1', 'info', 'erreur de suppression', 'erreur de suppression des documents sélectionnés')
    );
  }


  /* ******* FIN ****** */

  showMessage(sever: string, sum: string, det: string) {
    this.messageService.add({
      severity: sever,
      summary: sum,
      detail: det
    });
  }

  LoadLocalite() {

      this.documentService.findDocumentBylocal(this.locale.id).subscribe((res: HttpResponse<IDocument[]>) => {
        this.documents = res.body;
        window.console.log("********************************"+this.documents);

      });

  }

  LoadDocument() {
    if (this.documents !== null && this.typeDocument.id !== null) {
      this.documentService.findDocumentByType(this.typeDocument.id).subscribe((res: HttpResponse<IDocument[]>) => {
        this.documents = res.body;
      });
    }
  }

  LoadDocumentArchive() {
    this.documentService.findDocumentByTypeAndArchive(this.typeDocument.id, this.typeArchivage.id).subscribe((res: HttpResponse<IDocument[]>) => {
      this.documents = res.body;
    });
  }

  LoadDocumentEntropot() {
    this.documentService.findDocumentByTypeAndArchiveAndEntrepot(this.typeDocument.id, this.typeArchivage.id, this.locale.id , this.entrepot1.id).subscribe((res: HttpResponse<IDocument[]>) => {
      this.documents = res.body;
      window.console.log("********************************"+this.locale.libelle);
    });
    this.entrepotService.findByPereFils(this.entrepot1.id).subscribe((res:HttpResponse<IEntrepot[]>)=>{
      this.entrepot=res.body;
      this.entrepot.forEach(value => {
        window.console.log("******************************"+value.libelle);
      });
    });
  }

  /* ** for files manager ** */

 /* setFileData(event) {
    this.file = event.target.files.item(0);
  }*/

  setFileData(event) {
    if (event.target.files.length > 0) {
        this.file = new Fichier();
        this.fileUtils.setFileData(event, this.file, 'file', false, 0);
        this.file.fileName = event.target.files[0].name;
        this.document.dataFile = this.file;
        window.console.log('====== object =========');
        window.console.log(this.file);
    }

  }

  uploadFilesofDocument(file: File, idDocument: number) {
    this.fileManagerService.loadArchiveFile(file, idDocument)
      .subscribe(() => {
        // this.fichiers = res.body;
      }).unsubscribe();
  }

/*  getFiles() {
     this.fileManagerService.getArchiveFiles(document.entrepotId).subscribe((res:HttpResponse<any>) => {
      this.fichiers = res.body;
      this.file = this.fichiers.item(0);
    });
  }*/

}

