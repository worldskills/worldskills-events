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
import {Sector, SectorRequest} from '../../types/sector';
import {environment} from '../../environments/environment';
import {share} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SectorService extends WsService<Sector> {

  constructor(private http: HttpClient) {
    super();
  }

  fetch(eventId: number, sectorId: number, rOpt?: RequestOptions): Observable<Sector>;
  fetch(eventId: number, sectorId: number, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<Sector> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.get<Sector>(
      requestOptions.url ?? `${environment.worldskillsApiEvents}/${eventId}/sectors/${sectorId}`, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  create(eventId: number, sector: SectorRequest, rOpt?: RequestOptions): Observable<Sector>;
  create(eventId: number, sector: SectorRequest, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<Sector> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.post<Sector>(
      requestOptions.url ?? `${environment.worldskillsApiEvents}/${eventId}/sectors`, sector, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  update(eventId: number, sectorId: number, sector: SectorRequest, rOpt?: RequestOptions): Observable<Sector>;
  update(eventId: number, sectorId: number, sector: SectorRequest, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<Sector> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.put<Sector>(
      requestOptions.url ?? `${environment.worldskillsApiEvents}/${eventId}/sectors/${sectorId}`, sector, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  delete(eventId: number, sectorId: number, rOpt?: RequestOptions): Observable<Sector>;
  delete(eventId: number, sectorId: number, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<Sector> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, NO_SUBJECT);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.delete<Sector>(
      requestOptions.url ?? `${environment.worldskillsApiEvents}/${eventId}/sectors/${sectorId}`, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

}
