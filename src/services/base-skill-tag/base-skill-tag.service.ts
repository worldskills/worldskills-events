import {Injectable} from '@angular/core';
import {
  FetchParams,
  HttpUtil,
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
export class BaseSkillTagService extends WsService<void> {

  constructor(private http: HttpClient) {
    super();
  }

  bind(baseSkillId: number, tagId: number, rOpt?: RequestOptions): Observable<void>;
  bind(baseSkillId: number, tagId: number, params: FetchParams, rOpt?: RequestOptions): Observable<void>;
  bind(baseSkillId: number, tagId: number, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<void>;
  bind(baseSkillId: number, tagId: number, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<void>;
  bind(baseSkillId: number, tagId: number, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<void> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, NO_SUBJECT);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.put<void>(
      requestOptions.url ?? `${environment.worldskillsApiEvents}/base_skills/${baseSkillId}/tags/${tagId}`, {}, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  unbind(baseSkillId: number, tagId: number, rOpt?: RequestOptions): Observable<void>;
  unbind(baseSkillId: number, tagId: number, params: FetchParams, rOpt?: RequestOptions): Observable<void>;
  unbind(baseSkillId: number, tagId: number, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<void>;
  unbind(baseSkillId: number, tagId: number, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<void>;
  unbind(baseSkillId: number, tagId: number, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<void> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, NO_SUBJECT);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.delete<void>(
      requestOptions.url ?? `${environment.worldskillsApiEvents}/base_skills/${baseSkillId}/tags/${tagId}`, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

}
