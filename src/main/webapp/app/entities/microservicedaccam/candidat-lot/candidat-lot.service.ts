import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {SERVER_API_URL} from 'app/app.constants';
import {createRequestOption} from 'app/shared/util/request-util';
import {ICandidatLot} from 'app/shared/model/microservicedaccam/candidat-lot.model';

type EntityResponseType = HttpResponse<ICandidatLot>;
type EntityArrayResponseType = HttpResponse<ICandidatLot[]>;

@Injectable({providedIn: 'root'})
export class CandidatLotService {
  public resourceUrl = SERVER_API_URL + 'services/microservicedaccam/api/candidat-lots';
  public resourceUrl1 = SERVER_API_URL + 'services/microservicedaccam/api/candidat-lots/updateListe';

  constructor(protected http: HttpClient) {
  }

  create(candidatLot: ICandidatLot): Observable<EntityResponseType> {
    return this.http.post<ICandidatLot>(this.resourceUrl, candidatLot, {observe: 'response'});
  }

  update(candidatLot: ICandidatLot): Observable<EntityResponseType> {
    return this.http.put<ICandidatLot>(this.resourceUrl, candidatLot, {observe: 'response'});
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICandidatLot>(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICandidatLot[]>(this.resourceUrl, {params: options, observe: 'response'});
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  findAllByCandidatByActivte(activiteId?: number): Observable<EntityArrayResponseType> {
    const options = createRequestOption({activiteId});
    return this.http.get<ICandidatLot[]>(this.resourceUrl + '/all-candidat-by-activite', {
      params: options,
      observe: 'response'
    });
  }
  findAllByCandidatByLot(lotId?: number): Observable<EntityArrayResponseType> {
    const options = createRequestOption({lotId});
    return this.http.get<ICandidatLot[]>(this.resourceUrl + '/all-candidat-by-lot', {
      params: options,
      observe: 'response'
    });
  }

  deleteAll(candidatLot: ICandidatLot[]): Observable<EntityArrayResponseType> {
    return this.http.put<ICandidatLot[]>(this.resourceUrl1, candidatLot, {observe: 'response'});
  }

  findSoumissionnaireByLot(lotId?: number): Observable<EntityArrayResponseType> {
    const options = createRequestOption({lotId});
    return this.http.get<ICandidatLot[]>(this.resourceUrl + '/soumissionnaire-by-lot', {
      params: options,
      observe: 'response'
    });
  }

  findAttributaireByLot(lotId?: number, activiteId?: number): Observable<EntityResponseType> {
    const options = createRequestOption({lotId, activiteId});
    return this.http.get<ICandidatLot>(this.resourceUrl + '/find-attributaire', {params: options, observe: 'response'});
  }


  findAttributaireByLotCandidat(lotId?: number): Observable<EntityResponseType> {
    const options = createRequestOption({lotId});
    return this.http.get<ICandidatLot>(this.resourceUrl + '/attributaire-by-lot-candidat', {params: options, observe: 'response'});
  }

  findListAttributaireByLot(activiteId?: number, candidatId?: number): Observable<EntityArrayResponseType> {
    const options = createRequestOption({activiteId, candidatId});
    return this.http.get<ICandidatLot[]>(this.resourceUrl + '/find-list-attributaire-by-lot', {params: options, observe: 'response'});
  }

   findListAttributaireByActivite(avisDacId?: number): Observable<EntityArrayResponseType> {
    const options = createRequestOption({avisDacId});
    return this.http.get<ICandidatLot[]>(this.resourceUrl + '/find-list-attributaire-by-activite', {params: options, observe: 'response'});
  }

  iniLot(candidatId, avisDacId: number): Observable<EntityArrayResponseType> {
    const options = createRequestOption({candidatId, avisDacId});
    return this.http.get<ICandidatLot[]>(this.resourceUrl + '/init-liste-lot', {params: options, observe: 'response'});
  }

  changeStatus(candidatLot: ICandidatLot): Observable<EntityResponseType> {
    return this.http.put<ICandidatLot>(this.resourceUrl + '/active-attributaire', candidatLot, {observe: 'response'});
  }

  findContratByCandidat(contratId?: number): Observable<EntityArrayResponseType> {
    const options = createRequestOption({contratId});
    return this.http.get<ICandidatLot[]>(this.resourceUrl + '/find-candidatBycontrat', {params: options, observe: 'response'});
  }
}
