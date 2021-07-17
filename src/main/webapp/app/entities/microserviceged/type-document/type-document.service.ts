import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITypeDocument } from 'app/shared/model/microserviceged/type-document.model';

type EntityResponseType = HttpResponse<ITypeDocument>;
type EntityArrayResponseType = HttpResponse<ITypeDocument[]>;

@Injectable({ providedIn: 'root' })
export class TypeDocumentService {
  public resourceUrl = SERVER_API_URL + 'services/microserviceged/api/type-documents';

  constructor(protected http: HttpClient) {}

  create(typeDocument: ITypeDocument): Observable<EntityResponseType> {
    return this.http.post<ITypeDocument>(this.resourceUrl, typeDocument, { observe: 'response' });
  }

  update(typeDocument: ITypeDocument): Observable<EntityResponseType> {
    return this.http.put<ITypeDocument>(this.resourceUrl, typeDocument, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITypeDocument>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITypeDocument[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
