import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {SERVER_API_URL} from 'app/app.constants';
import {createRequestOption} from 'app/shared/util/request-util';
import {ICaution} from 'app/shared/model/microservicedaccam/caution.model';
import {Caution} from 'app/shared/model/microservicedaccam/caution.model';
type EntityResponseType = HttpResponse<Caution>;
type EntityArrayResponseType = HttpResponse<Caution[]>;

@Injectable({providedIn: 'root'})
export class CautionService {
  public resourceUrl = SERVER_API_URL + 'services/microservicedaccam/api/cautions';

  constructor(protected http: HttpClient) {
  }

  create(caution: ICaution): Observable<EntityResponseType> {
    return this.http.post<ICaution>(this.resourceUrl, caution, {observe: 'response'});
  }
  findCautionByLot(lotId?: number): Observable<EntityArrayResponseType> {
    const options = createRequestOption({lotId});
    return this.http.get<ICaution[]>(this.resourceUrl + '/caution-by-lot', {
      params: options,
      observe: 'response'
    });
  }

  update(caution: ICaution): Observable<EntityResponseType> {
    return this.http.put<ICaution>(this.resourceUrl, caution, { observe: 'response' });
  }
  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICaution>(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICaution[]>(this.resourceUrl, {params: options, observe: 'response'});
  }
  deleteAll(caution: ICaution[]): Observable<EntityArrayResponseType> {
    return this.http.put<ICaution[]>(this.resourceUrl + '/deleteAllListe', caution, {observe: 'response'});
  }


  findAllByTypeCaution(typeCautionId?: number): Observable<EntityArrayResponseType> {
    const options = createRequestOption({typeCautionId});
    return this.http.get<ICaution[]>(this.resourceUrl + '/caution-by-type', {params: options, observe: 'response'});
  }

  findAllByLot(lotId?: number): Observable<EntityArrayResponseType> {
    const options = createRequestOption({lotId});
    return this.http.get<ICaution[]>(this.resourceUrl + '/caution-by-lot', {params: options, observe: 'response'});
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }
}
