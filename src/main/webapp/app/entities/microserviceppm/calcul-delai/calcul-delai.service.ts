import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import {ICalculDelai} from 'app/shared/model/microserviceppm/calcul-delai.model';
import {createRequestOption} from 'app/shared/util/request-util';
type EntityResponseType = HttpResponse<ICalculDelai>;
type EntityArrayResponseType = HttpResponse<ICalculDelai[]>;

@Injectable({ providedIn: 'root' })
export class CalculDelaiService {
  public resourceUrl = SERVER_API_URL + 'services/microserviceppm/api/calcul-delais';

  constructor(protected http: HttpClient) {}

  create(calculDelaiDTO: ICalculDelai): Observable<EntityArrayResponseType> {
    return this.http.post<ICalculDelai[]>(this.resourceUrl + '/save', calculDelaiDTO,{ observe: 'response' });
  }

  getCalulDelaiByLibelle(libelle: string): Observable<EntityArrayResponseType> {
    return this.http.get<ICalculDelai[]>(this.resourceUrl + '/get-by-libelle',{ params: createRequestOption({libelle}), observe: 'response' });
  }
  getEtapesByDate(libelle: string): Observable<EntityResponseType> {
    return this.http.get<ICalculDelai>(this.resourceUrl + '/get-by-date', {params: createRequestOption({libelle}),observe: 'response'});
  }

  update(calculDelai: ICalculDelai): Observable<EntityArrayResponseType> {
    return this.http.put<ICalculDelai[]>(this.resourceUrl +'/modifier', calculDelai, { observe: 'response' });
  }

  query(): Observable<EntityArrayResponseType> {
    return this.http.get<ICalculDelai[]>(this.resourceUrl, { observe: 'response' });
  }

  deleteAll(calculDelai: ICalculDelai[]): Observable<EntityArrayResponseType> {
    return this.http.put<ICalculDelai[]>(this.resourceUrl, calculDelai, { observe: 'response' });
  }

  update1(calculDelai: ICalculDelai): Observable<EntityArrayResponseType> {
    return this.http.put<ICalculDelai[]>(this.resourceUrl + '/update', calculDelai, { observe: 'response' });
  }

  getModePassation(modePassationId: number): Observable<EntityArrayResponseType> {
    return this.http.get<ICalculDelai[]>(this.resourceUrl + '/get-by-modepassation',{ params: createRequestOption({modePassationId}), observe: 'response' });
  }
  getModePassationAndDelaiCalcul(modePassationId: number, libelle: string): Observable<EntityArrayResponseType> {
    return this.http.get<ICalculDelai[]>(this.resourceUrl + '/get-by-modepassationdelai',{ params: createRequestOption({modePassationId,libelle}), observe: 'response' });
  }
}
