import {State} from 'app/store/reducers';


export const selectetExerciceCourant = (state: State) => state.marchePublicState.selectedExercice;
