import {Injectable} from '@angular/core';
import {EventSkillCloneRequest, EventSkillRequest, SkillList} from '../../types/skill';
import {
  FetchParams,
  MulticastOptions,
  NO_SUBJECT,
  RequestOptions,
  WsService,
  WsServiceRequestP1,
  WsServiceRequestP2,
  WsServiceRequestP3
} from '@worldskills/worldskills-angular-lib';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {httpParamsFromFetchParams} from '../../utils/http';
import {environment} from '../../environments/environment';
import {share} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SkillService extends WsService<SkillList> {

  constructor(private http: HttpClient) {
    super();
  }

  copySkill(eventId: number, skillId: number, cloneRequest: EventSkillCloneRequest, rOpt?: RequestOptions): Observable<SkillList>;
  copySkill(eventId: number, skillId: number, cloneRequest: EventSkillCloneRequest, params: FetchParams, rOpt?: RequestOptions): Observable<SkillList>;
  copySkill(eventId: number, skillId: number, cloneRequest: EventSkillCloneRequest, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<SkillList>;
  copySkill(eventId: number, skillId: number, cloneRequest: EventSkillCloneRequest, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<SkillList>;
  copySkill(eventId: number, skillId: number, cloneRequest: EventSkillCloneRequest, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<SkillList> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, NO_SUBJECT);
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.post<SkillList>(
      requestOptions.url ?? `${environment.worldskillsApiEvents}/${eventId}/skills/${skillId}/clone`, cloneRequest, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  bind(eventId: number, eventSkillRequest: EventSkillRequest, rOpt?: RequestOptions): Observable<SkillList>;
  bind(
    eventId: number, eventSkillRequest: EventSkillRequest, params: FetchParams, rOpt?: RequestOptions
  ): Observable<SkillList>;
  bind(
    eventId: number, eventSkillRequest: EventSkillRequest, mOpt: MulticastOptions, rOpt?: RequestOptions
  ): Observable<SkillList>;
  bind(
    eventId: number,
    eventSkillRequest: EventSkillRequest,
    params: FetchParams,
    mOpt: MulticastOptions,
    rOpt?: RequestOptions
  ): Observable<SkillList>;
  bind(
    eventId: number,
    eventSkillRequest: EventSkillRequest,
    p1: WsServiceRequestP1,
    p2?: WsServiceRequestP2,
    p3?: WsServiceRequestP3
  ): Observable<SkillList> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, NO_SUBJECT);
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.post<SkillList>(
      requestOptions.url ?? `${environment.worldskillsApiEvents}/${eventId}/skills`, eventSkillRequest, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  update(
    eventId: number, skillId: number, eventSkillRequest: EventSkillRequest, rOpt?: RequestOptions
  ): Observable<SkillList>;
  update(
    eventId: number, skillId: number, eventSkillRequest: EventSkillRequest, params: FetchParams, rOpt?: RequestOptions
  ): Observable<SkillList>;
  update(
    eventId: number, skillId: number, eventSkillRequest: EventSkillRequest, mOpt: MulticastOptions, rOpt?: RequestOptions
  ): Observable<SkillList>;
  update(
    eventId: number, skillId: number,
    eventSkillRequest: EventSkillRequest,
    params: FetchParams,
    mOpt: MulticastOptions,
    rOpt?: RequestOptions
  ): Observable<SkillList>;
  update(
    eventId: number, skillId: number,
    eventSkillRequest: EventSkillRequest,
    p1: WsServiceRequestP1,
    p2?: WsServiceRequestP2,
    p3?: WsServiceRequestP3
  ): Observable<SkillList> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, NO_SUBJECT);
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.put<SkillList>(
      requestOptions.url ?? `${environment.worldskillsApiEvents}/${eventId}/skills/${skillId}`,
      eventSkillRequest,
      {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  unbind(eventId: number, eventSkillId: number, rOpt?: RequestOptions): Observable<SkillList>;
  unbind(eventId: number, eventSkillId: number, params: FetchParams, rOpt?: RequestOptions): Observable<SkillList>;
  unbind(eventId: number, eventSkillId: number, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<SkillList>;
  unbind(
    eventId: number, eventSkillId: number, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions
  ): Observable<SkillList>;
  unbind(
    eventId: number,
    eventSkillId: number,
    p1: WsServiceRequestP1,
    p2?: WsServiceRequestP2,
    p3?: WsServiceRequestP3
  ): Observable<SkillList> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, NO_SUBJECT);
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.delete<SkillList>(
      requestOptions.url ?? `${environment.worldskillsApiEvents}/${eventId}/skills/${eventSkillId}`, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

}
