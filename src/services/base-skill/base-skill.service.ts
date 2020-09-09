import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {
  FULL,
  HttpUtil,
  RequestOptions,
  WsService,
  WsServiceRequestP1,
  WsServiceRequestP2,
  WsServiceRequestP3
} from '@worldskills/worldskills-angular-lib';
import {Observable} from 'rxjs';
import {BaseSkill, BaseSkillRequest} from '../../types/base-skill';
import {environment} from '../../environments/environment';
import {share} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BaseSkillService extends WsService<BaseSkill> {

  constructor(private http: HttpClient) {
    super();
  }

  fetch(baseSkillId: number, rOpt?: RequestOptions): Observable<BaseSkill>;
  fetch(baseSkillId: number, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<BaseSkill> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.get<BaseSkill>(
      requestOptions.url ?? `${environment.worldskillsApiEvents}/base_skills/${baseSkillId}`, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  update(baseSkillId: number, baseSkill: BaseSkillRequest, rOpt?: RequestOptions): Observable<BaseSkill>;
  update(baseSkillId: number, baseSkill: BaseSkillRequest, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<BaseSkill> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.put<BaseSkill>(
      requestOptions.url ?? `${environment.worldskillsApiEvents}/base_skills/${baseSkillId}`, baseSkill, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

}
