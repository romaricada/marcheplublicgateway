import {ILot} from 'app/shared/model/microservicedaccam/lot.model';
import {IFichier} from 'app/entities/file-manager/file-menager.model';
import {IBesoinLigneBudgetaire} from "app/shared/model/microserviceppm/besoin-ligne-budgetaire.model";

export interface IAvisDac {
  id?: number;
  numeroAvis?: string;
  objet?: string;
  exerciceId?: number;
  activiteId?: number;
  deleted?: boolean;
  modePassationId?: number;
  dateLancement?: Date;
  dateDepotOffre?: Date;
  besionLigneBugetaitaireIds?: number[];
  validite?: number;
  lots?: ILot[];
  listelots?: ILot[];
  listebudgets?: IBesoinLigneBudgetaire[];
  files?: IFichier[];
  nomAvisDac?: string;
  etatAvancement?: number,
  lotInfoDTOS?: any[];
  taches?: any[];
  etatMarche?: any;

}

export class AvisDac implements IAvisDac {
  constructor(
    public id?: number,
    public numeroAvis?: string,
    public objet?: string,
    public activiteId?: number,
    public exerciceId?: number,
    public deleted?: boolean,
    public modePassationId?: number,
    public dateLancement?: Date,
    public dateDepotOffre?: Date,
    public besionLigneBugetaitaireIds?: number[],
    public validite?: number,
    public lots?: ILot[],
    public listelots?: ILot[],
    public listebudgets?: IBesoinLigneBudgetaire[],
    public files?: IFichier[],
    public nomAvisDac?: string,
    public etatAvancement?: number,
    public lotInfoDTOS?: any[],
    public taches?: any[],
    public etatMarche?: any,
  ) {
    this.deleted = this.deleted || false;
  }
}
