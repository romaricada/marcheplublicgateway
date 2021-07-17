import { IBesoin } from 'app/shared/model/microserviceppm/besoin.model';

export interface IUniteAdministrative {
  id?: number;
  libelle?: string;
  abbreviation?: string;
  adresse?: string;
  contact?: string;
  identiteResponsable?: string;
  deleted?: boolean;
  besoins?: IBesoin[];
}

export class UniteAdministrative implements IUniteAdministrative {
  constructor(
    public id?: number,
    public libelle?: string,
    public abbreviation?: string,
    public adresse?: string,
    public contact?: string,
    public identiteResponsable?: string,
    public deleted?: boolean,
    public besoins?: IBesoin[]
  ) {
    this.deleted = this.deleted || false;
  }
}
