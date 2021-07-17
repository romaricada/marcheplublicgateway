import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDocument } from 'app/shared/model/microserviceged/document.model';
type EntityResponseType = HttpResponse<IDocument>;
type EntityArrayResponseType = HttpResponse<IDocument[]>;

@Injectable({ providedIn: 'root' })
export class DocumentService {
  public resourceUrl = SERVER_API_URL + 'services/microserviceged/api/documents';
  public resourceUrl1 = SERVER_API_URL + 'services/microserviceged/api/entrepots/pere-fils';

  constructor(protected http: HttpClient) {}

  create(document: IDocument): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(document);
    return this.http
      .post<IDocument>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(document: IDocument): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(document);
    return this.http
      .put<IDocument>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IDocument>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IDocument[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(document: IDocument): IDocument {
    const copy: IDocument = Object.assign({}, document, {
      date: document.date != null && document.date.isValid() ? document.date.format(DATE_FORMAT) : null
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
      res.body.forEach((document: IDocument) => {
        document.date = document.date != null ? moment(document.date) : null;
      });
    }
    return res;
  }
  updateAll(document: IDocument[]): Observable<EntityArrayResponseType> {
    return this.http.put<IDocument[]>(this.resourceUrl + '/delete-all', document, {observe: 'response'});
  }
  findDocumentByType(typeId: number): Observable<EntityArrayResponseType> {
    const options = createRequestOption({typeId});
    return this.http.get<IDocument[]>(this.resourceUrl + '/document-by-type', {params: options, observe:'response'});
  }
  findDocumentByTypeAndArchive(typeId: number, typeArchiveId: number): Observable<EntityArrayResponseType>{
    const options = createRequestOption({typeId,typeArchiveId});
    return this.http.get<IDocument[]>(this.resourceUrl + '/document-by-archive', {params: options, observe:'response'});
  }
  findDocumentByTypeAndArchiveAndEntrepot(typeId: number, typeArchiveId: number, localId: number, entropotId: number): Observable<EntityArrayResponseType>{
    const options = createRequestOption({typeId, typeArchiveId,localId, entropotId});
    return this.http.get<IDocument[]>(this.resourceUrl + '/document-by-entropot', {params: options, observe:'response'});
  }

  findDocumentBylocal(localId: number): Observable<EntityArrayResponseType> {
    const options = createRequestOption({localId});
    return this.http.get<IDocument[]>(this.resourceUrl + '/localite', {params: options, observe:'response'});
  }
  findEntrepotPereFils(document: IDocument[]): Observable<EntityArrayResponseType> {
    const options = createRequestOption({document});
    return this.http.get<IDocument[]>(this.resourceUrl1 ,{params: options, observe:'response'});
  }

}
