import {IBesoinLigneBudgetaire} from 'app/shared/model/microserviceppm/besoin-ligne-budgetaire.model';
import {IPpmActivite} from 'app/shared/model/microserviceppm/ppm-activite.model';
import {IModePassation} from 'app/shared/model/microserviceppm/mode-passation.model';
import {INaturePrestation} from 'app/shared/model/microserviceppm/nature-prestation.model';
import {IBesoin} from 'app/shared/model/microserviceppm/besoin.model';
import {IReferentielDelai} from 'app/shared/model/microserviceppm/referentiel-delai.model';
import {IPPM} from './ppm.model';
import {ILigneBudgetaire} from "app/shared/model/microserviceppm/ligne-budgetaire.model";

export interface IActivite {
  id?: number;
  codeLignePlan?: string;
  gestionnaireCredit?: string;
  deleted?: boolean;
  reported?: boolean;
  besoinLignes?: IBesoinLigneBudgetaire[];
  ppmActivites?: IPpmActivite[];
  ppmActivite?: IPpmActivite;
  passationId?: number;
  passation?: IModePassation;
  naturePrestation?: INaturePrestation;
  modePassationLibelle?: string;
  naturePrestationId?: number;
  naturePrestationLibelle?: string;
  programme?: string;
  total?: number;
  besoins?: IBesoin[];
  referentielDelais?: IReferentielDelai[];
  ppm?: IPPM;
  modePassation?: IModePassation;
  nomActivite?: string;
  etatAvancement?: number,
  lotInfoDTOS?: any[];
  taches?: any[];
  ligneBudgetaire?: ILigneBudgetaire;
  etatMarche?: any;
}

export class Activite implements IActivite {
  constructor(
    public id?: number,
    public codeLignePlan?: string,
    public gestionnaireCredit?: string,
    public deleted?: boolean,
    public reported?: boolean,
    public besoinLignes?: IBesoinLigneBudgetaire[],
    public ppmActivites?: IPpmActivite[],
    public passationId?: number,
    public modePassationLibelle?: string,
    public naturePrestationId?: number,
    public naturePrestationLibelle?: string,
    public programme?: string,
    public total?: number,
    public besoins?: IBesoin[],
    public referentielDelais?: IReferentielDelai[],
    public ppm?: IPPM,
    public modePassation?: IModePassation,
    public nomActivite?: string,
    public etatAvancement?: number,
    public lotInfoDTOS?: any[],
    public taches?: any[],
    public etatMarche?: any,
    public ligneBudgetaire?: ILigneBudgetaire
  ) {
    this.deleted = this.deleted || false;
  }
}
