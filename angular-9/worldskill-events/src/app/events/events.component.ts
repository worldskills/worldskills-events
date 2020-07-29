import {Component, OnInit} from '@angular/core';
import {UserModel, WsComponent} from "@worldskills/worldskills-angular-lib";
import {EventList} from "../../types/event";
import {EventsFetchParams, EventsService, isEventsFetchParams} from "../../services/events/events.service";
import {AuthService} from "../../services/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent extends WsComponent implements OnInit {

  authenticatedUser: UserModel;
  eventList: EventList;
  fetchParams: EventsFetchParams;
  loading = false;

  constructor(
    private authService: AuthService,
    private eventsService: EventsService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      this.authService.authStatus.subscribe(authStatus => (this.authenticatedUser = authStatus.user)),
      this.eventsService.fetchParams.subscribe(fetchParams => {
        this.fetchParams = fetchParams;
        if (this.fetchParams.update) {
          const params = {...this.fetchParams};
          this.eventsService.fetch(params);
          this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {...this.fetchParams, update: undefined},
            // queryParamsHandling: 'merge',
            // skipLocationChange: true
          });
        }
      }),
      this.eventsService.subject.subscribe(eventList => (this.eventList = eventList)),
      this.eventsService.loading.subscribe(loading => (this.loading = loading))
    );
    this.route.queryParams.pipe(take(1)).subscribe(queryParams => {
      if (isEventsFetchParams(queryParams)) {
        this.eventsService.updateFetchParams(
          this.eventsService.convertQueryParamsToFetchParams(queryParams),
          true
        );
      }
    });
  }

  sort(field: string) {
    let sort;
    if (!this.fetchParams.sort) {
      sort = `${field}_asc`;
    } else {
      if (this.fetchParams.sort.startsWith(field)) {
        sort = this.fetchParams.sort === `${field}_asc` ? `${field}_desc` : `${field}_asc`;
      } else {
        sort = `${field}_asc`;
      }
    }
    this.eventsService.fetchParams.next({
      ...this.fetchParams,
      sort
    });
  }

  fetch(page) {
    if ((this.fetchParams.offset / this.fetchParams.limit) !== (page - 1)) {
      this.eventsService.fetchParams.next({
        ...this.fetchParams,
        limit: this.fetchParams.limit,
        offset: this.fetchParams.limit ? this.fetchParams.limit * (page - 1) : 0,
      });
    }
  }

}
