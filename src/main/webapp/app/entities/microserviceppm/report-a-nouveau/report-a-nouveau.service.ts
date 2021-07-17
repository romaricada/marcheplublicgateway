import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPPM } from 'app/shared/model/microserviceppm/ppm.model';
import { IActivite } from 'app/shared/model/microserviceppm/activite.model';
import {IPpmActivite} from "app/shared/model/microserviceppm/ppm-activite.model";

type EntityResponseType = HttpResponse<IPPM>;
type EntityArrayResponseType = HttpResponse<IPPM[]>;

@Injectable({ providedIn: 'root' })
export class ReportANouveauService {
  public resourceUrl = SERVER_API_URL + 'services/microserviceppm/api/report';
  public resourceUrlsave = SERVER_API_URL + 'services/microserviceppm/api/ppm-activites';

  constructor(protected http: HttpClient) {}

  create(activite: IActivite): Observable<EntityResponseType> {
    return this.http.post<IActivite>(this.resourceUrl, activite, { observe: 'response' });
  }
  saveReport(reportactivite: IPpmActivite): Observable<EntityResponseType> {
    return this.http.post<IPpmActivite>(this.resourceUrlsave +'/save-report', reportactivite, { observe: 'response' });
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
  deleteReporter(ppmActivite: IPpmActivite): Observable<EntityResponseType> {
    // const options = createRequestOption({ppmActivite});
    return this.http.put<IPpmActivite>(this.resourceUrlsave +'/retiter-ppmActivite', ppmActivite,{observe: 'response' });
  }
}
