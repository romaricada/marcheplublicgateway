import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SERVER_API_URL} from 'app/app.constants';
import {createRequestOption} from 'app/shared/util/request-util';
import {IPPM} from 'app/shared/model/microserviceppm/ppm.model';
import {IReferentielDelai} from 'app/shared/model/microserviceppm/referentiel-delai.model';
import {IActivite} from "app/shared/model/microserviceppm/activite.model";

type EntityResponseType = HttpResponse<IPPM>;
type EntityArrayResponseType = HttpResponse<IPPM[]>;

@Injectable({providedIn: 'root'})
export class PPMService {
  public resourceUrl = SERVER_API_URL + 'services/microserviceppm/api/ppms';

  constructor(protected http: HttpClient) {
  }

  create(pPM: IPPM): Observable<EntityResponseType> {
    return this.http.post<IPPM>(this.resourceUrl, pPM, {observe: 'response'});
  }

  update(pPM: IPPM): Observable<EntityResponseType> {
    return this.http.put<IPPM>(this.resourceUrl, pPM, {observe: 'response'});
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPPM>(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPPM[]>(this.resourceUrl, {params: options, observe: 'response'});
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  findAllPPM(): Observable<EntityArrayResponseType> {
    return this.http.get<IPPM[]>(this.resourceUrl + '/all', {observe: 'response'});
  }

  findPpmByExercice(exerciceId: number): Observable<EntityResponseType> {
    return this.http.get<IPPM>(this.resourceUrl + '/by-exercice', { params: createRequestOption({exerciceId}), observe: 'response'})
  }

  generateCodePPM(): Observable<HttpResponse<IPPM>> {
    return this.http.get<IPPM>(this.resourceUrl + '/generate-code-ppm', {observe: 'response'});
  }

  getEtapePpmActivite(ppmActiviteId: number, modePassationId: number): Observable<HttpResponse<IReferentielDelai[]>> {
    return this.http.get<IReferentielDelai[]>(SERVER_API_URL + 'services/microserviceppm/api/referentiel-delais/get-etape-by-ppm-activite', { params: createRequestOption({ppmActiviteId, modePassationId}), observe: 'response'});
  }

  deleteAll(activites: IActivite[]): Observable<EntityArrayResponseType> {
    return this.http.put<IActivite[]>('services/microserviceppm/api/activites/update-all', activites, {observe: 'response'});
  }

}
