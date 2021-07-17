import {ITache} from 'app/shared/model/microservicedaccam/tache.model';
import {Etat} from 'app/shared/model/enumerations/etat';
import {TypeDelai} from "app/shared/model/enumerations/TypeDelai";

export interface ITacheEtape {
  id?: number;
  etat?: Etat;
  etapeActivitePpmId?: number;
  etapeLibelle?:string,
  tacheId?: number;
  tache?: ITache;
  deleted?: boolean;
  estRealise?: boolean;
  dateDebut?: Date;
  dateFin?: Date;
  delai?: number;
  typDelai?: TypeDelai;
}

export class TacheEtape implements ITacheEtape {
  constructor(
    public id?: number,
    public etat?: Etat,
    public etapeActivitePpmId?: number,
    public etapeLibelle?:string,
    public tacheId?: number,
    public tache?: ITache,
    public deleted?: boolean,
    public estRealise?: boolean,
    public dateDebut?: Date,
    public dateFin?: Date,
    public delai?: number,
    public typeDelai?: TypeDelai
  ) {
    this.deleted = this.deleted || false;
    this.estRealise = this.estRealise || false;
  }
}
