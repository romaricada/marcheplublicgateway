import { IPpmActivite } from 'app/shared/model/microserviceppm/ppm-activite.model';
import { TypeRelationPartenaire } from 'app/shared/model/enumerations/type-relation-partenaire.model';

export interface ISourceFinancement {
  id?: number;
  code?: string;
  libelle?: string;
  codePays?: string;
  description?: string;
  type?: TypeRelationPartenaire;
  deleted?: boolean;
  ppmActivites?: IPpmActivite[];
}

export class SourceFinancement implements ISourceFinancement {
  constructor(
    public id?: number,
    public code?: string,
    public libelle?: string,
    public codePays?: string,
    public description?: string,
    public type?: TypeRelationPartenaire,
    public deleted?: boolean,
    public ppmActivites?: IPpmActivite[]
  ) {
    this.deleted = this.deleted || false;
  }
}
