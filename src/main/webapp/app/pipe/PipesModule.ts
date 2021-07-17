import { NgModule } from '@angular/core';
import {BeginLowerCasePipe} from 'app/pipe/begin-lower-case.pipe';

@NgModule({
    declarations: [BeginLowerCasePipe],
    exports: [BeginLowerCasePipe],
    imports: [],
    providers: []
})
export class PipesModule {}
