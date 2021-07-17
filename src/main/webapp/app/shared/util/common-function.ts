import {IBesoinLigneBudgetaire} from 'app/shared/model/microserviceppm/besoin-ligne-budgetaire.model';
import {
    ILigneBudgetaireContrat
} from 'app/shared/model/microserviceexecution/ligne-budgetaire-contrat.model';
import {IEngagement} from 'app/shared/model/microserviceexecution/engagement.model';

export function soldeTotal(tabs: number[]): number {
    let total = 0;
    tabs.forEach(t => {
        total += t;
    });
    return total;
}

export function getLigneCredit(ligneCredits: Array<IBesoinLigneBudgetaire>, contraLignesCredit: Array<ILigneBudgetaireContrat>): ILigneBudgetaireContrat[] {
    const lignes: ILigneBudgetaireContrat[] = [];
    if (contraLignesCredit) {
        contraLignesCredit.forEach(l => {
            const newLigne = ligneCredits.find(v => v.ligneBudgetId === l.ligneBudgetaireId);
            if (newLigne) {
                newLigne.id = l.id;
                lignes.push(newLigne);
            }
        });
    }
    /* if (lignes) {
        lignes.forEach(v => {
            v.totalDisponible = v.montantEstime;
        })
    } */
    return lignes;
}

/**
 * Return engagement by ligne.
 * @param idLigne
 * @param engagements
 */
export function engagementByLigne(idLigne: number, engagements: Array<IEngagement>): IEngagement[] {
    return engagements.filter(v => v.ligneBudgetaireContratId === idLigne);
}

/**
 * Return montant déjà engage sur une ligne.
 * @param items
 * @param engagements
 */
export function montantDjaEngager(items: Array<ILigneBudgetaireContrat>, engagements: Array<IEngagement>): ILigneBudgetaireContrat[] {
    items.forEach(e => {
        e.totalEngage = soldeTotal(engagementByLigne(e.id, engagements)
            .map(v => v.montantEngage));
    });
    window.console.log('======items======={}');
    window.console.log(items);
    window.console.log('======items======={}');
    return items;
}


/**
 * Méthode pour mèttre à jour le montant engager sur une ligne.
 * @param engagement
 * @param items
 */
export function setMontantEngager(engagement: IEngagement, items: Array<ILigneBudgetaireContrat>): ILigneBudgetaireContrat[] {
    items.forEach(v => {
        if (engagement.ligneBudgetaireContratId === v.id) {
            v.montantEngage = engagement.montantEngage;
            v.selected = true;
        } else {
            v.selected = false;
        }
    });
    return items;
}

export function setMontDisonible() {

}
