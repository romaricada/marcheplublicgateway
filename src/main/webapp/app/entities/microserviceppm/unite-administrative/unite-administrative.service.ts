import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {SERVER_API_URL} from 'app/app.constants';
import {createRequestOption} from 'app/shared/util/request-util';
import {IUniteAdministrative} from 'app/shared/model/microserviceppm/unite-administrative.model';

type EntityResponseType = HttpResponse<IUniteAdministrative>;
type EntityArrayResponseType = HttpResponse<IUniteAdministrative[]>;

@Injectable({providedIn: 'root'})
export class UniteAdministrativeService {
  public resourceUrl = SERVER_API_URL + 'services/microserviceppm/api/unite-administratives';
  public resourceUrl2 = SERVER_API_URL + 'services/microserviceppm/api/unite-administratives/updateListe';

  constructor(protected http: HttpClient) {
  }

  create(uniteAdministrative: IUniteAdministrative): Observable<EntityResponseType> {
    return this.http.post<IUniteAdministrative>(this.resourceUrl, uniteAdministrative, {observe: 'response'});
  }

  update(uniteAdministrative: IUniteAdministrative): Observable<EntityResponseType> {
    return this.http.put<IUniteAdministrative>(this.resourceUrl, uniteAdministrative, {observe: 'response'});
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IUniteAdministrative>(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IUniteAdministrative[]>(this.resourceUrl, {params: options, observe: 'response'});
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  deleteAll(uniteAdministrative: IUniteAdministrative[]): Observable<EntityArrayResponseType> {
    return this.http.put<IUniteAdministrative[]>(this.resourceUrl2, uniteAdministrative, {observe: 'response'});
  }

  findAll(): Observable<EntityArrayResponseType> {
    return this.http.get<IUniteAdministrative[]>(this.resourceUrl + '/find-all', {observe: 'response'});
  }

}
