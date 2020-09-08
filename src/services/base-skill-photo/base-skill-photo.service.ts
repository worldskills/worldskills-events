import {Injectable} from '@angular/core';
import {
  FetchParams,
  FULL,
  HttpUtil,
  MulticastOptions,
  NO_SUBJECT,
  RequestOptions,
  WsService,
  WsServiceRequestP1,
  WsServiceRequestP2,
  WsServiceRequestP3
} from "@worldskills/worldskills-angular-lib";
import {Photo} from "../../types/photo";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {share} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BaseSkillPhotoService extends WsService<Photo> {

  constructor(private http: HttpClient) {
    super();
  }

  fetch(baseSkillId: number, photoId: number, rOpt?: RequestOptions): Observable<Photo>;
  fetch(baseSkillId: number, photoId: number, params: FetchParams, rOpt?: RequestOptions): Observable<Photo>;
  fetch(baseSkillId: number, photoId: number, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Photo>;
  fetch(baseSkillId: number, photoId: number, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Photo>;
  fetch(baseSkillId: number, photoId: number, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<Photo> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.get<Photo>(
      requestOptions.url ?? `${environment.worldskillsApiEvents}/base_skills/${baseSkillId}/photos/${photoId}`, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  create(baseSkillId: number, photoRequest: Photo, rOpt?: RequestOptions): Observable<Photo>;
  create(baseSkillId: number, photoRequest: Photo, params: FetchParams, rOpt?: RequestOptions): Observable<Photo>;
  create(baseSkillId: number, photoRequest: Photo, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Photo>;
  create(baseSkillId: number, photoRequest: Photo, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Photo>;
  create(baseSkillId: number, photoRequest: Photo, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<Photo> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.post<Photo>(
      requestOptions.url ?? `${environment.worldskillsApiEvents}/base_skills/${baseSkillId}/photos`, photoRequest, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  update(baseSkillId: number, photoId: number, photoRequest: Photo, rOpt?: RequestOptions): Observable<Photo>;
  update(baseSkillId: number, photoId: number, photoRequest: Photo, params: FetchParams, rOpt?: RequestOptions): Observable<Photo>;
  update(baseSkillId: number, photoId: number, photoRequest: Photo, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Photo>;
  update(baseSkillId: number, photoId: number, photoRequest: Photo, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Photo>;
  update(
    baseSkillId: number, photoId: number,
    photoRequest: Photo,
    p1: WsServiceRequestP1,
    p2?: WsServiceRequestP2,
    p3?: WsServiceRequestP3
  ): Observable<Photo> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.put<Photo>(
      requestOptions.url ?? `${environment.worldskillsApiEvents}/base_skills/${baseSkillId}/photos/${photoId}`, photoRequest, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  delete(baseSkillId: number, photoId: number, rOpt?: RequestOptions): Observable<Photo>;
  delete(baseSkillId: number, photoId: number, params: FetchParams, rOpt?: RequestOptions): Observable<Photo>;
  delete(baseSkillId: number, photoId: number, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Photo>;
  delete(baseSkillId: number, photoId: number, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Photo>;
  delete(baseSkillId: number, photoId: number, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<Photo> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, NO_SUBJECT);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.delete<Photo>(
      requestOptions.url ?? `${environment.worldskillsApiEvents}/base_skills/${baseSkillId}/photos/${photoId}`, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

}
