import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IServeur } from 'app/shared/model/microserviceged/serveur.model';

type EntityResponseType = HttpResponse<IServeur>;
type EntityArrayResponseType = HttpResponse<IServeur[]>;

@Injectable({ providedIn: 'root' })
export class ServeurService {
  public resourceUrl = SERVER_API_URL + 'services/microserviceged/api/serveurs';
  public resourceUrl1 = SERVER_API_URL + 'services/microserviceged/api/serveurs/updateListe';
  constructor(protected http: HttpClient) {}

  create(serveur: IServeur): Observable<EntityResponseType> {
    return this.http.post<IServeur>(this.resourceUrl, serveur, { observe: 'response' });
  }

  update(serveur: IServeur): Observable<EntityResponseType> {
    return this.http.put<IServeur>(this.resourceUrl, serveur, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IServeur>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IServeur[]>(this.resourceUrl, { params: options, observe: 'response' });
  }
  changeStatus(serveur: IServeur): Observable<EntityResponseType> {
    return this.http
      .put<IServeur>(this.resourceUrl + '/activate', serveur, { observe: 'response' });
  }
  deleteAll(serveur: IServeur[]): Observable<EntityArrayResponseType> {
    return this.http.put<IServeur[]>(this.resourceUrl1, serveur, {observe: 'response'});
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
