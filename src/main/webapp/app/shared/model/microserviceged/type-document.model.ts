import { IDocument } from 'app/shared/model/microserviceged/document.model';

export interface ITypeDocument {
  id?: number;
  libelle?: string;
  deleted?: boolean;
  documents?: IDocument[];
}

export class TypeDocument implements ITypeDocument {
  constructor(public id?: number, public libelle?: string, public deleted?: boolean, public documents?: IDocument[]) {
    this.deleted = this.deleted || false;
  }
}
