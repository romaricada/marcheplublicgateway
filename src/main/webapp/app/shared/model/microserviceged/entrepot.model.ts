import { IDocument } from 'app/shared/model/microserviceged/document.model';
import { IEntrepot } from 'app/shared/model/microserviceged/entrepot.model';
import { ILocale } from 'app/shared/model/microserviceged/locale.model';
import { ITypeEntrepot } from 'app/shared/model/microserviceged/type-entrepot.model';

export interface IEntrepot {
  id?: number;
  libelle?: string;
  deleted?: boolean;
  typeEntrepotId?: number;
  entrepotId?: number;
  documents?: IDocument[];
  entrepot?: IEntrepot;
  local?: ILocale;
  localId?: number;
  libelleLocal?: string;
  adresseLocal?: string;
  typeEntrepot?: ITypeEntrepot;
  libelleTypeEntrepot?: string;
  ordreTypeEntrepot?: string;
  entrepots?: IEntrepot[];
  typeEntrepotFils?: ITypeEntrepot;

}

export class Entrepot implements IEntrepot {
  constructor(
    public id?: number,
    public libelle?: string,
    public deleted?: boolean,
    public typeEntrepotId?: number,
    public entrepotId?: number,
    public documents?: IDocument[],
    public entrepot?: IEntrepot,
    public local?: ILocale,
    public localId?: number,
    public libelleLocal?: string,
    public adresseLocal?: string,
    public typeEntrepot?: ITypeEntrepot,
    public libelleTypeEntrepot?: string,
    public ordreTypeEntrepot?: string,
    public entrepots?: IEntrepot[],
    public typeEntrepotFils?: ITypeEntrepot
  ) {
    this.deleted = this.deleted || false;
  }
}
