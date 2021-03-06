import {Injectable} from '@angular/core';
import {SkillList} from '../../types/skill';
import {
  FetchParams,
  FULL,
  HttpUtil,
  MulticastOptions,
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

export interface SkillsFetchParams extends FetchParams {
  sector?: number;
}

export const DEFAULT_FETCH_PARAMS: SkillsFetchParams = {
  limit: 9999,
  offset: 0,
};

@Injectable({
  providedIn: 'root'
})
export class SkillsService extends WsService<SkillList, SkillsFetchParams> {

  constructor(private http: HttpClient) {
    super();
  }

  fetch(eventId: number, rOpt?: RequestOptions): Observable<SkillList>;
  fetch(eventId: number, params: SkillsFetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<SkillList>;
  fetch(eventId: number, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<SkillList> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL, DEFAULT_FETCH_PARAMS);
    let params = HttpUtil.objectToParams(fetchParams || {});
    if (fetchParams.sector) {
      params = params.set('sector', fetchParams.sector.toString());
    }
    const observable = this.http.get<SkillList>(
      requestOptions.url ?? `${environment.worldskillsApiEvents}/${eventId}/skills`, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

}
