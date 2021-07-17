import { Moment } from 'moment';
import { IContentieux } from 'app/shared/model/microserviceexecution/contentieux.model';
import {IFichier} from 'app/entities/file-manager/file-menager.model';

export interface IDecisionContentieux {
  id?: number;
  contentieuxId?: number;
  decision?: string;
  date?: Moment;
  structure?: string;
  referenceDecision?: string;
  deleted?: boolean;
  contentieuxs?: IContentieux[];
  files?: IFichier[];
}

export class DecisionContentieux implements IDecisionContentieux {
  constructor(
    public id?: number,
    public contentieuxId?: number,
    public decision?: string,
    public date?: Moment,
    public structure?: string,
    public referenceDecision?: string,
    public deleted?: boolean,
    public contentieuxs?: IContentieux[],
    public files?: IFichier[]

  ) {
    this.deleted = this.deleted || false;
  }
}
