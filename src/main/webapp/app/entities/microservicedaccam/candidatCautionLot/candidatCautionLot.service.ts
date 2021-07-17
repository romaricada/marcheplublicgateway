import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {SERVER_API_URL} from 'app/app.constants';
import {createRequestOption} from 'app/shared/util/request-util';
import {CandidatCautionLot, ICandidatCautionLot} from "app/shared/model/microservicedaccam/candidatCautionLot.model";
type EntityResponseType = HttpResponse<CandidatCautionLot>;
type EntityArrayResponseType = HttpResponse<CandidatCautionLot[]>;

@Injectable({providedIn: 'root'})
export class CandidatCautionLotService {
  public resourceUrl = SERVER_API_URL + 'services/microservicedaccam/api/candidat-caution-lots';

  constructor(protected http: HttpClient) {
  }

  create(candidatCautionLot: ICandidatCautionLot): Observable<EntityResponseType> {
    return this.http.post<ICandidatCautionLot>(this.resourceUrl, candidatCautionLot, {observe: 'response'});
  }

  update(candidatCautionLot: ICandidatCautionLot): Observable<EntityResponseType> {
    return this.http.put<ICandidatCautionLot>(this.resourceUrl, candidatCautionLot, { observe: 'response' });
  }
  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICandidatCautionLot>(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICandidatCautionLot[]>(this.resourceUrl, {params: options, observe: 'response'});
  }
  deleteAll(candidatCautionLot: ICandidatCautionLot): Observable<EntityArrayResponseType> {
    return this.http.put<ICandidatCautionLot[]>(this.resourceUrl + '/delete-all', candidatCautionLot, {observe: 'response'});
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  findAllCandidatCautionBycandidatLot(candidatLotId: number): Observable<EntityArrayResponseType> {
    const options = createRequestOption({candidatLotId});
    return this.http.get<ICandidatCautionLot[]>(this.resourceUrl + '/candidatCautionLot-by-candidatLot', {params: options, observe: 'response'});
  }
}
