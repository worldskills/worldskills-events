import {Injectable} from '@angular/core';
import {SectorList} from '../../types/sector';
import {
  FetchParams,
  FULL,
  MulticastOptions,
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

const DEFAULT_FETCH_PARAMS: FetchParams = {
  limit: 9999,
  offset: 0,
};

@Injectable({
  providedIn: 'root'
})
export class SectorsService extends WsService<SectorList> {

  constructor(private http: HttpClient) {
    super();
  }

  fetch(eventId: number, rOpt?: RequestOptions): Observable<SectorList>;
  fetch(eventId: number, params: FetchParams, rOpt?: RequestOptions): Observable<SectorList>;
  fetch(eventId: number, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<SectorList>;
  fetch(eventId: number, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<SectorList>;
  fetch(eventId: number, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<SectorList> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL, DEFAULT_FETCH_PARAMS);
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.get<SectorList>(
      requestOptions.url ?? `${environment.worldskillsApiEvents}/${eventId}/sectors`, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

}
