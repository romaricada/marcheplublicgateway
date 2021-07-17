import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {SERVER_API_URL} from 'app/app.constants';
import {createRequestOption} from 'app/shared/util/request-util';
import {IActivite} from 'app/shared/model/microserviceppm/activite.model';
import {IPpmActivite} from 'app/shared/model/microserviceppm/ppm-activite.model';

type EntityResponseType = HttpResponse<IActivite>;
type EntityArrayResponseType = HttpResponse<IActivite[]>;

@Injectable({providedIn: 'root'})
export class ActiviteService {
  public resourceUrl = SERVER_API_URL + 'services/microserviceppm/api/activites';

  constructor(protected http: HttpClient) {
  }

  create(activite: IActivite): Observable<EntityResponseType> {
    return this.http.post<IActivite>(this.resourceUrl, activite, {observe: 'response'});
  }

  update(activite: IActivite): Observable<EntityResponseType> {
    return this.http.put<IActivite>(this.resourceUrl, activite, {observe: 'response'});
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IActivite>(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IActivite[]>(this.resourceUrl, {params: options, observe: 'response'});
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  findAllByAnneeExercice(idAnnee: number): Observable<EntityArrayResponseType> {
    const options = createRequestOption({idAnnee});
    return this.http.get<IActivite[]>(this.resourceUrl + '/all-by-annee', {params: options, observe: 'response'});
  }

  findAllDeconcentreByAnneeExercice(idAnnee: number): Observable<EntityArrayResponseType> {
    const options = createRequestOption({idAnnee});
    return this.http.get<IActivite[]>(this.resourceUrl + '/all-deconcentre-by-annee', {params: options, observe: 'response'});
  }

  findAllByAnneeExerciceNew(idAnnee: number): Observable<EntityArrayResponseType> {
    const options = createRequestOption({idAnnee});
    return this.http.get<IActivite[]>(this.resourceUrl + '/all-by-annee-new', {params: options, observe: 'response'});
  }

  findAllActiviteByAnneeAndExercice(idAnnee: number, isReport: boolean): Observable<EntityArrayResponseType> {
    const options = createRequestOption({idAnnee, isReport});
    return this.http.get<IActivite[]>(this.resourceUrl + '/all-report-list-by-annee', {
      params: options,
      observe: 'response'
    });
  }
  findAll(): Observable<EntityArrayResponseType> {
    return this.http.get<IActivite[]>(this.resourceUrl + '/find-all', {observe: 'response'});
  }

  generateCodeActivite(): Observable<HttpResponse<IActivite>> {
    return this.http.get<IActivite>(this.resourceUrl + '/generate-code', {observe: 'response'});
  }

  findAllActiviteByPPM(ppmId: number): Observable<EntityArrayResponseType> {
    const options = createRequestOption({ppmId});
    return this.http.get<IPpmActivite[]>(this.resourceUrl + '/all-by-ppm', {
      params: options,
      observe: 'response'
    });
  }
}
