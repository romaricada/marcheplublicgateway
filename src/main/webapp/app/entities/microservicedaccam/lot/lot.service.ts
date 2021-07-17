import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SERVER_API_URL} from 'app/app.constants';
import {createRequestOption} from 'app/shared/util/request-util';
import {ILot} from 'app/shared/model/microservicedaccam/lot.model';

type EntityResponseType = HttpResponse<ILot>;
type EntityArrayResponseType = HttpResponse<ILot[]>;

@Injectable({providedIn: 'root'})
export class LotService {
  public resourceUrl = SERVER_API_URL + 'services/microservicedaccam/api/lots';

  constructor(protected http: HttpClient) {
  }

  create(lot: ILot): Observable<EntityResponseType> {
    return this.http.post<ILot>(this.resourceUrl, lot, {observe: 'response'});
  }

  update(lot: ILot): Observable<EntityResponseType> {
    return this.http.put<ILot>(this.resourceUrl, lot, {observe: 'response'});
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILot>(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILot[]>(this.resourceUrl, {params: options, observe: 'response'});
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  findLotByAvisDac(avisDacId: number): Observable<EntityArrayResponseType> {
    const options = createRequestOption({avisDacId});
    return this.http.get<ILot[]>(this.resourceUrl + '/all-by-avis-dac', {params: options, observe: 'response'});
  }

  findLotByActiviteWithCandidat(activiteId: number, status: boolean): Observable<EntityArrayResponseType> {
    const options = createRequestOption({activiteId, status});
    return this.http.get<ILot[]>(this.resourceUrl + '/activite-id', {params: options, observe: 'response'});
  }

  deleteAll(lot: ILot[]): Observable<EntityArrayResponseType> {
    return this.http.put<ILot[]>(this.resourceUrl + '/deleteAllListe', lot, {observe: 'response'});
  }

  changeStatus(lot: ILot): Observable<HttpResponse<any>> {
    return this.http.put<any>(this.resourceUrl + '/status-update', lot, {observe: 'response'});
  }
}
