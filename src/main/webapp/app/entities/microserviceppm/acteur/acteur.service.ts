import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IActeur } from 'app/shared/model/microserviceppm/acteur.model';

type EntityResponseType = HttpResponse<IActeur>;
type EntityArrayResponseType = HttpResponse<IActeur[]>;

@Injectable({ providedIn: 'root' })
export class ActeurService {
  public resourceUrl = SERVER_API_URL + 'services/microserviceppm/api/acteurs';
  public resourceUrl1 = SERVER_API_URL + 'services/microserviceppm/api/acteur/updateListe';

  constructor(protected http: HttpClient) {}

  create(acteur: IActeur): Observable<EntityResponseType> {
    return this.http.post<IActeur>(this.resourceUrl, acteur, { observe: 'response' });
  }

  update(acteur: IActeur): Observable<EntityResponseType> {
    return this.http.put<IActeur>(this.resourceUrl, acteur, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IActeur>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IActeur[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
  deleteAll(acteur: IActeur[]): Observable<EntityArrayResponseType> {
    return this.http.put<IActeur[]>(this.resourceUrl1, acteur, { observe: 'response' });
  }
}
