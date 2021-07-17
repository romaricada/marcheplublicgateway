import {Injectable} from "@angular/core";
import {SERVER_API_URL} from "app/app.constants";
import {HttpClient} from "@angular/common/http";
import {IContrat} from "app/shared/model/microserviceexecution/contrat.model";
import {Observable} from "rxjs";
import {ILiquidation} from "app/shared/model/microserviceexecution/liquidation.model";
import {IEngagement} from "app/shared/model/microserviceexecution/engagement.model";

@Injectable({
  providedIn: 'root'
})

export class ReportService {
  public resourceUrl = SERVER_API_URL + 'services/microserviceexecution/api/reporting';
  public resourceUrl1 = SERVER_API_URL + 'services/microserviceexecution/api/reporting/etat-contrat';

  constructor(protected http: HttpClient) {}

  ImprimerContrat(contratDTO: IContrat): Observable<ArrayBuffer> {
    window.console.log("===================================={}", contratDTO);
    contratDTO.ligneBudgetaireContrats = [];
    return this.http.put(this.resourceUrl1, contratDTO, { responseType: 'arraybuffer' });
  }
  ImprimerContratReception(contratDTO: IContrat): Observable<ArrayBuffer> {
    contratDTO.ligneBudgetaireContrats = [];
    return this.http.put(this.resourceUrl+'/etat-contrat-reception', contratDTO, { responseType: 'arraybuffer' });
  }

  ImprimerLiquidation(liquidation: ILiquidation): Observable<ArrayBuffer> {
    liquidation.contrat.ligneBudgetaireContrats = [];
    return this.http.put(this.resourceUrl +'/etat-liquidation', liquidation, { responseType: 'arraybuffer' });
  }

  ImprimerEngagement(engagement: IEngagement): Observable<ArrayBuffer> {

    return this.http.put(this.resourceUrl +'/etat-engagement', engagement, { responseType: 'arraybuffer' });
  }

}

