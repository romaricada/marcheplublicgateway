import {Injectable} from "@angular/core";
import {SERVER_API_URL} from "app/app.constants";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {createRequestOption} from "app/shared/util/request-util";
import {IEngagement} from "app/shared/model/microserviceexecution/engagement.model";
import {ILigneBudgetaireEngagement} from "app/shared/model/microserviceexecution/ligneBudgetaireEngagement.model";

type EntityResponseType = HttpResponse<IEngagement>;
type EntityArrayResponseType = HttpResponse<ILigneBudgetaireEngagement[]>;

@Injectable({ providedIn: 'root' })
export class LigneBudgetaireEngagementService {
  public resourceUrl = SERVER_API_URL + 'services/microserviceexecution/api/ligneBudgetaireEngagements';

  constructor(protected http: HttpClient) {}



  findAllByliggneBudgetaire(ligneBudgetaireId: number): Observable<EntityArrayResponseType> {
    const options = createRequestOption({ligneBudgetaireId});
    return this.http.get<ILigneBudgetaireEngagement[]>(this.resourceUrl + '/find-all-by-ligne-budgetaire', {params: options, observe: 'response'});
  }

}
