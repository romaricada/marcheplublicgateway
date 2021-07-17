import {TypeOs} from "app/shared/model/enumerations/TypeOs";
import {EtatOs} from "app/shared/model/enumerations/EtatOs";
import {IContrat} from "app/shared/model/microserviceexecution/contrat.model";
import {Moment} from "moment";
import {IFichier} from "app/entities/file-manager/file-menager.model";

export interface IOrdreService {
  // delete(ordreDeServiceSelected: IOrdreService[]);
  id?: number;
  libelle?: string;
  deleted?: boolean;
  type?: TypeOs;
  etat?: EtatOs;
  delai?: number;
  NumeroOs?: number;
  numeroOs1?: number;
  dateDemarrage?: Moment;
  dateFin?: Moment;
  contratId?: number;
  contrats?: IContrat[];
  files?: IFichier[];
  contrat?: IContrat
}

export class OrdreService implements IOrdreService {
  constructor(
    public id?: number,
    public libelle?: string,
    public deleted?: boolean,
    public type?: TypeOs,
    public etat?: EtatOs,
    public delai?: number,
    public NumeroOs?: number,
    public numeroOs1?: number,
    public dateDemarrage?: Moment,
    public dateFin?: Moment,
    public contratId?: number,
    public files?: IFichier[],
    public contrats?: IContrat[],
    public contrat?: IContrat

  ) {
    this.deleted = this.deleted || false;
  }
}
