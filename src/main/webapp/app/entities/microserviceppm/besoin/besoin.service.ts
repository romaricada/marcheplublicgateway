import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {SERVER_API_URL} from 'app/app.constants';
import {createRequestOption} from 'app/shared/util/request-util';
import {IBesoin} from 'app/shared/model/microserviceppm/besoin.model';
import {ILigneBudgetaire} from 'app/shared/model/microserviceppm/ligne-budgetaire.model';
/* import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators'; */

type EntityResponseType = HttpResponse<IBesoin>;
type EntityArrayResponseType = HttpResponse<IBesoin[]>;

@Injectable({providedIn: 'root'})
export class BesoinService {
  public resourceUrl = SERVER_API_URL + 'services/microserviceppm/api/besoins';

  constructor(protected http: HttpClient) {
  }

  create(besoin: IBesoin): Observable<EntityResponseType> {
    // const copy = this.convertDateFromClient(besoin);
    return this.http.post<IBesoin>(this.resourceUrl, besoin, {observe: 'response'})
      ;
  }

  update(besoin: IBesoin): Observable<EntityResponseType> {
    // const copy = this.convertDateFromClient(besoin);
    return this.http.put<IBesoin>(this.resourceUrl, besoin, {observe: 'response'})
      ;
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IBesoin>(`${this.resourceUrl}/${id}`, {observe: 'response'})
      ;
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBesoin[]>(this.resourceUrl, {params: options, observe: 'response'});
  }

  findAllByExerciceAndDirection(exerciceId: number, directionId: number, req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption({exerciceId, directionId, req});
    return this.http.get<IBesoin[]>(this.resourceUrl + '/all-by-exercice-and-direction', {
      params: options,
      observe: 'response'
    })
      ;
  }

  findAllByNaturePrestation(naturePrestationId: number, exerciceId: number): Observable<EntityArrayResponseType> {
    const options = createRequestOption({naturePrestationId, exerciceId});
    return this.http.get<IBesoin[]>(this.resourceUrl + '/all-by-nature-prestation', {
      params: options,
      observe: 'response'
    })
      ;
  }

  findAllByExercice(exerciceId: number): Observable<EntityArrayResponseType> {
    const options = createRequestOption({exerciceId});
    return this.http.get<IBesoin[]>(this.resourceUrl + '/all-by-exercice', {
      params: options,
      observe: 'response'
    })
      ;
  }
  findAllByExerciceUpdate(exerciceId: number): Observable<EntityArrayResponseType> {
    const options = createRequestOption({exerciceId});
    return this.http.get<IBesoin[]>(this.resourceUrl + '/all-by-exercice-update', {
      params: options,
      observe: 'response'
    })
      ;
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  updateAll(besoins: IBesoin[]): Observable<EntityArrayResponseType> {
    return this.http.put<IBesoin[]>(this.resourceUrl + '/delete-all', besoins, {observe: 'response'});
  }

  determinerMontantReste(ligneBudgetaires: ILigneBudgetaire): Observable<HttpResponse<number>> {
    return this.http.put<number>(this.resourceUrl + '/deteminer-montant', ligneBudgetaires, {observe: 'response'});
  }

  findAllByExerciceAndUsedFalse(exerciceId: number): Observable<EntityArrayResponseType> {
    const options = createRequestOption({exerciceId});
    return this.http.get<IBesoin[]>(this.resourceUrl + '/used-false', {
      params: options,
      observe: 'response'
    })
      ;
  }

  montantRestant(ligneId: number, besoinId: number): Observable<HttpResponse<number>> {
    const options = createRequestOption({ligneId,besoinId});
    return this.http.get<number>(this.resourceUrl + '/montant-restant', {params: options, observe: 'response'});
  }

  montantDotCrAERestant( ligneBudgetId: number): Observable<HttpResponse<number[]>> {
    const options = createRequestOption({ligneBudgetId});
    return this.http.get<number[]>(this.resourceUrl + '/montant-dotCor-restant', {params: options, observe: 'response'});
  }
  montantDotCrCPRestant( ligneBudgetId: number): Observable<HttpResponse<number[]>> {
    const options = createRequestOption({ligneBudgetId});
    return this.http.get<number[]>(this.resourceUrl + '/montant-dotCorCP-restant', {params: options, observe: 'response'});
  }

  /* protected convertDateFromClient(besoin: IBesoin): IBesoin {
    const copy: IBesoin = Object.assign({}, besoin, {
        dateDebut: besoin.dateDebut != null && besoin.dateDebut.isValid() ? besoin.dateDebut.format(DATE_FORMAT) : null,
        dateFin: besoin.dateFin != null && besoin.dateFin.isValid() ? besoin.dateFin.format(DATE_FORMAT) : null,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
      if (res.body) {
          res.body.dateDebut = res.body.dateDebut != null ? moment(res.body.dateDebut) : null;
          res.body.dateFin = res.body.dateFin != null ? moment(res.body.dateFin) : null;
      }
      return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
      if (res.body) {
          res.body.forEach((besoin: IBesoin) => {
            besoin.dateDebut = besoin.dateDebut != null ? moment(besoin.dateDebut) : null;
            besoin.dateFin = besoin.dateFin != null ? moment(besoin.dateFin) : null;
          });
      }
      return res;
  } */
}
