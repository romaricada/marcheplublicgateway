import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SERVER_API_URL} from 'app/app.constants';
import {createRequestOption} from 'app/shared/util/request-util';
import {IReferentielDelai} from 'app/shared/model/microserviceppm/referentiel-delai.model';
import {INormeReference} from 'app/shared/model/microserviceppm/norme-reference.model';
import {Moment} from 'moment';
import {IEtape} from 'app/shared/model/microserviceppm/etape.model';
import {DateCalcule} from "app/shared/model/microserviceppm/date-calcule.model";

type EntityResponseType = HttpResponse<IReferentielDelai>;
type EntityArrayResponseType = HttpResponse<IReferentielDelai[]>;

@Injectable({providedIn: 'root'})
export class ReferentielDelaiService {
  public resourceUrl = SERVER_API_URL + 'services/microserviceppm/api/referentiel-delais';

  public ressourceUrl = SERVER_API_URL + 'services/microserviceppm/api/referentiel-delais/update-all';

  public resourceUrlNorme = SERVER_API_URL + 'services/microserviceppm/api/norme-reference';

  constructor(protected http: HttpClient) {
  }

  create(referentielDelai: IReferentielDelai): Observable<EntityResponseType> {
    return this.http.post<IReferentielDelai>(this.resourceUrl, referentielDelai, {observe: 'response'});
  }

  update(referentielDelai: IReferentielDelai): Observable<EntityResponseType> {
    return this.http.put<IReferentielDelai>(this.resourceUrl, referentielDelai, {observe: 'response'});
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IReferentielDelai>(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IReferentielDelai[]>(this.resourceUrl, {params: options, observe: 'response'});
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  updateAll(referentielDelaiSelect: IReferentielDelai[]): Observable<HttpResponse<IReferentielDelai[]>> {
    return this.http.put<IReferentielDelai[]>(this.ressourceUrl, referentielDelaiSelect, {observe: 'response'});
  }


  findReferentielDelaiByModePassationId(modePassationId: number): Observable<EntityArrayResponseType> {
    return this.http.get<IReferentielDelai[]>(this.resourceUrl + '/get-referentiel-delai-by-mode-passationId', {
      params: createRequestOption({modePassationId}),
      observe: 'response'
    });
  }

  getReferentielDelaiByModePassationId(referentielDelai?: IReferentielDelai): Observable<EntityArrayResponseType> {

    return this.http.put<IReferentielDelai[]>(this.resourceUrl + '/get-plan-by-mode-passationId', referentielDelai, { observe: 'response'});
  }

  saveList(referentielDelai: IReferentielDelai[]): Observable<HttpResponse<number>> {
    return this.http.post<number>(this.resourceUrl + '/save-liste', referentielDelai, {observe: 'response'});
  }



  removeList(idModePassation: number): Observable<HttpResponse<number>> {
    const options = createRequestOption({idModePassation});
    return this.http.get<number>(this.resourceUrl + '/update-liste', {params: options, observe: 'response'});
  }

  getNormeReferences(): Observable<HttpResponse<INormeReference[]>> {
    return this.http.get<INormeReference[]>(this.resourceUrlNorme, {observe: 'response'});
  }

  calculerDalai(modePassationId: number, naturePrestationId: number, date: Moment, etapesSelecteds?: IEtape[]) {
    return this.http.get<IReferentielDelai[]>(this.resourceUrl + '/caluler-delai', {
      params: createRequestOption({modePassationId, naturePrestationId, date, etapesSelecteds}),
      observe: 'response'
    });
  }

  findEtapeByModePassationId(modePassationId: number): Observable<HttpResponse<IEtape[]>> {
    return this.http.get<IEtape[]>(this.resourceUrl + '/get-etape-by-mode-passation', {
      params: createRequestOption({modePassationId}),
      observe: 'response'
    });
  }


  getDateCalcule(referentielDelais: IReferentielDelai[]): Observable<HttpResponse<DateCalcule[]>> {
    return this.http.put<DateCalcule[]>(this.resourceUrl + '/date', referentielDelais,{observe: 'response'})
  }
}
