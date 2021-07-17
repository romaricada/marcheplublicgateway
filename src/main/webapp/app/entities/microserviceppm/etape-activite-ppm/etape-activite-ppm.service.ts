import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IEtapeActivitePpm } from 'app/shared/model/microserviceppm/etape-activite-ppm.model';

type EntityResponseType = HttpResponse<IEtapeActivitePpm>;
type EntityArrayResponseType = HttpResponse<IEtapeActivitePpm[]>;

@Injectable({ providedIn: 'root' })
export class EtapeActivitePpmService {
  public resourceUrl = SERVER_API_URL + 'services/microserviceppm/api/etape-activite-ppms';
  public resourceUrl1 = SERVER_API_URL + 'services/microserviceppm/api/etape-activite-ppms/alert';

  constructor(protected http: HttpClient) {}

  create(etapeActivitePpm: IEtapeActivitePpm): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(etapeActivitePpm);
    return this.http
      .post<IEtapeActivitePpm>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(etapeActivitePpm: IEtapeActivitePpm): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(etapeActivitePpm);
    return this.http
      .put<IEtapeActivitePpm>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IEtapeActivitePpm>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }


  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IEtapeActivitePpm[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(etapeActivitePpm: IEtapeActivitePpm): IEtapeActivitePpm {
    const copy: IEtapeActivitePpm = Object.assign({}, etapeActivitePpm, {
      dateEtape:
        etapeActivitePpm.dateEtape != null && etapeActivitePpm.dateEtape.isValid() ? etapeActivitePpm.dateEtape.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateEtape = res.body.dateEtape != null ? moment(res.body.dateEtape) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((etapeActivitePpm: IEtapeActivitePpm) => {
        etapeActivitePpm.dateEtape = etapeActivitePpm.dateEtape != null ? moment(etapeActivitePpm.dateEtape) : null;
      });
    }
    return res;
  }

  findAllByActivite(activiteId: number): Observable<EntityArrayResponseType> {
   // const options= createRequestOption(activiteId);
    return this.http.get<IEtapeActivitePpm[]>(this.resourceUrl+'/find-all-by-activite?activiteId='+activiteId,
      { observe: 'response'});
  }
}
