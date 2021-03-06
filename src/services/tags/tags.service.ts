import {Injectable} from '@angular/core';
import {TagList} from '../../types/tag';
import {
  FULL,
  HttpUtil,
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

@Injectable({
  providedIn: 'root'
})
export class TagsService extends WsService<TagList> {

  constructor(private http: HttpClient) {
    super();
  }

  fetch(eventId: number, rOpt?: RequestOptions): Observable<TagList>;
  fetch(eventId: number, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<TagList> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.get<TagList>(
      requestOptions.url ?? `${environment.worldskillsApiEvents}/${eventId}/skill_tags`, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

}
