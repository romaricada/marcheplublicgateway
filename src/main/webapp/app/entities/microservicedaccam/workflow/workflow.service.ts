import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IWorkflow } from 'app/shared/model/microservicedaccam/workflow.model';


type EntityResponseType = HttpResponse<IWorkflow>;
type EntityArrayResponseType = HttpResponse<IWorkflow[]>;

@Injectable({ providedIn: 'root' })
export class WorkflowService {
  public resourceUrl = SERVER_API_URL + 'services/microservicedaccam/api/workflows';
  public  resourceUrl1= SERVER_API_URL + 'services/microservicedaccam/api/workflow/updateListe';

  constructor(protected http: HttpClient) {}

  create(workflow: IWorkflow): Observable<EntityResponseType> {
    return this.http.post<IWorkflow>(this.resourceUrl, workflow, { observe: 'response' });
  }

  update(workflow: IWorkflow): Observable<EntityResponseType> {
    return this.http.put<IWorkflow>(this.resourceUrl, workflow, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IWorkflow>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IWorkflow[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
  deleteAll(workflow: IWorkflow[]): Observable<EntityArrayResponseType> {
    return this.http.put<IWorkflow[]>(this.resourceUrl1, workflow, { observe: 'response' });
  }
}
