import {Injectable} from '@angular/core';
import {SponsorList} from '../../types/sponsor';
import {
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

const DEFAULT_FETCH_PARAMS = {
  limit: 9999,
  offset: 0,
};

@Injectable({
  providedIn: 'root'
})
export class SponsorsService extends WsService<SponsorList> {

  constructor(private http: HttpClient) {
    super();
  }

  fetch(eventId: number, rOpt?: RequestOptions): Observable<SponsorList>;
  fetch(eventId: number, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<SponsorList> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL, DEFAULT_FETCH_PARAMS);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.get<SponsorList>(
      requestOptions.url ?? `${environment.worldskillsApiEvents}/${eventId}/sponsors`, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

}
