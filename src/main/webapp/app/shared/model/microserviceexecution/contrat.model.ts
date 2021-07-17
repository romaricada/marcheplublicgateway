import {Moment} from 'moment';
import {IStatutExecution} from 'app/shared/model/microserviceexecution/statut-execution.model';
import {IPenalite} from 'app/shared/model/microserviceexecution/penalite.model';
import {IContentieux} from 'app/shared/model/microserviceexecution/contentieux.model';
import {IAvenant} from 'app/shared/model/microserviceexecution/avenant.model';
import {IEtapeExecution} from 'app/shared/model/microserviceexecution/etape-execution.model';
import {ILiquidation} from 'app/shared/model/microserviceexecution/liquidation.model';
import {IFichier} from 'app/entities/file-manager/file-menager.model';
import {
    ILigneBudgetaireContrat
} from 'app/shared/model/microserviceexecution/ligne-budgetaire-contrat.model';
import {ILigneBudgetaire} from "app/shared/model/microserviceppm/ligne-budgetaire.model";

export interface IContrat {
    id?: number;
    reference?: string;
    dateApprobation?: Moment;
    candidatLotId?: number;
    cautionCandidatLotId?: number;
    resilierContrat?: boolean;
    deleted?: boolean;
    statutExecutions?: IStatutExecution[];
    penalites?: IPenalite[];
    contentieuxs?: IContentieux[];
    avenants?: IAvenant[];
    etapeExecutions?: IEtapeExecution[];
    liquidations?: ILiquidation[];
    files?: IFichier[];
    ligneBudgetaireContrats?: ILigneBudgetaireContrat[];
    ligneBudgetaires?: ILigneBudgetaire[];
    candidatLotsId?: Array<number>;
    candidaId?: number;
    avisDacId?: number;
    delaisExecution?: number;
    sourceFinancement?: string;
    natureMarche?: string;
    avisDacNumero?: string;
    avisDacLibelle?: string;
    montant?: number;
    exerciceId?: number;
    lotId?: number;
    dateSignatureSoumissionnaire?: Moment;
    dateDemarrage?: Moment;
    numeroCompte?: string;
    cleRib?: string;
    libelleBanque?: string;
    wordFlow?: string;
    etapeContrat?: string;
    dateReceptionGC?: Moment;
}

export class Contrat implements IContrat {
    constructor(
        public id?: number,
        public reference?: string,
        public dateApprobation?: Moment,
        public dateSignatureSoumissionnaire?: Moment,
        public dateDemarrage?: Moment,
        public candidatLotId?: number,
        public cautionCandidatLotId?: number,
        public resilierContrat?: boolean,
        public deleted?: boolean,
        public statutExecutions?: IStatutExecution[],
        public penalites?: IPenalite[],
        public contentieuxs?: IContentieux[],
        public avenants?: IAvenant[],
        public etapeExecutions?: IEtapeExecution[],
        public liquidations?: ILiquidation[],
        public files?: IFichier[],
        public ligneBudgetaireContrats?: ILigneBudgetaireContrat[],
        public ligneBudgetaires?: ILigneBudgetaire[],
        public candidatLotsId?: Array<number>,
        public candidaId?: number,
        public avisDacId?: number,
        public delaisExecution?: number,
        public sourceFinancement?: string,
        public natureMarche?: string,
        public avisDacLibelle?: string,
        public avisDacNumero?: string,
        public lotId?: number,
        public montant?: number,
        public wordFlow?: string,
        public etapeContrat?: string,
        public dateReceptionGC?: Moment,
    ) {
        this.resilierContrat = this.resilierContrat || false;
        this.deleted = this.deleted || false;
    }
}
