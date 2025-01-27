import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  FULL,
  HttpUtil,
  NO_SUBJECT,
  RequestOptions,
  WsService,
  WsServiceRequestP1,
  WsServiceRequestP2,
  WsServiceRequestP3
} from '@worldskills/worldskills-angular-lib';
import {Observable} from 'rxjs';
import {Tag} from '../../types/tag';
import {environment} from '../../environments/environment';
import {share} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TagService extends WsService<Tag> {

  constructor(private http: HttpClient) {
    super();
  }

  fetch(eventId: number, tagId: number, rOpt?: RequestOptions): Observable<Tag>;
  fetch(eventId: number, tagId: number, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<Tag> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.get<Tag>(
      requestOptions.url ?? `${environment.worldskillsApiEvents}/${eventId}/skill_tags/${tagId}`, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  create(eventId: number, tag: Tag, rOpt?: RequestOptions): Observable<Tag>;
  create(eventId: number, tag: Tag, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<Tag> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.post<Tag>(
      requestOptions.url ?? `${environment.worldskillsApiEvents}/${eventId}/skill_tags`, tag, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  update(eventId: number, tagId: number, tag: Tag, rOpt?: RequestOptions): Observable<Tag>;
  update(eventId: number, tagId: number, tag: Tag, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<Tag> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.put<Tag>(
      requestOptions.url ?? `${environment.worldskillsApiEvents}/${eventId}/skill_tags/${tagId}`, tag, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  delete(eventId: number, tagId: number, rOpt?: RequestOptions): Observable<Tag>;
  delete(eventId: number, tagId: number, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<Tag> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, NO_SUBJECT);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.delete<Tag>(
      requestOptions.url ?? `${environment.worldskillsApiEvents}/${eventId}/skill_tags/${tagId}`, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

}
