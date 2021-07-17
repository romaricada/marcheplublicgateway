import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {SERVER_API_URL} from 'app/app.constants';
import {createRequestOption} from 'app/shared/util/request-util';
import {IBesoinLigneBudgetaire} from 'app/shared/model/microserviceppm/besoin-ligne-budgetaire.model';

type EntityResponseType = HttpResponse<IBesoinLigneBudgetaire>;
type EntityArrayResponseType = HttpResponse<IBesoinLigneBudgetaire[]>;

@Injectable({providedIn: 'root'})
export class BesoinActiviteService {
  public resourceUrl = SERVER_API_URL + 'services/microserviceppm/api/besoin-ligne-budgetaires';

  constructor(protected http: HttpClient) {
  }

  create(besoinLigneBudgetaire: IBesoinLigneBudgetaire): Observable<EntityResponseType> {
    return this.http.post<IBesoinLigneBudgetaire>(this.resourceUrl, besoinLigneBudgetaire, {observe: 'response'});
  }

  update(besoinLigneBudgetaire: IBesoinLigneBudgetaire): Observable<EntityResponseType> {
    return this.http.put<IBesoinLigneBudgetaire>(this.resourceUrl, besoinLigneBudgetaire, {observe: 'response'});
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IBesoinLigneBudgetaire>(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBesoinLigneBudgetaire[]>(this.resourceUrl, {params: options, observe: 'response'});
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }
}
