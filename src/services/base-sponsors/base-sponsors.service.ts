import {Injectable} from '@angular/core';
import {
  FetchParams,
  FULL,
  HttpUtil,
  RequestOptions,
  WsService,
  WsServiceRequestP1,
  WsServiceRequestP2,
  WsServiceRequestP3
} from '@worldskills/worldskills-angular-lib';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {share} from 'rxjs/operators';
import {BaseSponsorList} from '../../types/base-sponsor';

export const DEFAULT_FETCH_PARAMS: FetchParams = {
  limit: 9999,
  offset: 0,
};

@Injectable({
  providedIn: 'root'
})
export class BaseSponsorsService extends WsService<BaseSponsorList> {

  constructor(private http: HttpClient) {
    super();
  }

  fetchByEntity(entityId: number, rOpt?: RequestOptions): Observable<BaseSponsorList>;
  fetchByEntity(entityId: number, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<BaseSponsorList> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL, DEFAULT_FETCH_PARAMS);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.get<BaseSponsorList>(
      requestOptions.url ?? `${environment.worldskillsApiEvents}/base_sponsors?entity=${entityId}`, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }
}
