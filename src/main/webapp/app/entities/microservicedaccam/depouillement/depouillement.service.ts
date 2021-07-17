import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDepouillement } from 'app/shared/model/microservicedaccam/depouillement.model';

type EntityResponseType = HttpResponse<IDepouillement>;
type EntityArrayResponseType = HttpResponse<IDepouillement[]>;

@Injectable({ providedIn: 'root' })
export class DepouillementService {
  public resourceUrl = SERVER_API_URL + 'services/microservicedaccam/api/depouillements';

  constructor(protected http: HttpClient) {
  }

  create(depouillement: IDepouillement): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(depouillement);
    return this.http
      .post<IDepouillement>(this.resourceUrl, copy, { observe: 'response', responseType: 'json' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(depouillement: IDepouillement): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(depouillement);
    return this.http
      .put<IDepouillement>(this.resourceUrl, copy, { observe: 'response', responseType: 'json' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IDepouillement>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(avisDacId: number, req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IDepouillement[]>(this.resourceUrl + '?avisDacId=' + avisDacId, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(depouillement: IDepouillement): IDepouillement {
    const copy: IDepouillement = Object.assign({}, depouillement, {
      date: depouillement.date != null && depouillement.date.isValid() ? depouillement.date.format(DATE_FORMAT) : null
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
      res.body.forEach((depouillement: IDepouillement) => {
        depouillement.date = depouillement.date != null ? moment(depouillement.date) : null;
      });
    }
    return res;
  }
}
