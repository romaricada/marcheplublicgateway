import {createAction, props} from '@ngrx/store';
import {IExerciceBudgetaire} from 'app/shared/model/microserviceppm/exercice-budgetaire.model';
import {Status} from 'app/store/reducers';

export const SetStatus = createAction('[Status] Set Status',
    props<Status>());
export const ClearMarchePublicState = createAction('[Marche-Public] Clear Marche State');

export const fetchExerciceCourant = createAction('[Exercice Component] Fetch Exercice');

export const setExerciceCourant = createAction('[Exercice Component] Set Exercice',
    props<IExerciceBudgetaire>());
