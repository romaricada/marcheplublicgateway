import { Injectable } from '@angular/core';
import {SERVER_API_URL} from "app/app.constants";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {createRequestOption} from "app/shared/util/request-util";
import {IJourFerier} from "app/shared/model/microserviceppm/jour-ferier.model";


type EntityResponseType = HttpResponse<IJourFerier>;
type EntityArrayResponseType = HttpResponse<IJourFerier[]>;

@Injectable({ providedIn: 'root' })
export class JourFerierService {
  public resourceUrl = SERVER_API_URL + 'services/microserviceppm/api/jour-feriers';
  public resourceUrl1 = SERVER_API_URL + 'services/microserviceppm/api/jour-feriers/updateListe';

  constructor(protected http: HttpClient) {}

  create(jourFerier: IJourFerier): Observable<EntityResponseType> {
    return this.http.post<IJourFerier>(this.resourceUrl, jourFerier, { observe: 'response' });
  }

  update(jourFerier: IJourFerier): Observable<EntityResponseType> {
    return this.http.put<IJourFerier>(this.resourceUrl, jourFerier, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IJourFerier>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IJourFerier[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
  deleteAll(jourFerier: IJourFerier[]): Observable<EntityArrayResponseType> {
    return this.http.put<IJourFerier[]>(this.resourceUrl1, jourFerier, { observe: 'response' });
  }

}

