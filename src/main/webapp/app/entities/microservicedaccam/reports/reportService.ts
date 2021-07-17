
import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {createRequestOption} from "app/shared/util/request-util";
import {IAvisDac} from "app/shared/model/microservicedaccam/avis-dac.model";
import {IDepouillement} from "app/shared/model/microservicedaccam/depouillement.model";
import {IDeliberation} from "app/shared/model/microservicedaccam/deliberation.model";
import {IReclamation} from "app/shared/model/microservicedaccam/reclamation.model";

@Injectable({
    providedIn: 'root'
})
export class ReportService {
    public resourceUrl = SERVER_API_URL + 'services/microservicedaccam/api/reporting';
    public resourceUrl1 = SERVER_API_URL + 'services/microservicedaccam/api/reporting/recu-avidac';

    constructor(protected http: HttpClient) {}


    imprimeAllMarche(sessionId: number): Observable<ArrayBuffer> {
        return this.http.get(`${this.resourceUrl}/all-activite`, {
            params: createRequestOption({sessionId}),
            responseType: 'arraybuffer'
        });
    }
    imprimeFinishedMarches(sessionId: number): Observable<ArrayBuffer> {
        return this.http.get(`${this.resourceUrl}/finished-activities`, {
            params: createRequestOption({sessionId}),
            responseType: 'arraybuffer'
        });
    }

    imprimeMarchesEnCours(sessionId: number): Observable<ArrayBuffer> {
        return this.http.get(`${this.resourceUrl}/activities-en-cours`, {
            params: createRequestOption({sessionId}),
            responseType: 'arraybuffer'
        });
    }
    imprimeMarchesAyantLitige(sessionId: number): Observable<ArrayBuffer> {
        return this.http.get(`${this.resourceUrl}/activities-ayant-litige`, {
            params: createRequestOption({sessionId}),
            responseType: 'arraybuffer'
        });
    }

    imprimeMarchesAyantContratResilie(sessionId: number): Observable<ArrayBuffer> {
        return this.http.get(`${this.resourceUrl}/activities-ayant-contrat-resilie`, {
            params: createRequestOption({sessionId}),
            responseType: 'arraybuffer'
        });
    }

    imprimerOffre(avisDacId: number, exerciceId: number,receptionId: number): Observable<ArrayBuffer> {
        return this.http.get(`${this.resourceUrl}/recu-paiement`, {
            params: createRequestOption({avisDacId,exerciceId,receptionId}),
            responseType: 'arraybuffer'
        });
    }

  ImprimerLot(avisDacId: number, exerciceId: number,receptionId: number): Observable<ArrayBuffer> {
    return this.http.get(`${this.resourceUrl}/recu-lot`, {
      params: createRequestOption({avisDacId,exerciceId,receptionId}),
      responseType: 'arraybuffer'
    });
  }


  ImprimerDac(avisDac: IAvisDac): Observable<ArrayBuffer> {
    return this.http.put(`${this.resourceUrl}/recu-avidac`, avisDac, { responseType: 'arraybuffer' })

  }

  ImprimerCandidat(avisDac: IAvisDac[]): Observable<ArrayBuffer> {
    return this.http.put(`${this.resourceUrl}/imp-candidat`, avisDac,
      { responseType: 'arraybuffer' })
  }


  ImprimerDepouille(depouillemnts: IDepouillement[]): Observable<ArrayBuffer> {
    return this.http.put(this.resourceUrl + '/recu-depouille', depouillemnts, { responseType: 'arraybuffer' })

  }

  imprimerDeliberation(deliberation: IDeliberation): Observable<ArrayBuffer> {
    return this.http.put(this.resourceUrl + '/recu-delib', deliberation, { responseType: 'arraybuffer' })
  }

  imprimerRecours(reclamation:IReclamation): Observable<ArrayBuffer> {
    return this.http.put(this.resourceUrl + '/recu-recours', reclamation, { responseType: 'arraybuffer' })

  }
    

}
