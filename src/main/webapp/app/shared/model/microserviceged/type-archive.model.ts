import { IDocument } from 'app/shared/model/microserviceged/document.model';

export interface ITypeArchive {
  id?: number;
  libelle?: string;
  deleted?: boolean;
  documents?: IDocument[];
}

export class TypeArchive implements ITypeArchive {
  constructor(public id?: number, public libelle?: string, public deleted?: boolean, public documents?: IDocument[]) {
    this.deleted = this.deleted || false;
  }
}
