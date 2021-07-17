export interface ILigneBudgetaireContrat {
    id?: number;
    contratId?: number,
    ligneBudgetaireId?: number,
    // add column
    libelleLigneBudget?: string;
    besoinLibelle?: string;
    activiteLibelle?: string;
    besoinId?: number;
    ligneBudgetId?: number;
    budget?: string;
    ligneCredit?: string;
    montantEstime?: number;
    totalEngage?: number;
    totalDisponible?: number;
    montantEngage?: number;
    montantdisponible?: number;
    montantdejaengage?: number;


    selected?: boolean;
}

export class LigneBudgetaireContrat implements ILigneBudgetaireContrat {
    constructor(
        public id?: number,
        public contratId?: number,
        public ligneBudgetaireId?: number,
        // add column
        public libelleLigneBudget?: string,
        public besoinLibelle?: string,
        public activiteLibelle?: string,
        public besoinId?: number,
        public ligneBudgetId?: number,
        public budget?: string,
        public ligneCredit?: string,
        public montantEstime?: number,
        public montantdisponible?: number,
        public montantdejaengage?: number,
        public totalEngage?: number,
        public totalDisponible?: number,
        public montantEngage?: number,
        public selected?: boolean,
    ) {
    }
}
