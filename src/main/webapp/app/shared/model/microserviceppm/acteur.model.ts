import { IReferentielDelai } from 'app/shared/model/microserviceppm/referentiel-delai.model';

export interface IActeur {
  id?: number;
  libelle?: string;
  nom?: string;
  prenom?: string;
  mail?: string;
  contact?: string;
  deleted?: boolean;
  referentielDelais?: IReferentielDelai[];
  userId?: number;
  user?: Account;
}

export class Acteur implements IActeur {
  constructor(
    public id?: number,
    public libelle?: string,
    public nom?: string,
    public prenom?: string,
    public mail?: string,
    public contact?: string,
    public deleted?: boolean,
    public referentielDelais?: IReferentielDelai[],
    public userId?: number,
    public user?: Account
  ) {
    this.deleted = this.deleted || false;
  }
}
