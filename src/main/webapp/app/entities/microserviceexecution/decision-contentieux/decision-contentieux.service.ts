import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDecisionContentieux } from 'app/shared/model/microserviceexecution/decision-contentieux.model';

type EntityResponseType = HttpResponse<IDecisionContentieux>;
type EntityArrayResponseType = HttpResponse<IDecisionContentieux[]>;

@Injectable({ providedIn: 'root' })
export class DecisionContentieuxService {
  public resourceUrl = SERVER_API_URL + 'services/microserviceexecution/api/decision-contentieuxes';

  constructor(protected http: HttpClient) {}

  create(decisionContentieux: IDecisionContentieux): Observable<EntityResponseType> {
    return this.http.post<IDecisionContentieux>(this.resourceUrl, decisionContentieux,{ observe: 'response' });
  }

  update(decisionContentieux: IDecisionContentieux): Observable<EntityResponseType> {
    return this.http
      .put<IDecisionContentieux>(this.resourceUrl, decisionContentieux, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IDecisionContentieux>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IDecisionContentieux[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findDecisionContentieuxbyContentieux(contentieuxId: number): Observable<EntityArrayResponseType> {
    const options = createRequestOption({contentieuxId});
    return this.http.get<IDecisionContentieux[]>(this.resourceUrl+'/decisionContentieux-by-contentieux',{ params: options, observe: 'response' });
  }

}
