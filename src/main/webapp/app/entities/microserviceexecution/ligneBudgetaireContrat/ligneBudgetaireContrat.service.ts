import {Injectable} from "@angular/core";
import {SERVER_API_URL} from "app/app.constants";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {createRequestOption} from "app/shared/util/request-util";
import {ILigneBudgetaireContrat} from "app/shared/model/microserviceexecution/ligne-budgetaire-contrat.model";
import {IContrat} from "app/shared/model/microserviceexecution/contrat.model";

type EntityResponseType = HttpResponse<ILigneBudgetaireContrat>;
// type EntityArrayResponseType = HttpResponse<ILigneBudgetaireContrat[]>;

@Injectable({ providedIn: 'root' })
export class LigneBudgetaireContratService {
  public resourceUrl = SERVER_API_URL + 'services/microserviceexecution/api/ligneBudgetaireContrats';

  constructor(protected http: HttpClient) {}

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILigneBudgetaireContrat>(`${this.resourceUrl}/${id}`, { observe: 'response' })
  }
  ligneBudgetaireByContrat(): Observable<HttpResponse<IContrat[]>> {
    const options = createRequestOption();
    return this.http.get<IContrat[]>(this.resourceUrl + '/all-id-by-contrat', {params: options, observe: 'response'});
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

}
