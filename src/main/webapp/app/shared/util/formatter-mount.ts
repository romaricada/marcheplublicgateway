import {Pipe, PipeTransform} from '@angular/core';
import {removeBlanks} from 'app/shared/util/removeBlank';

@Pipe({
    name: 'formatTableValue'
})
export class FormatTableValuePipe implements PipeTransform {
    transform(value: any, type: string, formatInput?: boolean): string {
        if (value) {
            if (type === 'number') {
                if (formatInput && typeof value === 'string') {
                    value = removeBlanks(value);
                }
                let retValue = Number(value).toLocaleString('fr-FR');
                if (retValue === 'NaN') {
                    retValue = '';
                }
                return retValue;
            } else {
                return value;
            }
        } else {
            return value;
        }
    }
}
