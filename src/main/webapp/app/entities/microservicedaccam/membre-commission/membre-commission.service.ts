import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {SERVER_API_URL} from 'app/app.constants';
import {createRequestOption} from 'app/shared/util/request-util';
import {IMembreCommission} from 'app/shared/model/microservicedaccam/membre-commission.model';
import {IMembre} from "app/shared/model/microservicedaccam/membre.model";

type EntityResponseType = HttpResponse<IMembreCommission>;
type EntityArrayResponseType = HttpResponse<IMembreCommission[]>;

@Injectable({providedIn: 'root'})
export class MembreCommissionService {
    public resourceUrl = SERVER_API_URL + 'services/microservicedaccam/api/membre-commissions';

    constructor(protected http: HttpClient) {
    }

    create(membreCommission: IMembreCommission): Observable<EntityResponseType> {
        return this.http.post<IMembreCommission>(this.resourceUrl, membreCommission, {observe: 'response'});
    }

    update(membreCommission: IMembreCommission): Observable<EntityResponseType> {
        return this.http.put<IMembreCommission>(this.resourceUrl, membreCommission, {observe: 'response'});
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IMembreCommission>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMembreCommission[]>(this.resourceUrl, {params: options, observe: 'response'});
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    updateAll(membreCommission: IMembreCommission[]): Observable<EntityArrayResponseType> {
        return this.http.put<IMembreCommission[]>(this.resourceUrl + '/delete-all', membreCommission, {observe: 'response'});
    }

    findAllByActiviteAndTypeCommiss(activiteId: number, typeCommissId: number): Observable<EntityArrayResponseType> {
        const options = createRequestOption({activiteId, typeCommissId});
        return this.http.get<IMembreCommission[]>(this.resourceUrl + '/find-by-activite-and-type-com',
            {params: options, observe: 'response'});

    }

    findAllByAvisDacAndTypeCommiss(avisDacId: number, typeCommissId: number): Observable<EntityArrayResponseType> {
        const options = createRequestOption({avisDacId, typeCommissId});
        return this.http.get<IMembreCommission[]>(this.resourceUrl + '/find-by-avis-dac-and-type-com',
            {params: options, observe: 'response'});

    }


    getMembreByTypeCommission(typeCommissionId: number): Observable<HttpResponse<IMembre[]>> {

        return this.http.get<IMembre[]>(this.resourceUrl + '/all-by-type', {
            params: createRequestOption({typeCommissionId}),
            observe: 'response'
        });
    }

    membreAffectedOrnoteAffectedToTache(activiteId: number, typeCommiId: number, tacheId: number, isAffected: boolean): Observable<EntityArrayResponseType> {
        const options = createRequestOption({activiteId, typeCommiId, tacheId, isAffected});
        return this.http.get<IMembreCommission[]>(this.resourceUrl + '/affected_or_note_affected',
            {params: options, observe: 'response'});
    }
}
