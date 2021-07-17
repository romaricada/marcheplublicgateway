import {Moment} from 'moment';
import {ICandidatLot} from 'app/shared/model/microservicedaccam/candidat-lot.model';
import {IFichier} from 'app/entities/file-manager/file-menager.model';
import {ICandidat} from 'app/shared/model/microservicedaccam/candidat.model';

export interface IDepouillement {
  id?: number;
  description?: string;
  date?: Moment;
  heureDebut?: string;
  heureFin?: string;
  lieu?: string;
  salle?: string;
  deleted?: boolean;
  invalide?: boolean;
  candidatLots?: ICandidatLot[];
  candidats?: ICandidat[];
  avisDacId?: number;
  montantCandidat?: number;
  files?: IFichier[];
}

export class Depouillement implements IDepouillement {
  constructor(
    public id?: number,
    public description?: string,
    public date?: Moment,
    public heureDebut?: string,
    public heureFin?: string,
    public lieu?: string,
    public salle?: string,
    public deleted?: boolean,
    public invalide?: boolean,
    public candidatLots?: ICandidatLot[],
    public candidats?: ICandidat[],
    public avisDacId?: number,
    public montantCandidat?: number,
    public files?: IFichier[]

  ) {
    this.deleted = this.deleted || false;
    this.invalide = this.invalide || false;
  }
}
