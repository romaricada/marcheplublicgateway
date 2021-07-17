import { IReclamation } from 'app/shared/model/microservicedaccam/reclamation.model';
import { Moment } from 'moment';
import { IFichier } from 'app/entities/file-manager/file-menager.model';

export interface IDecision {
  id?: number;
  structure?: string;
  decision?: string;
  deleted?: boolean;
  reclamationId?: number;
  reference?: string;
  date?: Moment;
  files?: IFichier[];
  isUpdate?: boolean;
  reclamation?: IReclamation;
}

export class Decision implements IDecision {
  constructor(
    public id?: number,
    public structure?: string,
    public decision?: string,
    public deleted?: boolean,
    public reclamationId?: number,
    public reference?: string,
    public date?: Moment,
    public files?: IFichier[],
    public isUpdate?: boolean,
    public reclamation?: IReclamation
  ) {
    this.deleted = this.deleted || false;
  }
}
