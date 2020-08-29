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
import {Photo, PhotoRequest} from "../../types/photo";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {share} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SkillPhotoService extends WsService<Photo> {

  constructor(private http: HttpClient) {
    super();
  }

  fetch(eventId: number, skillId: number, photoId: number, rOpt?: RequestOptions): Observable<Photo>;
  fetch(eventId: number, skillId: number, photoId: number, params: FetchParams, rOpt?: RequestOptions): Observable<Photo>;
  fetch(eventId: number, skillId: number, photoId: number, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Photo>;
  fetch(eventId: number, skillId: number, photoId: number, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Photo>;
  fetch(eventId: number, skillId: number, photoId: number, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<Photo> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.get<Photo>(
      requestOptions.url ?? `${environment.worldskillsApiEvents}/${eventId}/skills/${skillId}/photos/${photoId}`, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  create(eventId: number, skillId: number, photoRequest: PhotoRequest, rOpt?: RequestOptions): Observable<Photo>;
  create(eventId: number, skillId: number, photoRequest: PhotoRequest, params: FetchParams, rOpt?: RequestOptions): Observable<Photo>;
  create(eventId: number, skillId: number, photoRequest: PhotoRequest, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Photo>;
  create(eventId: number, skillId: number, photoRequest: PhotoRequest, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Photo>;
  create(eventId: number, skillId: number, photoRequest: PhotoRequest, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<Photo> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.post<Photo>(
      requestOptions.url ?? `${environment.worldskillsApiEvents}/${eventId}/skills/${skillId}/photos`, photoRequest, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  update(eventId: number, skillId: number, photoId: number, photoRequest: PhotoRequest, rOpt?: RequestOptions): Observable<Photo>;
  update(eventId: number, skillId: number, photoId: number, photoRequest: PhotoRequest, params: FetchParams, rOpt?: RequestOptions): Observable<Photo>;
  update(eventId: number, skillId: number, photoId: number, photoRequest: PhotoRequest, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Photo>;
  update(eventId: number, skillId: number, photoId: number, photoRequest: PhotoRequest, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Photo>;
  update(
    eventId: number, skillId: number, photoId: number,
    photoRequest: PhotoRequest,
    p1: WsServiceRequestP1,
    p2?: WsServiceRequestP2,
    p3?: WsServiceRequestP3
  ): Observable<Photo> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.put<Photo>(
      requestOptions.url ?? `${environment.worldskillsApiEvents}/${eventId}/skills/${skillId}/photos/${photoId}`, photoRequest, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  delete(eventId: number, skillId: number, photoId: number, rOpt?: RequestOptions): Observable<Photo>;
  delete(eventId: number, skillId: number, photoId: number, params: FetchParams, rOpt?: RequestOptions): Observable<Photo>;
  delete(eventId: number, skillId: number, photoId: number, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Photo>;
  delete(eventId: number, skillId: number, photoId: number, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Photo>;
  delete(eventId: number, skillId: number, photoId: number, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<Photo> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, NO_SUBJECT);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.delete<Photo>(
      requestOptions.url ?? `${environment.worldskillsApiEvents}/${eventId}/skills/${skillId}/photos/${photoId}`, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

}
