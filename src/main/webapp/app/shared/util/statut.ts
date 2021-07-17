import {HttpErrorResponse} from '@angular/common/http';

export interface Status {
    status: StatusEnum;
    message: string;
    reset?: boolean;
    params?: any;
}

export enum StatusEnum {
    error = 'error',
    success = 'success',
    warning = 'warn'
}

export function objectResponseMessage(error: HttpErrorResponse): string {
    let message = '';
    switch (error.status) {
        case 200 :
            message = 'Opération reussie !';
            break;
        case 404 || 409:
            message = error.error.message;
            break;
        case 500:
            message = 'Erreur de connection. Veuillez Contacter l\'administrateur.';
            break;
        default:
            message = 'Erreur de connection. Veuillez Contacter l\'administrateur.';
            break;
    }
    return message;
}
