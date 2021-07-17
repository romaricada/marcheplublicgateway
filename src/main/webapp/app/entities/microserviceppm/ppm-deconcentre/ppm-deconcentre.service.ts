import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IActivite } from 'app/shared/model/microserviceppm/activite.model';

type EntityResponseType = HttpResponse<IActivite>;
type EntityArrayResponseType = HttpResponse<IActivite[]>;

@Injectable({ providedIn: 'root' })
export class PpmDeconcentreService {
  public resourceUrl = SERVER_API_URL + 'services/microserviceppm/api/ppm-activites';

  constructor(protected http: HttpClient) {
  }

  create(activite: IActivite): Observable<EntityResponseType> {
    return this.http.post<IActivite>(this.resourceUrl, activite, { observe: 'response' });
  }

  update(activite: IActivite): Observable<EntityResponseType> {
    return this.http.put<IActivite>(this.resourceUrl, activite, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IActivite>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IActivite[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  exportDataModel(): Observable<HttpResponse<ArrayBuffer>> {
    let header = new HttpHeaders();
    header = header.append('Accept', 'application/vnd.ms.excel; charset=utf-8');
    return this.http.get('services/microserviceppm/api/export-model', {
      headers: header,
      observe: 'response',
      responseType: 'arraybuffer'
    });
  }

  exportBudgetModel(): Observable<HttpResponse<ArrayBuffer>> {
    let header = new HttpHeaders();
    header = header.append('Accept', 'application/vnd.ms.excel; charset=utf-8');
    return this.http.get('services/microserviceppm/api/export-model-budget', {
      headers: header,
      observe: 'response',
      responseType: 'arraybuffer'
    });
  }

  exportDataPPM(idAnnee: number): Observable<HttpResponse<ArrayBuffer>> {
    let header = new HttpHeaders();
    header = header.append('Accept', 'application/vnd.ms.excel; charset=utf-8');
    const option = createRequestOption({ idAnnee });
    return this.http.get('services/microserviceppm/api/export-ppm', {
      params: option,
      headers: header,
      observe: 'response',
      responseType: 'arraybuffer'
    });
  }

  exportDataPPMToPdf(idAnnee: number): Observable<HttpResponse<ArrayBuffer>> {
    let header = new HttpHeaders();
    header = header.append('Accept', 'application/vnd.ms.excel; charset=utf-8');
    const option = createRequestOption({ idAnnee });
    return this.http.get('services/microserviceppm/api/export-ppm-pdf', {
      params: option,
      headers: header,
      observe: 'response',
      responseType: 'arraybuffer'
    });
  }

  importDataPPM(id: number, file: File, reference: string, update: boolean): Observable<HttpResponse<any>> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    let header = new HttpHeaders();
    header = header.append('Accept', 'application/vnd.ms.excel; charset=utf-8');
    const options = createRequestOption({ id, reference, update });
    return this.http.post<string>('services/microserviceppm/api/import-data', formData, {
      headers: header,
      params: options,
      observe: 'response'
    });
  }

  importDataBudget(id: number, file: File, update: boolean): Observable<HttpResponse<any>> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    let header = new HttpHeaders();
    header = header.append('Accept', 'application/vnd.ms.excel; charset=utf-8');
    const options = createRequestOption({ id, update });
    return this.http.post<string>('services/microserviceppm/api/import-budget', formData, {
      headers: header,
      params: options,
      observe: 'response'
    });
  }


}
