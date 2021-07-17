import { IEtape } from 'app/shared/model/microserviceppm/etape.model';
import { IActeur } from 'app/shared/model/microserviceppm/acteur.model';
import { IModePassation } from 'app/shared/model/microserviceppm/mode-passation.model';
import { INormeReference } from 'app/shared/model/microserviceppm/norme-reference.model';

export interface IReferentielDelai {
  id?: number;
  observation?: string;
  deleted?: boolean;
  etape?: IEtape;
  acteur?: IActeur;
  normeReference?: INormeReference;
  modePassation?: IModePassation;
  modePassationId?: number;
  etapes?: IEtape[],

  debut?: Date;
  fin?: Date;
  intervalle?: boolean;
  libelleDate?: string;
  duration?: number;
  progress?: number;
}

export class ReferentielDelai implements IReferentielDelai {
  constructor(
    public id?: number,
    public observation?: string,
    public deleted?: boolean,
    public etape?: IEtape,
    public acteur?: IActeur,
    public modePassation?: IModePassation,
    public modePassationId?: number,
    public debut?: Date,
    public fin?: Date,
    public intervalle?: boolean,
    public normeReference?: INormeReference,
    public etapes?: IEtape[],
    public libelleDate?: string,
    public duration?: number,
    public progress?: number
  ) {
    this.intervalle = this.intervalle || false;
    this.deleted = this.deleted || false;
    this.duration = this.duration || 0;
    this.progress = this.progress || 0;
  }
}
