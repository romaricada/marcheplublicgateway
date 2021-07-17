import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import {IReclamationCandidatLot} from "app/shared/model/microservicedaccam/reclamation-candidat-lot.model";
import {IDepouillement} from "app/shared/model/microservicedaccam/depouillement.model";
import {DATE_FORMAT} from "app/shared/constants/input.constants";
import * as moment from "moment";
import {map} from "rxjs/operators";
import Any = jasmine.Any;

type EntityResponseType = HttpResponse<IReclamationCandidatLot>;
type EntityArrayResponseType = HttpResponse<IReclamationCandidatLot[]>;

@Injectable({ providedIn: 'root' })
export class ReclamationCandidatLotService {
  public resourceUrl = SERVER_API_URL + 'services/microservicedaccam/api/reclamation-candidat-lots';

  constructor(protected http: HttpClient) {}

  create(reclamationCandidatLot: IReclamationCandidatLot): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(reclamationCandidatLot);
    return this.http
      .post<IReclamationCandidatLot>(this.resourceUrl, copy, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(reclamationCandidatLot: IReclamationCandidatLot): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(reclamationCandidatLot);
    return this.http
      .put<IReclamationCandidatLot>(this.resourceUrl, copy, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IReclamationCandidatLot>(`${this.resourceUrl}/${id}`, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IReclamationCandidatLot[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

 /* initReclamationCandidatLot(lotId: number): Observable<EntityArrayResponseType> {
    const options = createRequestOption({lotId});
    return this.http.get<IReclamationCandidatLot[]>(this.resourceUrl + '/init-reclamation-candidat-lot', {params: options, observe: 'response'})
       .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }*/

  initReclamationCandidatLot(lotId: number): Observable<EntityArrayResponseType> {
    const options = createRequestOption({lotId});
    return this.http.get<IReclamationCandidatLot[]>(this.resourceUrl + '/init-reclamation-candidat-lot', {params: options, observe: 'response'});
  }

  initReclamationCandidatLot2(lotId: number[]): Observable<any> {
    return this.http.put<any[]>(this.resourceUrl + '/init-reclamation-candidat-lot', lotId, {observe: 'response'});
  }

  protected convertDateFromClient(reclamationCandidatLot: IReclamationCandidatLot): IReclamationCandidatLot {
    const copy: IDepouillement = Object.assign({}, reclamationCandidatLot, {
      date: reclamationCandidatLot.date != null && reclamationCandidatLot.date.isValid() ? reclamationCandidatLot.date.format(DATE_FORMAT) : null
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
      res.body.forEach((reclamationCandidatLot: IReclamationCandidatLot) => {
        reclamationCandidatLot.date = reclamationCandidatLot.date != null ? moment(reclamationCandidatLot.date) : null;
      });
    }
    return res;
  }
}
