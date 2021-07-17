import { IEntrepot } from 'app/shared/model/microserviceged/entrepot.model';

export interface ILocale {
  id?: number;
  libelle?: string;
  adresseLocale?: string;
  deleted?: boolean;
  entrepots?: IEntrepot[];
}

export class Locale implements ILocale {
  constructor(
    public id?: number,
    public libelle?: string,
    public adresseLocale?: string,
    public deleted?: boolean,
    public entrepots?: IEntrepot[]
  ) {
    this.deleted = this.deleted || false;
  }
}
