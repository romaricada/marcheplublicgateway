import {Moment} from 'moment';
import {ICandidatLot} from 'app/shared/model/microservicedaccam/candidat-lot.model';
import {Caution, ICaution} from 'app/shared/model/microservicedaccam/caution.model';
import {IFichier} from "app/entities/file-manager/file-menager.model";

export interface ICandidatCautionLot {
  id?: number;
  description?: string;
  typeDeMontant?: string;
  dateDebut?: Moment;
  validationCandidat?: number;
  deleted?: boolean;
  depouillement?: boolean;
  montantCandidat?: number;
  candidatLotId?: number;
  candidatLot?: ICandidatLot;
  cautionId?: number;
  caution?: ICaution;
  files?: IFichier[];
  institutionFinanciere?: string;

}

export class CandidatCautionLot implements ICandidatCautionLot {
  constructor(
    public id?: number,
    public description?: string,
    public typeDeMontant?: string,
    public institutionFinanciere?: string,
    public dateDebut?: Moment,
    public validationCandidat?: number,
    public deleted?: boolean,
    public depouillement?: boolean,
    public montantCandidat?: number,
    public candidatLotId?: number,
    public candidatLot?: ICandidatLot,
    public cautionId?: number,
    public caution?: Caution,
    public files?: IFichier[]
  ) {
    this.deleted = this.deleted || false;
    this.depouillement = this.depouillement || true;
  }
}

