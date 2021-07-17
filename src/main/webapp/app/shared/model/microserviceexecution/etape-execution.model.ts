import { IContrat } from 'app/shared/model/microserviceexecution/contrat.model';

export interface IEtapeExecution {
  id?: number;
  libelle?: string;
  deleted?: boolean;
  contrat?: IContrat;
}

export class EtapeExecution implements IEtapeExecution {
  constructor(public id?: number, public libelle?: string, public deleted?: boolean, public contrat?: IContrat) {
    this.deleted = this.deleted || false;
  }
}
