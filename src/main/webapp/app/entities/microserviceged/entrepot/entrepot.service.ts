import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IEntrepot } from 'app/shared/model/microserviceged/entrepot.model';
import {IDocument} from "app/shared/model/microserviceged/document.model";
import {TreeNode} from "primeng/api";

type EntityResponseType = HttpResponse<IEntrepot>;
type EntityArrayResponseType = HttpResponse<IEntrepot[]>;

@Injectable({ providedIn: 'root' })
export class EntrepotService {
  public resourceUrl = SERVER_API_URL + 'services/microserviceged/api/entrepots';

  constructor(protected http: HttpClient) {}

  create(entrepot: IEntrepot): Observable<EntityResponseType> {
    return this.http.post<IEntrepot>(this.resourceUrl, entrepot, { observe: 'response' });
  }

  update(entrepot: IEntrepot): Observable<EntityResponseType> {
    return this.http.put<IEntrepot>(this.resourceUrl, entrepot, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEntrepot>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEntrepot[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findEntrepotByTypeEntrepotAndDeletedIsFalse(typeId: number): Observable<HttpResponse<IEntrepot[]>> {

    return this.http.get<IEntrepot[]>(this.resourceUrl + '/filter', { params: createRequestOption({typeId}), observe: 'response' });
  }

  findEntrepotByLocalAndTypeEntrepot(localId: number,typeId: number): Observable<HttpResponse<IEntrepot[]>> {

    return this.http.get<IEntrepot[]>(this.resourceUrl + '/filter-local-typeEntrepot', { params: createRequestOption({localId,typeId}), observe: 'response' });
  }

  findEntrepotByLocal(localId: number): Observable<HttpResponse<IEntrepot[]>> {

    return this.http.get<IEntrepot[]>(this.resourceUrl + '/filter-local', { params: createRequestOption({localId}), observe: 'response' });
  }

  findAllWithoutPage(): Observable<EntityArrayResponseType> {
    return this.http.get<IEntrepot[]>(this.resourceUrl+'/find-all', {observe: 'response'});
  }

  findEntrposFils(ordre?: number): Observable<EntityArrayResponseType> {
    return this.http.get<IEntrepot[]>(this.resourceUrl+'/filtrer-parordre', { params: createRequestOption({ordre}),observe: 'response'});
  }

findByrArbo(id: number): Observable<EntityArrayResponseType> {
    return this.http.get<IEntrepot[]>(this.resourceUrl+'/find-arbo', { params: createRequestOption({id}),observe: 'response'});
  }

  findByPereFils(id: number): Observable<EntityArrayResponseType> {
    return this.http.get<IEntrepot[]>(this.resourceUrl+'/pere-fils', { params: createRequestOption({id}),observe: 'response'});
  }

  findEntrepotChildrenByTypeEntrepot(typeEntrepotId: number): Observable<EntityArrayResponseType> {
    // const options = createRequestOption({document});
    return this.http.get<IDocument[]>(this.resourceUrl + '/all-by-type' ,{params: createRequestOption({typeEntrepotId}), observe:'response'});
  }

  setTreeNode(): Observable<HttpResponse<TreeNode[]>> {
    return this.http.get<TreeNode[]>(this.resourceUrl + '/all-with-tree' ,{ observe:'response'});
  }

}
