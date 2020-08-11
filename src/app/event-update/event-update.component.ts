import {Component, OnInit} from '@angular/core';
import {Event, EventRequest} from "../../types/event";
import {EventService} from "../../services/event/event.service";
import {AlertService, AlertType, UserModel, WsComponent} from "@worldskills/worldskills-angular-lib";
import {TranslateService} from "@ngx-translate/core";
import {AuthService} from "../../services/auth/auth.service";
import {userHasRolesOfEntity} from "../../utils/userRole";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-event-update',
  templateUrl: './event-update.component.html',
  styleUrls: ['./event-update.component.css']
})
export class EventUpdateComponent extends WsComponent implements OnInit {

  authenticatedUser: UserModel;
  event: Event = null;
  loading = false;

  constructor(
    private authService: AuthService,
    private eventService: EventService,
    private alertService: AlertService,
    private translateService: TranslateService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      this.authService.authStatus.subscribe(authStatus => (this.authenticatedUser = authStatus.user)),
      this.eventService.subject.subscribe(event => (this.event = event)),
      this.eventService.loading.subscribe(loading => (this.loading = loading))
    );
  }

  get initialized() {
    return !!this.event;
  }

  save(request: EventRequest) {
    this.eventService.update(this.event.id, request).subscribe(() => {
      this.translateService.get('The Event has been updated successfully.').subscribe(t => {
        this.alertService.setAlert('updated-event', AlertType.success,
          null, undefined, t, true);
      });
    });
  }

  hasUserRole(...roles: Array<string>) {
    return this.authenticatedUser && this.event && this.event.ws_entity &&
      userHasRolesOfEntity(this.authenticatedUser, environment.worldskillsAppId, this.event.ws_entity.id, ...roles);
  }

}
