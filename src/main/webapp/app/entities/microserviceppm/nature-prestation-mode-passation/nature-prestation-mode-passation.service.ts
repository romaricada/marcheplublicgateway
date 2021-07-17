import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { INaturePrestationModePassation } from 'app/shared/model/microserviceppm/nature-prestation-mode-passation.model';
import { IModePassation } from 'app/shared/model/microserviceppm/mode-passation.model';

type EntityResponseType = HttpResponse<INaturePrestationModePassation>;
type EntityArrayResponseType = HttpResponse<INaturePrestationModePassation[]>;

@Injectable({ providedIn: 'root' })
export class NaturePrestationModePassationService {
  public resourceUrl = SERVER_API_URL + 'services/microserviceppm/api/nature-prestation-mode-passations';
  public resourceUrl1 = SERVER_API_URL + 'services/microserviceppm/api/nature-prestation-mode-passations/updateListe';

  constructor(protected http: HttpClient) {}

  create(naturePrestation: INaturePrestationModePassation): Observable<EntityResponseType> {
    return this.http.post<INaturePrestationModePassation>(this.resourceUrl, naturePrestation, { observe: 'response' });
  }

  update(naturePrestationModePassation: INaturePrestationModePassation): Observable<EntityResponseType> {
    return this.http.put<INaturePrestationModePassation>(this.resourceUrl, naturePrestationModePassation, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<INaturePrestationModePassation>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<INaturePrestationModePassation[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  verifNaturePrestationModePassation(naturePrestationId: number, modePassationId: number):Observable<any> {
    const options = createRequestOption({naturePrestationId,modePassationId});
    return this.http.get<boolean>(this.resourceUrl+ '/verif', {params: options, observe: 'response'});
  }

  getAllNaturePrestationModePassations(naturePrestationId: number, montant: number): Observable<HttpResponse<IModePassation>> {
    return this.http.get<IModePassation>(this.resourceUrl + '/get-mode-passation-by-montan-and-nature', { params: createRequestOption({naturePrestationId, montant}), observe: 'response' });
  }

  isOverlapNaturePrestationModePassation( montantMin: any, montantMax: any ):Observable<any> {
    const options = createRequestOption({ montantMin, montantMax});
    return this.http.get<boolean>(this.resourceUrl+ '/interval', {params: options, observe: 'response'});
  }
  deleteAll(naturePrestationModePassation: INaturePrestationModePassation[]): Observable<EntityArrayResponseType> {
    return this.http.put<INaturePrestationModePassation[]>(this.resourceUrl1, naturePrestationModePassation, {observe: 'response'});
  }
  findAll(): Observable<EntityArrayResponseType> {
    return this.http.get<INaturePrestationModePassation[]>(this.resourceUrl + '/find-all', {observe: 'response'});
  }
}
