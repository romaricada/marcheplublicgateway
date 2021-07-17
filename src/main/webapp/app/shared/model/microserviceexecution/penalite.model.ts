import { IContrat } from 'app/shared/model/microserviceexecution/contrat.model';
import {IFichier} from 'app/entities/file-manager/file-menager.model';

export interface IPenalite {
  id?: number;
  motifPenalite?: string;
  deleted?: boolean;
  contratId?: number;
  liquidationId?: number;
  montantPenalite?: number;
  contrat?: IContrat;
  files?: IFichier[];
}

export class Penalite implements IPenalite {
  constructor(
    public id?: number,
    public contratId?: number,
    public liquidationId?: number,
    public montantPenalite?: number,
    public motifPenalite?: string,
    public deleted?: boolean,
    public contrat?: IContrat,
    public files?: IFichier[]
    ) {
    this.deleted = this.deleted || false;
  }
}
