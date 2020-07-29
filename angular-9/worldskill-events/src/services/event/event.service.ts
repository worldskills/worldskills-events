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
import {Event, EventRequest} from '../../types/event';
import {httpParamsFromFetchParams} from '../../utils/http';
import {environment} from '../../environments/environment';
import {share} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService extends WsService<Event> {

  constructor(private http: HttpClient) {
    super();
  }

  fetch(eventId: number, rOpt?: RequestOptions): Observable<Event>;
  fetch(eventId: number, params: FetchParams, rOpt?: RequestOptions): Observable<Event>;
  fetch(eventId: number, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Event>;
  fetch(eventId: number, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Event>;
  fetch(eventId: number, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<Event> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL);
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.get<Event>(
      requestOptions.url ?? `${environment.worldskillsApiEvents}/${eventId}`, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  create(event: EventRequest, rOpt?: RequestOptions): Observable<Event>;
  create(event: EventRequest, params: FetchParams, rOpt?: RequestOptions): Observable<Event>;
  create(event: EventRequest, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Event>;
  create(event: EventRequest, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Event>;
  create(event: EventRequest, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<Event> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL);
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.post<Event>(
      requestOptions.url ?? `${environment.worldskillsApiEvents}`, event, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  update(eventId: number, event: Event, rOpt?: RequestOptions): Observable<Event>;
  update(eventId: number, event: Event, params: FetchParams, rOpt?: RequestOptions): Observable<Event>;
  update(eventId: number, event: Event, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Event>;
  update(eventId: number, event: Event, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Event>;
  update(eventId: number, event: Event, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<Event> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL);
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.put<Event>(
      requestOptions.url ?? `${environment.worldskillsApiEvents}/${eventId}`, event, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  delete(eventId: number, rOpt?: RequestOptions): Observable<Event>;
  delete(eventId: number, params: FetchParams, rOpt?: RequestOptions): Observable<Event>;
  delete(eventId: number, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Event>;
  delete(eventId: number, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Event>;
  delete(eventId: number, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<Event> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, NO_SUBJECT);
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.delete<Event>(
      requestOptions.url ?? `${environment.worldskillsApiEvents}/${eventId}`, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

}
