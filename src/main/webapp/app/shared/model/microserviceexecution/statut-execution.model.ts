import {Moment} from 'moment';
import {IContrat} from 'app/shared/model/microserviceexecution/contrat.model';
import {IFichier} from 'app/entities/file-manager/file-menager.model';

export interface IStatutExecution {
  id?: number;
  contratId?: number;
  motif?: string;
  suspendu?: boolean;
  reprise?: boolean;
  dateSuspendu?: Moment;
  dateReprise?: Moment;
  deleted?: boolean;
  contratResilier?: boolean;
  contrat?: IContrat;
  files?: IFichier[];
}

export class StatutExecution implements IStatutExecution {
  constructor(
    public id?: number,
    public contratId?: number,
    public motif?: string,
    public suspendu?: boolean,
    public reprise?: boolean,
    public dateSuspendu?: Moment,
    public dateReprise?: Moment,
    public contratResilier?: boolean,
    public deleted?: boolean,
    public contrat?: IContrat,
    public files?: IFichier[]
  ) {
    this.suspendu = this.suspendu || false;
    this.reprise = this.reprise || false;
    this.contratResilier = this.contratResilier || false;
    this.deleted = this.deleted || false;
  }
}
