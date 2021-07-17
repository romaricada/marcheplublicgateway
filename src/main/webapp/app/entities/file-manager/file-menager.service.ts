import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {SERVER_API_URL} from 'app/app.constants';
import {createRequestOption} from 'app/shared/util/request-util';
import {TypeDossier} from 'app/shared/model/enumerations/typeDossier';

@Injectable({providedIn: 'root'})
export class FileMenagerService {
  public resourceUrl = SERVER_API_URL + 'services/microservicedaccam/api/files';
  public resourceArchiveUrl = SERVER_API_URL + 'services/microserviceged/api/files';

  constructor(protected http: HttpClient) {
  }

  uploadeFiles(files: FileList, id: number, typeDossier: TypeDossier): Observable<HttpResponse<any>> {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i], files[i].name);
    }
    const options = createRequestOption({id, typeDossier});
    return this.http.post<string>(this.resourceUrl + '/upload-files', formData, {
      responseType: 'json',
      params: options,
      observe: 'response'
    });
  }

  loadArchiveFile(file: File, id: number,): Observable<HttpResponse<any>> {
    const formData = new FormData();
    formData.append('file', file);
    const options = createRequestOption({id});
    return this.http.post<string>(this.resourceArchiveUrl + '/file', formData, {
      responseType: 'json', params: options, observe: 'response'
    });
  }

  /* getArchiveFiles(id: number): Observable<HttpResponse<any>> {
    const options = createRequestOption({id});
    return this.http.get<string>(this.resourceArchiveUrl + '/file-liste', {
      params: options,
      observe: 'response'
    });
  } */

  /* getFiles(id: number, typeDossier: TypeDossier): Observable<HttpResponse<any>> {
    const options = createRequestOption({id, typeDossier});
    return this.http.get<string>(this.resourceUrl + '/file-liste', {
      params: options,
      observe: 'response'
    });
  } */

  deleteFile(id: number, typeDossier: TypeDossier, fileName: String): Observable<HttpResponse<any>> {
    const options = createRequestOption({id, typeDossier, fileName});
    return this.http.get(this.resourceUrl + '/delete', {
      params: options, observe: 'response'
    });
  }
}
