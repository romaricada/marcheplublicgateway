import {MarchePublicState} from 'app/store/store.state';
import {ClearMarchePublicState, setExerciceCourant} from 'app/store/action';
import {IExerciceBudgetaire} from 'app/shared/model/microserviceppm/exercice-budgetaire.model';
import {Action, createReducer, on} from '@ngrx/store';


export const initialState: MarchePublicState = {
    selectedExercice: null
};

const marchePublicReducers = createReducer(
    initialState,
    on(ClearMarchePublicState, (state) => {
        window.console.log(state);
        return null;
    }),
    on(setExerciceCourant, (state, payload: IExerciceBudgetaire) => {
        return {
            ...state,
            selectedExercice: payload
        };
    }),
);

export function marchePublicReducer(state: any | undefined, action: Action) {
    return marchePublicReducers(state, action);
}
