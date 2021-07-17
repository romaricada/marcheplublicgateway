import {Moment} from 'moment';
import {ICandidatLot} from 'app/shared/model/microservicedaccam/candidat-lot.model';
import {IFichier} from 'app/entities/file-manager/file-menager.model';

export interface IDeliberation {
  id?: number;
  description?: string;
  numeroAvis?: string;
  date?: Moment;
  valide?: boolean;
  etatMarche?: boolean;
  lotId?: number;
  avisDacId?: number;
  deleted?: boolean;
  candidatLots?: ICandidatLot[];
  files?: IFichier[];
}

export class Deliberation implements IDeliberation {
  constructor(
    public id?: number,
    public description?: string,
    public numeroAvis?: string,
    public date?: Moment,
    public valide?: boolean,
    public etatMarche?: boolean,
    public lotId?: number,
    public avisDacId?: number,
    public deleted?: boolean,
    public candidatLots?: ICandidatLot[],
    public files?: IFichier[]
  ) {
    this.valide = this.valide || false;
    this.deleted = this.deleted || false;
    this.etatMarche = this.deleted || false;
  }
}
