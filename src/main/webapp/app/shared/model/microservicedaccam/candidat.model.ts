import { ICandidatLot } from 'app/shared/model/microservicedaccam/candidat-lot.model';
import {ILot} from "app/shared/model/microservicedaccam/lot.model";

export interface ICandidat {
  id?: number;
  avisdacId?: number;
  nomStructure?: string;
  adresse?: string;
  email?: string;
  deleted?: boolean;
  candidatLots?: ICandidatLot[];
  soumisionniares?: ICandidatLot[];
  lots?: ILot[];
}

export class Candidat implements ICandidat {
  constructor(
    public id?: number,
    public avisdacId?: number,
    public nomStructure?: string,
    public adresse?: string,
    public email?: string,
    public deleted?: boolean,
    public candidatLots?: ICandidatLot[],
    public soumisionniares?: ICandidatLot[],
    public lots?: ILot[]
  ) {
    this.deleted = this.deleted || false;
  }
}

