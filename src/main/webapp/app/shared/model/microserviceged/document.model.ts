import {Moment} from 'moment';
import {IEntrepot} from 'app/shared/model/microserviceged/entrepot.model';
import {ITypeArchive} from 'app/shared/model/microserviceged/type-archive.model';
import {ITypeDocument} from 'app/shared/model/microserviceged/type-document.model';
import {IFichier} from "app/entities/file-manager/file-menager.model";

export interface IDocument {
  id?: number;
  libelle?: string;
  entrepotId?: number;
  typeArchivageId?: number;
  typeDocumentId?: number;
  code?: string;
  date?: Moment;
  typeArchive?: ITypeArchive
  uniteAdministrativeId?: number;
  deleted?: boolean;
  dataFile?: IFichier;
  entrepot?: IEntrepot;
  typeDocument?: ITypeDocument;
}

export class Document implements IDocument {
  constructor(
    public id?: number,
    public libelle?: string,
    public entrepotId?: number,
    public typeArchivageId?: number,
    public typeDocumentId?: number,
    public code?: string,
    public date?: Moment,
    public typeArchive?: ITypeArchive,
    public uniteAdministrativeId?: number,
    public deleted?: boolean,
    public dataFile?: IFichier,
    public entrepot?: IEntrepot,
    public typeDocument?: ITypeDocument
  ) {
    this.deleted = this.deleted || false;
  }
}
