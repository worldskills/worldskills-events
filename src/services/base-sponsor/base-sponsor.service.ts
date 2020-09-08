import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
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
} from '@worldskills/worldskills-angular-lib';
import {Observable} from 'rxjs';
import {BaseSponsor, BaseSponsorRequest} from '../../types/base-sponsor';
import {environment} from '../../environments/environment';
import {share} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BaseSponsorService extends WsService<BaseSponsor> {

  constructor(private http: HttpClient) {
    super();
  }

  fetch(baseSponsorId: number, rOpt?: RequestOptions): Observable<BaseSponsor>;
  fetch(baseSponsorId: number, params: FetchParams, rOpt?: RequestOptions): Observable<BaseSponsor>;
  fetch(baseSponsorId: number, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<BaseSponsor>;
  fetch(baseSponsorId: number, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<BaseSponsor>;
  fetch(baseSponsorId: number, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<BaseSponsor> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.get<BaseSponsor>(
      requestOptions.url ?? `${environment.worldskillsApiEvents}/base_sponsors/${baseSponsorId}`, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  create(baseSponsor: BaseSponsorRequest, rOpt?: RequestOptions): Observable<BaseSponsor>;
  create(baseSponsor: BaseSponsorRequest, params: FetchParams, rOpt?: RequestOptions): Observable<BaseSponsor>;
  create(baseSponsor: BaseSponsorRequest, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<BaseSponsor>;
  create(baseSponsor: BaseSponsorRequest, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<BaseSponsor>;
  create(baseSponsor: BaseSponsorRequest, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<BaseSponsor> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.post<BaseSponsor>(
      requestOptions.url ?? `${environment.worldskillsApiEvents}/base_sponsors`, baseSponsor, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  update(baseSponsorId: number, baseSponsor: BaseSponsorRequest, rOpt?: RequestOptions): Observable<BaseSponsor>;
  update(baseSponsorId: number, baseSponsor: BaseSponsorRequest, params: FetchParams, rOpt?: RequestOptions): Observable<BaseSponsor>;
  update(baseSponsorId: number, baseSponsor: BaseSponsorRequest, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<BaseSponsor>;
  update(baseSponsorId: number, baseSponsor: BaseSponsorRequest, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<BaseSponsor>;
  update(baseSponsorId: number, baseSponsor: BaseSponsorRequest, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<BaseSponsor> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.put<BaseSponsor>(
      requestOptions.url ?? `${environment.worldskillsApiEvents}/base_sponsors/${baseSponsorId}`, baseSponsor, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  delete(baseSponsorId: number, rOpt?: RequestOptions): Observable<BaseSponsor>;
  delete(baseSponsorId: number, params: FetchParams, rOpt?: RequestOptions): Observable<BaseSponsor>;
  delete(baseSponsorId: number, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<BaseSponsor>;
  delete(baseSponsorId: number, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<BaseSponsor>;
  delete(baseSponsorId: number, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<BaseSponsor> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, NO_SUBJECT);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.delete<BaseSponsor>(
      requestOptions.url ?? `${environment.worldskillsApiEvents}/base_sponsors/${baseSponsorId}`, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

}
