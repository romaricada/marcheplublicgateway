import {WordFlow} from 'app/shared/model/microserviceexecution/word-flow';

export function messageWordFlow(wordflow: string): string {
    let message = '';
    switch (wordflow) {
        case WordFlow.AVANT_PROJET:
            message = 'Avant projet';
            break;
        case WordFlow.TRANS_SOUMISSIONNAIRE:
            message = 'transmis au titulaire';
            break;
        case WordFlow.RECEPTION_CONTRAT:
            message = 'Receptionné';
            break;
        case WordFlow.APPROUVER:
            message = 'Approuvé';
            break;
        case WordFlow.ENGAGEMENT:
            message = 'Engager';
            break;
        case WordFlow.CREATION_LIQUIDATION:
            message = 'Nouveau';
            break;
        case WordFlow.VISA_LIQ_ORDONNATEUR:
            message = 'Validé par l\'ordonateur';
            break;
        case WordFlow.VISA_LIQ_CONTROLEUR:
            message = 'Validé par le contrôle'
            break;
        case WordFlow.VISA_CONTROLEUR:
            message = 'Au contrôle';
            break;
        case WordFlow.VISA_ORDONNATEUR:
            message = 'A l\'ordonnancement';
            break;
        case WordFlow.LIQUIDER:
            message ='Liquidé';
            break;
        case WordFlow.REJETER:
            message = 'Rejeté';
            break;
        case WordFlow.VALIDER:
            message = 'Validé';
            break;
    }
    return message;
}
