import {IContrat} from 'app/shared/model/microserviceexecution/contrat.model';
import {IDecisionContentieux} from 'app/shared/model/microserviceexecution/decision-contentieux.model';
import {IFichier} from 'app/entities/file-manager/file-menager.model';
import {Moment} from "moment";
import {TypeIncidentExecution} from "app/shared/model/enumerations/TypeIncidentExecution";

export interface IContentieux {
  id?: number;
  contratId?: number;
  decisionContentieuxId?: number;
  reference?: string;
  motif?: string;
  montant?: number;
  temps?: string;
  date?: Moment;
  status?: string;
  deleted?: boolean;
  contrat?: IContrat;
  decisionContentieux?: IDecisionContentieux;
  decisionContentieuxes?: IDecisionContentieux[];
  files?: IFichier[];
  typeIncidentExecution?: TypeIncidentExecution;
}

export class Contentieux implements IContentieux {
  constructor(
    public id?: number,
    public contratId?: number,
    public decisionContentieuxId?: number,
    public status?: string,
    public reference?: string,
    public motif?: string,
    public temps?: string,
    public date?: Moment,
    public deleted?: boolean,
    public contrat?: IContrat,
    public decisionContentieux?: IDecisionContentieux,
    public decisionContentieuxes?: IDecisionContentieux[],
    public typeIncidentExecution?: TypeIncidentExecution,
    public files?: IFichier[]
  ) {
    this.deleted = this.deleted || false;
  }
}
