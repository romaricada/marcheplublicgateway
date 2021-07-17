import {Injectable} from '@angular/core';
import {ExerciceBudgetaireService} from 'app/entities/microserviceppm/exercice-budgetaire/exercice-budgetaire.service';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {fetchExerciceCourant, setExerciceCourant} from 'app/store/action';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable()
export class MarchePublicEffect {
    constructor(
        private actions$: Actions,
        private exerciceBudgetaireService: ExerciceBudgetaireService
    ) {}

    fetchExerciceCourant$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchExerciceCourant),
            mergeMap(() => this.exerciceBudgetaireService.storeCurrentExercice()
                .pipe(map(resp => setExerciceCourant(resp)),
                    catchError(error => of(error))
                )
            )
        ));
}
