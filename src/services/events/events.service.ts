import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, ReplaySubject} from 'rxjs';
import {EventList} from '../../types/event';
import {share} from 'rxjs/operators';
import {environment} from '../../environments/environment';
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
import {Params} from "@angular/router";

export interface EventsFetchParams extends FetchParams {
  after?: string; // yyyy-mm-dd
  before?: string; // yyyy-mm-dd
  country?: number;
  name?: string;
  type?: string;
  ws_entity?: number;
  update?: boolean;
}

export function isEventsFetchParams(object: any): object is EventsFetchParams {
  return object && 'limit' in object && 'offset' in object;
}

export const DEFAULT_FETCH_PARAMS: EventsFetchParams = {limit: 100, l: 'en', sort: 'start_date_desc'};
export const DEFAULT_FETCH_PARAMS_PAGER: EventsFetchParams = {offset: 0, limit: 20, sort: 'start_date_desc'};

@Injectable({
  providedIn: 'root'
})
export class EventsService extends WsService<EventList, EventsFetchParams> {

  public fetchParams = new ReplaySubject<EventsFetchParams>(1);

  constructor(private http: HttpClient) {
    super();
    this.updateFetchParams(DEFAULT_FETCH_PARAMS_PAGER, true);
  }

  updateFetchParams(value: EventsFetchParams | undefined, update = true) {
    this.fetchParams.next({...value, update});
  }

  convertQueryParamsToFetchParams(queryParams: Params): EventsFetchParams {
    queryParams = {...queryParams};
    if ('country' in queryParams) {
      queryParams.country = parseInt(queryParams.country);
    }
    if ('ws_entity' in queryParams) {
      queryParams.ws_entity = parseInt(queryParams.ws_entity);
    }
    return queryParams;
  }

  // TODO added to lib, can be removed when lib updated
  stripNullOrUndefined(obj: any, deep = false): any {
    if (Array.isArray(obj)) {
      if (deep) {
        // tslint:disable-next-line:forin
        for (const k in obj) {
          obj[k] = this.stripNullOrUndefined(obj[k], true);
        }
      }
    } else if (obj && typeof obj === 'object') {
      Object.keys(obj).forEach(key => (obj[key] === undefined || obj[key] === null) && delete obj[key]);
    }
    return obj;
  }

  fetch(rOpt?: RequestOptions): Observable<EventList>;
  fetch(params: EventsFetchParams, rOpt?: RequestOptions): Observable<EventList>;
  fetch(mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<EventList>;
  fetch(params: EventsFetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<EventList>;
  fetch(p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<EventList> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL, DEFAULT_FETCH_PARAMS);
    const params = HttpUtil.objectToParams(this.stripNullOrUndefined(fetchParams) || {});
    const observable = this.http.get<EventList>(
      requestOptions.url ?? `${environment.worldskillsApiEvents}`, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

}
