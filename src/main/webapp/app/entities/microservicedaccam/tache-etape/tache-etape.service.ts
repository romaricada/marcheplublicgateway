import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import {ITacheEtape} from "app/shared/model/microservicedaccam/tache-etape.model";
type EntityArrayResponseType = HttpResponse<ITacheEtape[]>;

@Injectable({ providedIn: 'root' })
export class TacheEtapeService {
  public resourceUrl = SERVER_API_URL + 'services/microservicedaccam/api/tacheEtapes';

  constructor(protected http: HttpClient) {}

 /* create(tache: ITache): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(tache);
    return this.http
      .post<ITache>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }*/

  /* update(tache: ITache): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(tache);
    return this.http
      .put<ITache>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }*/

  /* find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ITache>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }*/

  /* query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITache[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }*/

 /* delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(tache: ITache): ITache {
    const copy: ITache = Object.assign({}, tache, {
      dateCreation: tache.dateCreation != null && tache.dateCreation.isValid() ? tache.dateCreation.format(DATE_FORMAT) : null
    });
    return copy;
  }*/

  /* protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateCreation = res.body.dateCreation != null ? moment(res.body.dateCreation) : null;
    }
    return res;
  }*/

 /* protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((tache: ITache) => {
        tache.dateCreation = tache.dateCreation != null ? moment(tache.dateCreation) : null;
      });
    }
    return res;
  }
*/
  findAllWithoutPage(): Observable<EntityArrayResponseType>{
    return this.http.get<ITacheEtape[]>(this.resourceUrl+'/find-all', {observe: 'response'});
  }

  findTacheEtapeByTache(tacheId?: number): Observable<EntityArrayResponseType> {
    const options = createRequestOption({tacheId});
    return this.http.get<ITacheEtape[]>(this.resourceUrl+'/all-by-tache', {params: options, observe: 'response'});
  }
}
