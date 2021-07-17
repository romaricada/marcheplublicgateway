import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';

import {Crieteria, ITache} from 'app/shared/model/microservicedaccam/tache.model';
import {IMembreCommission} from 'app/shared/model/microservicedaccam/membre-commission.model';
import {ITacheEtape} from 'app/shared/model/microservicedaccam/tache-etape.model';
import {TypeTache} from 'app/shared/model/enumerations/TypeTache';

type EntityResponseType = HttpResponse<ITache>;
type EntityArrayResponseType = HttpResponse<ITache[]>;

@Injectable({ providedIn: 'root' })
export class TacheService {
  public resourceUrl = SERVER_API_URL + 'services/microservicedaccam/api/taches';
  public resourceUrl1 = SERVER_API_URL + 'services/microservicedaccam/api/taches/updateListe';

  constructor(protected http: HttpClient) {}

  create(tache: ITache): Observable<EntityResponseType> {
    return this.http
      .post<ITache>(this.resourceUrl, tache, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => res));
  }

  update(tache: ITache): Observable<EntityResponseType> {
    return this.http
      .put<ITache>(this.resourceUrl, tache, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => res));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ITache>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => res));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITache[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => res));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findAll(): Observable<EntityArrayResponseType> {
    return this.http.get<ITache[]>(this.resourceUrl + '/find-all', {observe: 'response'});
  }


  addOrRemoveMembreFromTache(membreCommissions: IMembreCommission[], action: boolean, tacheId: number): Observable<EntityResponseType> {
    const options = createRequestOption({action, tacheId});
    return this.http.put<ITache>(this.resourceUrl+'/add_or_remove_membre', membreCommissions,
      {params: options, observe: 'response'});
  }

  findByObjectId(objectId: string): Observable<EntityResponseType> {
    const options = createRequestOption({objectId});
    return this.http.get<ITache>(this.resourceUrl+'/find-by-objectId',
      {params: options, observe: 'response'});
  }

  findByObjectIdAndTypeTache(objectId: string, typeTache: TypeTache): Observable<EntityArrayResponseType> {
    const options = createRequestOption({objectId, typeTache});
    return this.http.get<ITache[]>(this.resourceUrl+'/find-by-objectId-and-type-tache',
      {params: options, observe: 'response'});
  }

  finAllByCriteria(id: number, etat: string, crieteria: Crieteria): Observable<EntityArrayResponseType> {
    const options = createRequestOption({id, etat, crieteria});
    return this.http.get<ITache[]>(this.resourceUrl+'/find-tache-by-criteria',
      {params: options, observe: 'response'});
  }

  calculateDateByDelai(tacheEtape: ITacheEtape) {
    return this.http.put<ITacheEtape>(this.resourceUrl+'/calcule-date-fin-delai', tacheEtape,
      { observe: 'response'});
  }
  deleteAll(tache: ITache[]): Observable<EntityArrayResponseType> {
    return this.http.put<ITache[]>(this.resourceUrl1, tache, { observe: 'response' });
  }

}
