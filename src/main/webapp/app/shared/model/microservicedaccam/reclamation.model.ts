import { Moment } from 'moment';
import { IReclamationCandidatLot } from 'app/shared/model/microservicedaccam/reclamation-candidat-lot.model';
import { IFichier } from 'app/entities/file-manager/file-menager.model';
import { Lot } from 'app/shared/model/microservicedaccam/lot.model';
import { AvisDac } from 'app/shared/model/microservicedaccam/avis-dac.model';
import { IDecision } from 'app/shared/model/microservicedaccam/decision.model';
import { ILot } from '../../../../../../../target/marchepublicgateway-0.0.1-SNAPSHOT/app/shared/model/microservicedaccam/lot.model';

export interface IReclamation {
  id?: number;
  date?: Moment;
  lotId?: number;
  avisDacId?: number;
  description?: string;
  deleted?: boolean;
  reclamationCandidatLots?: IReclamationCandidatLot[];
  reclamationCandidatLot?: IReclamationCandidatLot;
  files?: IFichier[];
  typeRecours?: any;
  lot?: Lot;
  avisdac?: AvisDac;
  decisions?: IDecision[];
  lots?: ILot[];
  // numeroAvis?: string;
}

export class Reclamation implements IReclamation {
  constructor(
    public id?: number,
    public date?: Moment,
    public lotId?: number,
    public avisDacId?: number,
    public description?: string,
    public deleted?: boolean,
    public reclamationCandidatLots?: IReclamationCandidatLot[],
    public reclamationCandidatLot?: IReclamationCandidatLot,
    public files?: IFichier[],
    public typeRecours?: any,
    public lot?: Lot,
    public avisdac?: AvisDac,
    public decisions?: IDecision[],
    public lots?: ILot[]
    // public numeroAvis?: string,
  ) {
    this.deleted = this.deleted || false;
  }
}
