import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {SERVER_API_URL} from 'app/app.constants';
import {createRequestOption} from 'app/shared/util/request-util';
import {IDecision} from 'app/shared/model/microservicedaccam/decision.model';

type EntityResponseType = HttpResponse<IDecision>;
type EntityArrayResponseType = HttpResponse<IDecision[]>;

@Injectable({providedIn: 'root'})
export class DecisionService {
  public resourceUrl = SERVER_API_URL + 'services/microservicedaccam/api/decisions';

  constructor(protected http: HttpClient) {
  }

  create(decision: IDecision): Observable<EntityResponseType> {
    return this.http.post<IDecision>(this.resourceUrl, decision, {observe: 'response'});
  }

  update(decision: IDecision): Observable<EntityResponseType> {
    return this.http.put<IDecision>(this.resourceUrl, decision, {observe: 'response'});
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDecision>(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDecision[]>(this.resourceUrl, {params: options, observe: 'response'});
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  allDecisionsByReclamation(reclamationId: number): Observable<EntityArrayResponseType> {
    const options = createRequestOption({reclamationId});
    return this.http.get<IDecision[]>(this.resourceUrl + '/all-decisions-by-reclamation', {
      params: options,
      observe: 'response'
    });
  }

}
