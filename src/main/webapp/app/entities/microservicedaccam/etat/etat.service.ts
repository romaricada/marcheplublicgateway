import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import * as moment from 'moment';
import {DATE_FORMAT} from 'app/shared/constants/input.constants';
import {map} from 'rxjs/operators';

import {SERVER_API_URL} from 'app/app.constants';
import {createRequestOption} from 'app/shared/util/request-util';
import {IDeliberation} from 'app/shared/model/microservicedaccam/deliberation.model';

type EntityResponseType = HttpResponse<IDeliberation>;
type EntityArrayResponseType = HttpResponse<IDeliberation[]>;

@Injectable({providedIn: 'root'})
export class EtatService {
  public resourceUrl = SERVER_API_URL + 'services/microservicedaccam/api/deliberations';

  constructor(protected http: HttpClient) {
  }

  create(deliberation: IDeliberation): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(deliberation);
    return this.http
      .post<IDeliberation>(this.resourceUrl, copy, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(deliberation: IDeliberation): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(deliberation);
    return this.http
      .put<IDeliberation>(this.resourceUrl, copy, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IDeliberation>(`${this.resourceUrl}/${id}`, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(lotId: number, req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IDeliberation[]>(this.resourceUrl + '?lotId=' + lotId, {params: options, observe: 'response'})
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  protected convertDateFromClient(deliberation: IDeliberation): IDeliberation {
    const copy: IDeliberation = Object.assign({}, deliberation, {
      date: deliberation.date != null && deliberation.date.isValid() ? deliberation.date.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.date = res.body.date != null ? moment(res.body.date) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((deliberation: IDeliberation) => {
        deliberation.date = deliberation.date != null ? moment(deliberation.date) : null;
      });
    }
    return res;
  }

  deleteAll(deliberation: IDeliberation[]): Observable<EntityArrayResponseType> {
    return this.http.put<IDeliberation[]>(this.resourceUrl + '/deleteAllListe', deliberation, {observe: 'response'});
  }

  changeDeliberationStatus(deliberation: IDeliberation): Observable<EntityResponseType> {
    return this.http.put<IDeliberation>(this.resourceUrl + '/active-deliberation', deliberation, {observe: 'response'});
  }
}
