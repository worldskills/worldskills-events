import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {
  FULL,
  HttpUtil,
  NO_SUBJECT,
  RequestOptions,
  WsService,
  WsServiceRequestP1,
  WsServiceRequestP2,
  WsServiceRequestP3
} from '@worldskills/worldskills-angular-lib';
import {Observable} from 'rxjs';
import {Event, EventRequest} from '../../types/event';
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
  fetch(eventId: number, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<Event> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.get<Event>(
      requestOptions.url ?? `${environment.worldskillsApiEvents}/${eventId}`, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  create(event: EventRequest, rOpt?: RequestOptions): Observable<Event>;
  create(event: EventRequest, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<Event> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.post<Event>(
      requestOptions.url ?? `${environment.worldskillsApiEvents}`, event, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  update(eventId: number, event: EventRequest, rOpt?: RequestOptions): Observable<Event>;
  update(eventId: number, event: EventRequest, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<Event> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.put<Event>(
      requestOptions.url ?? `${environment.worldskillsApiEvents}/${eventId}`, event, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  delete(eventId: number, rOpt?: RequestOptions): Observable<Event>;
  delete(eventId: number, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<Event> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, NO_SUBJECT);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.delete<Event>(
      requestOptions.url ?? `${environment.worldskillsApiEvents}/${eventId}`, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

}
