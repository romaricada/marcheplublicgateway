import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {SERVER_API_URL} from 'app/app.constants';
import {createRequestOption} from 'app/shared/util/request-util';
import {IContrat} from 'app/shared/model/microserviceexecution/contrat.model';
import {IStatutExecution} from "app/shared/model/microserviceexecution/statut-execution.model";


type EntityResponseType = HttpResponse<IContrat>;
type EntityArrayResponseType = HttpResponse<IContrat[]>;

@Injectable({providedIn: 'root'})
export class ElaborationContratService {
    public resourceUrl = SERVER_API_URL + 'services/microserviceexecution/api/contrats';

    constructor(protected http: HttpClient) {
    }

    create(contrat: IContrat): Observable<EntityResponseType> {
        return this.http.post<IContrat>(this.resourceUrl, contrat, {observe: 'response'})
    }

    update(contrat: IContrat): Observable<EntityResponseType> {
        return this.http.put<IContrat>(this.resourceUrl, contrat, {observe: 'response'});
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IContrat>(`${this.resourceUrl}/${id}`, {observe: 'response'})
    }

    findById(contratId: number): Observable<EntityResponseType> {
        return this.http.get<IContrat>(`${this.resourceUrl+'/by-id'}/${contratId}`, {observe: 'response'})
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IContrat[]>(this.resourceUrl, {params: options, observe: 'response'});
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    changeStatus(statutExecution: IStatutExecution): Observable<EntityResponseType> {
        return this.http.put<IStatutExecution>(this.resourceUrl + '/active-marche-resilier', statutExecution, {observe: 'response'});
    }

    findAllContratByAvisDac(avisDacId: number): Observable<HttpResponse<IContrat[]>> {
        const options = createRequestOption({avisDacId});
        return this.http.get<IContrat[]>(this.resourceUrl + '/contrat-by-avis_dac', {
            params: options,
            observe: 'response'
        });
    }


}
