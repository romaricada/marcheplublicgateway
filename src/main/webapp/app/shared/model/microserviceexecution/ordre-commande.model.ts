import {IContrat} from "app/shared/model/microserviceexecution/contrat.model";
import {Moment} from "moment";
import {IFichier} from "app/entities/file-manager/file-menager.model";
import {IAvenant} from "app/shared/model/microserviceexecution/avenant.model";
import {TypeOrdreCommande} from "app/shared/model/enumerations/TypeOrdreCommande";

export interface IOrdreCommande {
  id?: number;
  reference?: string;
  resilier?: boolean;
  dateSignature?: Moment;
  dateDebutPrevu?: Moment;
  dateFinPrevu?: Moment;
  deleted?: boolean;
  contratId?: number;
  avenantId?: number;
  files?: IFichier[];
  contrat?: IContrat;
  avenant?: IAvenant;
  typeOrdreCommande?: TypeOrdreCommande;
}

export class OrdreCommande implements IOrdreCommande {
  constructor(
    public id?: number,
    public reference?: string,
    public resilier?: boolean,
    public dateSignature?: Moment,
    public dateDebutPrevu?: Moment,
    public dateFinPrevu?: Moment,
    public deleted?: boolean,
    public contratId?: number,
    public avenantId?: number,
    public files?: IFichier[],
    public contrat?: IContrat,
    public avenant?: IAvenant,
    public typeOrdreCommande?: TypeOrdreCommande,

  ) {
    this.deleted = this.deleted || false;
    this.resilier = this.resilier || false;
  }
}
