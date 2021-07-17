import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {SERVER_API_URL} from 'app/app.constants';
import {createRequestOption} from 'app/shared/util/request-util';
import {INaturePrestation} from 'app/shared/model/microserviceppm/nature-prestation.model';

type EntityResponseType = HttpResponse<INaturePrestation>;
type EntityArrayResponseType = HttpResponse<INaturePrestation[]>;

@Injectable({providedIn: 'root'})
export class NaturePrestationService {
  public resourceUrl = SERVER_API_URL + 'services/microserviceppm/api/nature-prestations';
  public resourceUrl1 = SERVER_API_URL + 'services/microserviceppm/api/nature-prestations/updateListe';
  public resourceUrl2 = SERVER_API_URL + 'services/microserviceppm/api/nature-prestations/delete';

  constructor(protected http: HttpClient) {
  }

  create(naturePrestation: INaturePrestation): Observable<EntityResponseType> {
    return this.http.post<INaturePrestation>(this.resourceUrl, naturePrestation, {observe: 'response'});
  }

  update(naturePrestation: INaturePrestation): Observable<EntityResponseType> {
    return this.http.put<INaturePrestation>(this.resourceUrl, naturePrestation, {observe: 'response'});
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<INaturePrestation>(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<INaturePrestation[]>(this.resourceUrl, {params: options, observe: 'response'});
  }

  delete(naturePrestation: INaturePrestation): Observable<EntityResponseType>{
    return this.http.put<INaturePrestation>(this.resourceUrl2, naturePrestation, {observe: 'response'});
  }

  deleteAll(naturePrestation: INaturePrestation[]): Observable<EntityArrayResponseType> {
    return this.http.put<INaturePrestation[]>(this.resourceUrl1, naturePrestation, {observe: 'response'});
  }

  findAll(): Observable<EntityArrayResponseType> {
    return this.http.get<INaturePrestation[]>(this.resourceUrl + '/find-all', {observe: 'response'});
  }

  findAlList(): Observable<EntityArrayResponseType> {
    return this.http.get<INaturePrestation[]>(this.resourceUrl + '/find-all-list', {observe: 'response'});
  }
}
