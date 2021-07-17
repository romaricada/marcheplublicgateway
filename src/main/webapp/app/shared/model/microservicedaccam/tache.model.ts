import { Moment } from 'moment';
import { ITacheWorkflow } from 'app/shared/model/microservicedaccam/tache-workflow.model';
import { IMembreCommission } from 'app/shared/model/microservicedaccam/membre-commission.model';
import {TypeTache} from "app/shared/model/enumerations/TypeTache";
import {ITacheEtape} from "app/shared/model/microservicedaccam/tache-etape.model";
import {ILot} from "app/shared/model/microservicedaccam/lot.model";
import {ITypeCommission} from "app/shared/model/microservicedaccam/type-commission.model";
import {Etat} from "app/shared/model/enumerations/etat";
import {IFichier} from "app/entities/file-manager/file-menager.model";

export interface ITache {
  id?: number;
  libelle?: string;
  description?: string;
  dateCreation?: Moment;
  deleted?: boolean;
  avisDacId?: number;
  typeTache?: TypeTache;
  tacheWorkflows?: ITacheWorkflow[];
  membreCommissions?: IMembreCommission[];
  typeCommission?: ITypeCommission;
  tacheEtapes?: ITacheEtape[];
  lotId?: number,
  lot?: ILot;
  objectId?: string;
  etatAvancement?: number;
  dateDebut?: Date;
  dateFin?: Date;
  etat?: Etat;
  files?: IFichier[];
}

export class Tache implements ITache {
  constructor(
    public id?: number,
    public libelle?: string,
    public description?: string,
    public dateCreation?: Moment,
    public deleted?: boolean,
    public avisDacId?: number,
    public typeTache?: TypeTache,
    public tacheWorkflows?: ITacheWorkflow[],
    public membreCommissions?: IMembreCommission[],
    public tacheEtapes?: ITacheEtape[],
    public typeCommission?: ITypeCommission,
    public lotId?: number,
    public objectId?: string,
    public lot?: ILot,
    public etatAvancement?: number,
    public dateDebut?: Date,
    public dateFin?: Date,
    public etat?: Etat,
    public files?: IFichier[]
  ) {
    this.deleted = this.deleted || false;
  }
}

export enum Crieteria {
  byAvisDac = 'byAvisDac', byLot = 'byLot'
}
