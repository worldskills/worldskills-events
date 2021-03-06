import {Component, OnInit} from '@angular/core';
import {Event, EventRequest} from "../../types/event";
import {EventService} from "../../services/event/event.service";
import {
  AlertService,
  AlertType,
  NgAuthService,
  User,
  UserRoleUtil,
  WsComponent
} from "@worldskills/worldskills-angular-lib";
import {TranslateService} from "@ngx-translate/core";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-event-update',
  templateUrl: './event-update.component.html',
  styleUrls: ['./event-update.component.css']
})
export class EventUpdateComponent extends WsComponent implements OnInit {

  currentUser: User;
  event: Event = null;
  loading = false;
  appId = environment.worldskillsAppId;
  hasUserRole = UserRoleUtil.userHasRolesOfEntity;

  constructor(
    private authService: NgAuthService,
    private eventService: EventService,
    private alertService: AlertService,
    private translateService: TranslateService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      this.authService.currentUser.subscribe(currentUser => (this.currentUser = currentUser)),
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
          null, t, true);
      });
    });
  }

}
