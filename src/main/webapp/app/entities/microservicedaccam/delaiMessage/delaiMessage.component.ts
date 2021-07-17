import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {JhiEventManager, JhiParseLinks} from 'ng-jhipster';
import {ITEMS_PER_PAGE} from 'app/shared/constants/pagination.constants';
import {DelaiMessageService} from './delaiMessage.service';
import {DelaiMessage, IDelaiMessage} from "app/shared/model/microservicedaccam/delaiMessage.model";
import {ConfirmationService, MessageService} from "primeng/api";
import {TypeMessage} from "app/shared/model/enumerations/TypeMessage";

@Component({
  selector: 'jhi-messages',
  templateUrl: './delaiMessage.component.html'
})
export class DelaiMessageComponent implements OnInit, OnDestroy {
  delaiMessages: IDelaiMessage[];
  delaiSelected: IDelaiMessage[];
  delaiMessage: IDelaiMessage;
  delaiMessages1: IDelaiMessage[];
  delaiMessages2: IDelaiMessage[];

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
  index: number;
  display: boolean;
  displayDelete: boolean;
  display1: boolean;
  isSaving: boolean;
  ifDescrib = true;

  constructor(
    protected delaiMessageService: DelaiMessageService,
    protected parseLinks: JhiParseLinks,
    protected activatedRoute: ActivatedRoute,
    protected  messageService: MessageService,
    protected confirmationService: ConfirmationService,
    protected router: Router,
    protected eventManager: JhiEventManager
  ) {
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.routeData = this.activatedRoute.data.subscribe(data => {
      this.page = data.pagingParams.page;
      this.previousPage = data.pagingParams.page;
      this.reverse = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
    });
  }

  onTabChange(event) {
    this.index = event.index;

  }

  loadAll() {
    this.delaiMessageService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IDelaiMessage[]>) => (this.delaiMessages=res.body));

    this.delaiMessageService.findType().subscribe((res:HttpResponse<IDelaiMessage[]>)=>{
      this.delaiMessages2 =res.body;
    });
    this.delaiMessageService.findMessage().subscribe((res:HttpResponse<IDelaiMessage[]>)=>{
      this.delaiMessages1 =res.body;

    });

  }

 /* findType() {
    this.delaiMessageService.query().subscribe((res: HttpResponse<IDelaiMessage[]>) => {
      this.delaiMessages = res.body;
      this.delaiMessages.forEach(value => {

        if(value.typeMessage === TypeMessage.DELAI){
          this.delaiMessages2.push(value);
        }
      });
    });
  }*/

 /* findMessage() {
    this.delaiMessageService.query().subscribe((res: HttpResponse<IDelaiMessage[]>) => {
      this.delaiMessages = res.body;
      this.delaiMessages.forEach(value => {
        if(value.message!= null){
          this.delaiMessages1.push(value);
        }
      });
    });
  }
*/
  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  transition() {
    this.router.navigate(['/delaiMessage'], {
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
      '/delaiMessage',
      {
        page: this.page,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    ]);
    this.loadAll();
  }

  ngOnInit() {
    this.delaiMessages = [];
    this.delaiMessages1 = [];
    this.delaiMessages2 = [];
    this.delaiMessage =new DelaiMessage();
    this.delaiSelected = [];
    this.index = 0 ;
    this.display = false;
    this.display1 = false;
    this.displayDelete= false;
    this.isSaving=false;
    this.loadAll();


    this.registerChangeInDelaiMessages();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IDelaiMessage) {
    return item.id;
  }

  registerChangeInDelaiMessages() {
    this.eventSubscriber = this.eventManager.subscribe('delaiMessageListModification', () => this.loadAll());
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  add(delai: IDelaiMessage) {
    delai === null ? (this.delaiMessage = new DelaiMessage()) : (this.delaiMessage = delai);
    if(this.index === 0){
      this.display = true;
    }
    else{
      this.display1 = true;
    }
  }


  supprimer() {
    this.displayDelete = true;
  }

  annuler() {
    this.delaiMessage = new DelaiMessage();
    this.display = false;
    this.display1 = false;
    this.loadAll();
  }

  save1() {
    this.isSaving = true;
    this.delaiMessage.typeMessage = TypeMessage.DELAI;
    if (this.delaiMessage.id !== undefined) {
      this.subscribeToSaveResponse(this.delaiMessageService.update(this.delaiMessage));

    } else {
      this.subscribeToSaveResponse(this.delaiMessageService.create(this.delaiMessage));

    }
    this.display = false;
    this.display1 = false;
    this.loadAll();
  }

  deleteType(message:IDelaiMessage ) {
    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Etes-vous sûr de vouloir supprimer ?',
      accept: () => {
        if (this.delaiMessage === null) {
          return;
        } else {
          message.deleted = true;
          this.delaiMessageService.update(message).subscribe(
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

  save() {
    this.isSaving = true;
    if (this.delaiMessage.id !== undefined) {
      this.subscribeToSaveResponse(this.delaiMessageService.update(this.delaiMessage));

    } else {
      this.subscribeToSaveResponse(this.delaiMessageService.create(this.delaiMessage));

    }
    this.display = false;
    this.display1 = false;
    this.loadAll();
  }

  deletemessage(message:IDelaiMessage ) {
    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Etes-vous sûr de vouloir supprimer ?',
      accept: () => {
        if (this.delaiMessage === null) {
          return;
        } else {
          message.deleted = true;
          this.delaiMessageService.update(message).subscribe(
            () => {
              this.loadAll();
              this.showMessage('success', 'SUPPRESSION', 'Suppression effectuée avec succès !');
            },
            () => this.showMessage('error', 'SUPPRESSION', 'Echec de la suppression !')
          );
        }
      }
    });
    this.ngOnInit();
  }
  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDelaiMessage>>) {
      result.subscribe(
        () => {
          this.showMessage('success', 'ENREGISTREMENT', 'message ajoutée avec succès!');
          this.onSaveSuccess();
        },
        () => {
          this.showMessage('error', 'ENREGISTREMENT', "Echec d'enregistrement!");
          this.onSaveError();
        }
      );
    }

  showMessage(sever: string, sum: string, det: string) {
    this.messageService.add({
      key: 'myKey1',
      severity: sever,
      summary: sum,
      detail: det
    });
  }
  protected onSaveSuccess() {
      this.isSaving = false;
      this.loadAll();
    }

  protected onSaveError() {
      this.isSaving = false;
    }
}
