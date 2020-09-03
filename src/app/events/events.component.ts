import {Component, OnInit} from '@angular/core';
import {NgAuthService, UserRoleUtil, WsComponent} from "@worldskills/worldskills-angular-lib";
import {EventList} from "../../types/event";
import {
  DEFAULT_FETCH_PARAMS_PAGER,
  EventsFetchParams,
  EventsService,
  isEventsFetchParams
} from "../../services/events/events.service";
import {ActivatedRoute, Router} from "@angular/router";
import {take} from "rxjs/operators";
import {environment} from "../../environments/environment";
import {combineLatest} from "rxjs";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent extends WsComponent implements OnInit {

  eventList: EventList;
  fetchParams: EventsFetchParams;
  loading = false;
  appId = environment.worldskillsAppId;

  constructor(
    private authService: NgAuthService,
    private eventsService: EventsService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      combineLatest([
        this.authService.currentUser,
        this.route.queryParams.pipe(take(1)),
      ]).subscribe(([currentUser, queryParams]) => {
        if (isEventsFetchParams(queryParams)) {
          this.eventsService.updateFetchParams(
            this.eventsService.convertQueryParamsToFetchParams(queryParams),
            true
          );
        } else if (UserRoleUtil.userHasRoles(currentUser, this.appId, 'EditEvents', 'OrganizerEditEvents')) {
          const role = currentUser.roles
            .find(r => r.role_application.application_code === environment.worldskillsAppId &&
              (r.name === 'EditEvents' || r.name === 'OrganizerEditEvents'));
          if (role && role.ws_entity) {
            this.eventsService.updateFetchParams(
              {...DEFAULT_FETCH_PARAMS_PAGER, ws_entity: role.ws_entity.id},
              true
            );
          }
        }
      }),
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
