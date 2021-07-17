import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITacheWorkflow } from 'app/shared/model/microservicedaccam/tache-workflow.model';

type EntityResponseType = HttpResponse<ITacheWorkflow>;
type EntityArrayResponseType = HttpResponse<ITacheWorkflow[]>;

@Injectable({ providedIn: 'root' })
export class TacheWorkflowService {
  public resourceUrl = SERVER_API_URL + 'services/microservicedaccam/api/tache-workflows';
  public resourceUrls = SERVER_API_URL + 'services/microservicedaccam/api/tache-workflows/etat';

  constructor(protected http: HttpClient) {}

  create(tacheWorkflow: ITacheWorkflow): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(tacheWorkflow);
    return this.http
      .post<ITacheWorkflow>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(tacheWorkflow: ITacheWorkflow): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(tacheWorkflow);
    return this.http
      .put<ITacheWorkflow>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ITacheWorkflow>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITacheWorkflow[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(tacheWorkflow: ITacheWorkflow): ITacheWorkflow {
    const copy: ITacheWorkflow = Object.assign({}, tacheWorkflow, {
      date: tacheWorkflow.date != null && tacheWorkflow.date.isValid() ? tacheWorkflow.date.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.date = res.body.date != null ? moment(res.body.date) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((tacheWorkflow: ITacheWorkflow) => {
        tacheWorkflow.date = tacheWorkflow.date != null ? moment(tacheWorkflow.date) : null;
      });
    }
    return res;
  }

  trierByEtat(): Observable<EntityArrayResponseType> {
    return this.http.get<ITacheWorkflow[]>(this.resourceUrls, {observe: 'response'});
  }
}
