import {Injectable} from '@angular/core';
import {EventSkillCloneRequest, Skill, SkillRequest} from '../../types/skill';
import {
  FetchParams,
  FULL, HttpUtil,
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
import {environment} from '../../environments/environment';
import {share} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SkillService extends WsService<Skill> {

  constructor(private http: HttpClient) {
    super();
  }

  fetch(eventId: number, skillId: number, rOpt?: RequestOptions): Observable<Skill>;
  fetch(eventId: number, skillId: number, params: FetchParams, rOpt?: RequestOptions): Observable<Skill>;
  fetch(eventId: number, skillId: number, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Skill>;
  fetch(eventId: number, skillId: number, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Skill>;
  fetch(eventId: number, skillId: number, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<Skill> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.get<Skill>(
      requestOptions.url ?? `${environment.worldskillsApiEvents}/${eventId}/skills/${skillId}`, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  create(eventId: number, skillRequest: SkillRequest, rOpt?: RequestOptions): Observable<Skill>;
  create(eventId: number, skillRequest: SkillRequest, params: FetchParams, rOpt?: RequestOptions): Observable<Skill>;
  create(eventId: number, skillRequest: SkillRequest, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Skill>;
  create(eventId: number, skillRequest: SkillRequest, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Skill>;
  create(eventId: number, skillRequest: SkillRequest, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<Skill> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.post<Skill>(
      requestOptions.url ?? `${environment.worldskillsApiEvents}/${eventId}/skills`, skillRequest, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  update(eventId: number, skillId: number, skillRequest: SkillRequest, rOpt?: RequestOptions): Observable<Skill>;
  update(eventId: number, skillId: number, skillRequest: SkillRequest, params: FetchParams, rOpt?: RequestOptions): Observable<Skill>;
  update(eventId: number, skillId: number, skillRequest: SkillRequest, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Skill>;
  update(eventId: number, skillId: number, skillRequest: SkillRequest, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Skill>;
  update(
    eventId: number, skillId: number,
    skillRequest: SkillRequest,
    p1: WsServiceRequestP1,
    p2?: WsServiceRequestP2,
    p3?: WsServiceRequestP3
  ): Observable<Skill> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.put<Skill>(
      requestOptions.url ?? `${environment.worldskillsApiEvents}/${eventId}/skills/${skillId}`, skillRequest, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  delete(eventId: number, skillId: number, rOpt?: RequestOptions): Observable<Skill>;
  delete(eventId: number, skillId: number, params: FetchParams, rOpt?: RequestOptions): Observable<Skill>;
  delete(eventId: number, skillId: number, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Skill>;
  delete(eventId: number, skillId: number, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Skill>;
  delete(eventId: number, skillId: number, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<Skill> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, NO_SUBJECT);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.delete<Skill>(
      requestOptions.url ?? `${environment.worldskillsApiEvents}/${eventId}/skills/${skillId}`, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  copySkill(eventId: number, skillId: number, cloneRequest: EventSkillCloneRequest, rOpt?: RequestOptions): Observable<Skill>;
  copySkill(eventId: number, skillId: number, cloneRequest: EventSkillCloneRequest, params: FetchParams, rOpt?: RequestOptions): Observable<Skill>;
  copySkill(eventId: number, skillId: number, cloneRequest: EventSkillCloneRequest, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Skill>;
  copySkill(eventId: number, skillId: number, cloneRequest: EventSkillCloneRequest, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Skill>;
  copySkill(eventId: number, skillId: number, cloneRequest: EventSkillCloneRequest, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<Skill> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, NO_SUBJECT);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.post<Skill>(
      requestOptions.url ?? `${environment.worldskillsApiEvents}/${eventId}/skills/${skillId}/clone`, cloneRequest, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }
}
