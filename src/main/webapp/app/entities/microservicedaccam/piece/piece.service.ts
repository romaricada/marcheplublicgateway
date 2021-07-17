import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPiece } from 'app/shared/model/microservicedaccam/piece.model';

type EntityResponseType = HttpResponse<IPiece>;
type EntityArrayResponseType = HttpResponse<IPiece[]>;

@Injectable({ providedIn: 'root' })
export class PieceService {
  public resourceUrl = SERVER_API_URL + 'services/microservicedaccam/api/pieces';
  public resourceUrl1 = SERVER_API_URL + 'services/microservicedaccam/api/pieces/updateListe';
  constructor(protected http: HttpClient) {}

  create(pieceCandidat: IPiece): Observable<EntityResponseType> {
    return this.http.post<IPiece>(this.resourceUrl, pieceCandidat, { observe: 'response' });
  }

  update(pieceCandidat: IPiece): Observable<EntityResponseType> {
    return this.http.put<IPiece>(this.resourceUrl, pieceCandidat, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPiece>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPiece[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
  deleteAll(piece: IPiece[]): Observable<EntityArrayResponseType> {
    return this.http.put<IPiece[]>(this.resourceUrl1, piece, { observe: 'response' });
  }
}
