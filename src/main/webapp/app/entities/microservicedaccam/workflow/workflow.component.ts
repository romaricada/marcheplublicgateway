import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import {IWorkflow, Workflow} from 'app/shared/model/microservicedaccam/workflow.model';
import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { WorkflowService } from './workflow.service';
import { ConfirmationService, MessageService } from "primeng/api";
import {Acteur} from "app/shared/model/microserviceppm/acteur.model";



@Component({
  selector: 'jhi-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.scss']
})
export class WorkflowComponent implements OnInit, OnDestroy {
  workflows: IWorkflow[];
  workflowSelected: IWorkflow[];
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
  display: Boolean;
  workflow: IWorkflow;
  displayDelete: Boolean;
  isSaving: Boolean;

  constructor(
    protected workflowService: WorkflowService,
    protected parseLinks: JhiParseLinks,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
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

  loadAll() {
    this.workflowService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IWorkflow[]>) => this.paginateWorkflows(res.body, res.headers));
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }
  transition() {
    this.router.navigate(['/workflow'], {
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
      '/workflow',
      {
        page: this.page,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    ]);
    this.loadAll();
  }

  ngOnInit() {
    this.display = false;
    this.workflow = new Workflow();
    this.isSaving = false;
    this.loadAll();
    this.registerChangeInWorkflows();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IWorkflow) {
    return item.id;
  }
  registerChangeInWorkflows() {
    this.eventSubscriber = this.eventManager.subscribe('workflowListModification', () => this.loadAll());
  }
  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }
  protected paginateWorkflows(data: IWorkflow[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    this.workflows = data;
  }
  add(workflow: IWorkflow) {
    workflow === null ? (this.workflow = new Acteur()) : (this.workflow = workflow);
    this.display = true;
  }
  supprimer() {
    this.displayDelete = true;
  }
  deleteElement(workfow: IWorkflow) {
    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Etes-vous sûr de vouloir supprimer ?',
      accept: () => {
        if (workfow === null) {
          return;
        } else {
          workfow.deleted = true;
          this.workflowService.update(workfow).subscribe(
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
  annuler() {
    this.workflow = new Workflow();
    this.display = false;
  }
  save() {
    if (!this.ifExist()) {
      this.isSaving = true;
      this.workflow.id = this.workflow.id;
      if (this.workflow.id !== undefined) {
        this.subscribeToSaveResponse(this.workflowService.update(this.workflow));
      } else {
        this.subscribeToSaveResponse(this.workflowService.create(this.workflow));
      }
    } else {
      this.showMessage('error', 'ENREGISTREMENT', 'Un workflow avec le  même libéllé existe déjà !');
    }
  }
  annulerDelete() {
    this.workflow = new Workflow();
    this.displayDelete = false;
  }
  deleteAll() {
    this.workflowService.deleteAll(this.workflowSelected).subscribe(
      () => {
        this.loadAll();
        this.showMessage('success', 'SUPPRESSION', 'Suppression effectuée avec succès !');
      },
      () => this.showMessage('error', 'SUPPRESSION', 'Echec de la suppression !')
    );

    this.displayDelete = false;
  }
  protected onSaveSuccess() {
    this.isSaving = false;
    this.loadAll();
    this.display = false;
  }
  protected onSaveError() {
    this.isSaving = false;
  }
  protected subscribeToSaveResponse(result: Observable<HttpResponse<IWorkflow>>) {
    result.subscribe(
      () => {
        this.showMessage('success', 'ENREGISTREMENT', 'Une workflow ajouté avec succès!');
        this.onSaveSuccess();
      },
      () => {
        this.showMessage('error', 'ENREGISTREMENT', "Echec d'enregistrement!");
        this.onSaveError();
      }
    );
  }
  ifExist(): boolean {
    if (this.workflow.id !== undefined) {
      return this.workflows.some(value => value.id !== this.workflow.id &&
        value.etat === this.workflow.etat   );
    } else {
      return this.workflows.some(value => value.etat === this.workflow.etat  );
    }
  }
  showMessage(sever: string, sum: string, det: string) {
    this.messageService.add({
      severity: sever,
      summary: sum,
      detail: det
    });
  }
}
