import {
    ActionReducer,
    ActionReducerMap,
    MetaReducer
} from '@ngrx/store';
import {environment} from 'app/environments/environment';
import * as mReducer from 'app/store/reducers/reducer';
import {MarchePublicState} from 'app/store/store.state';


export interface State {
    marchePublicState: MarchePublicState
}

export const reducers: ActionReducerMap<State> = {
    marchePublicState: mReducer.marchePublicReducer,
};

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

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
    return (state: State, action: any): State => {
        window.console.log('state', state);
        window.console.log('action', action);
        return reducer(state, action);
    };
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
