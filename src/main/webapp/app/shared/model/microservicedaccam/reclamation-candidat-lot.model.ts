import {IReclamationCandidatLot} from 'app/shared/model/microservicedaccam/reclamation-candidat-lot.model';
import {Moment} from 'moment';
import {IReclamation} from 'app/shared/model/microservicedaccam/reclamation.model';
import {IDecision} from "app/shared/model/microservicedaccam/decision.model";
import {ICandidatLot} from "app/shared/model/microservicedaccam/candidat-lot.model";

export interface IReclamationCandidatLot {
  id?: number;
  motif?: string;
  date?: Moment;
  deleted?: boolean;
  candidatLot?: ICandidatLot;
  candidatLotId?: number;
  reclamationId?: number;
  reclamation?: IReclamation;
  decisionId?: number;
  decision?: IDecision;
  decisions?: IDecision[];

}

export class ReclamationCandidatLot implements IReclamationCandidatLot {
  constructor(
    public id?: number,
    public motif?: string,
    public date?: Moment,
    public deleted?: boolean,
    public candidatLot?: ICandidatLot,
    public candidatLotId?: number,
    public reclamation?: IReclamation,
    public reclamationId?: number,
    public decisionId?: number,
    public decision?: IDecision,
    public decisions?: IDecision[]
  ) {
    this.deleted = this.deleted || false;
  }
}
