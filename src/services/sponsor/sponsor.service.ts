import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {
  FetchParams,
  FULL,
  MulticastOptions,
  NO_SUBJECT,
  RequestOptions,
  WsService,
  WsServiceRequestP1,
  WsServiceRequestP2,
  WsServiceRequestP3
} from '@worldskills/worldskills-angular-lib';
import {Observable} from 'rxjs';
import {Sponsor, SponsorRequest} from '../../types/sponsor';
import {httpParamsFromFetchParams} from '../../utils/http';
import {environment} from '../../environments/environment';
import {share} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SponsorService extends WsService<Sponsor> {

  constructor(private http: HttpClient) {
    super();
  }

  fetch(sponsorId: number, rOpt?: RequestOptions): Observable<Sponsor>;
  fetch(sponsorId: number, params: FetchParams, rOpt?: RequestOptions): Observable<Sponsor>;
  fetch(sponsorId: number, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Sponsor>;
  fetch(sponsorId: number, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Sponsor>;
  fetch(sponsorId: number, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<Sponsor> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL);
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.get<Sponsor>(
      requestOptions.url ?? `${environment.worldskillsApiEvents}/sponsors/${sponsorId}`, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  create(sponsor: SponsorRequest, rOpt?: RequestOptions): Observable<Sponsor>;
  create(sponsor: SponsorRequest, params: FetchParams, rOpt?: RequestOptions): Observable<Sponsor>;
  create(sponsor: SponsorRequest, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Sponsor>;
  create(sponsor: SponsorRequest, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Sponsor>;
  create(sponsor: SponsorRequest, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<Sponsor> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL);
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.post<Sponsor>(
      requestOptions.url ?? `${environment.worldskillsApiEvents}/sponsors`, sponsor, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  update(sponsorId: number, sponsor: SponsorRequest, rOpt?: RequestOptions): Observable<Sponsor>;
  update(sponsorId: number, sponsor: SponsorRequest, params: FetchParams, rOpt?: RequestOptions): Observable<Sponsor>;
  update(sponsorId: number, sponsor: SponsorRequest, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Sponsor>;
  update(sponsorId: number, sponsor: SponsorRequest, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Sponsor>;
  update(sponsorId: number, sponsor: SponsorRequest, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<Sponsor> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL);
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.put<Sponsor>(
      requestOptions.url ?? `${environment.worldskillsApiEvents}/sponsors/${sponsorId}`, sponsor, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  delete(sponsorId: number, rOpt?: RequestOptions): Observable<Sponsor>;
  delete(sponsorId: number, params: FetchParams, rOpt?: RequestOptions): Observable<Sponsor>;
  delete(sponsorId: number, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Sponsor>;
  delete(sponsorId: number, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Sponsor>;
  delete(sponsorId: number, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<Sponsor> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, NO_SUBJECT);
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.delete<Sponsor>(
      requestOptions.url ?? `${environment.worldskillsApiEvents}/sponsors/${sponsorId}`, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

}
