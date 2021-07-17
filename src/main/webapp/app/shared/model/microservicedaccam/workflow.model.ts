import { ITacheWorkflow } from 'app/shared/model/microservicedaccam/tache-workflow.model';
import {Etat} from "app/shared/model/enumerations/etat";

export interface IWorkflow {
  id?: number;
  libelle?: string;
  deleted?: boolean;
  etat?: Etat;
  tacheWorkflows?: ITacheWorkflow[];
}

export class Workflow implements IWorkflow {
  constructor(public id?: number, public libelle?: string, public deleted?: boolean, public tacheWorkflows?: ITacheWorkflow[]) {
    this.deleted = this.deleted || false;
  }
}
