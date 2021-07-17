import {JhiDataUtils} from 'ng-jhipster';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class DataUtils {
  constructor(
    protected jhiDataUtils?: JhiDataUtils
  ) {}

  setFileData(event, entity, field, isImage, index: number) {
    return new Promise((resolve, reject) => {
      if (event.target.files.length > 0 && event.target.files[index]) {
        const file = event.target.files[index];
        if (isImage && !file.type.startsWith('image/')) {
          reject(`File was expected to be an image but was found to be ${file.type}`);
        } else {
          this.jhiDataUtils.toBase64(file, base64Data => {
            entity[field] = base64Data;
            entity[`${field}ContentType`] = file.type;
            resolve(entity);
          });
        }
      } else {
        reject(`Base64 data was not set as file could not be extracted from passed parameter: ${event}`);
      }
    });
  }
}
