import { Moment } from 'moment';
import { ITache } from 'app/shared/model/microservicedaccam/tache.model';
import { IWorkflow } from 'app/shared/model/microservicedaccam/workflow.model';

export interface ITacheWorkflow {
  id?: number;
  date?: Moment;
  deleted?: boolean;
  tache?: ITache;
  workflow?: IWorkflow;
  workflowLibelle?: string;
  description?: string;
  dateCreation?: string;
  etat?: string;
  tacheLibelle?: string;
}

export class TacheWorkflow implements ITacheWorkflow {
  constructor(
    public id?: number,
    public date?: Moment,
    public deleted?: boolean,
    public tache?: ITache,
    public workflow?: IWorkflow,
    public workflowLibelle?: string,
    public description?: string,
    public dateCreation?: string,
    public etat?: string,
    public tacheLibelle?: string
  ) {
    this.deleted = this.deleted || false;
  }
}
