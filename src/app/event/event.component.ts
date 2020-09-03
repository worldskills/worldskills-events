import {Component, OnInit} from '@angular/core';
import {Event} from '../../types/event';
import {ActivatedRoute, Router} from '@angular/router';
import {
  AlertService,
  AlertType,
  NgAuthService,
  User,
  UserRoleUtil,
  WsComponent
} from '@worldskills/worldskills-angular-lib';
import {EventService} from '../../services/event/event.service';
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent extends WsComponent implements OnInit {

  currentUser: User;
  event: Event = null;
  loading = false;
  appId = environment.worldskillsAppId;
  hasUserRole = UserRoleUtil.userHasRolesOfEntity;

  constructor(
    private authService: NgAuthService,
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      this.authService.currentUser.subscribe(currentUser => (this.currentUser = currentUser)),
      this.eventService.subject.subscribe(event => (this.event = event)),
      this.eventService.loading.subscribe(loading => (this.loading = loading))
    );
    this.route.params.subscribe(value => {
      const {eventId} = value;
      this.eventService.fetch(eventId);
    });
  }

  get initialized() {
    return !!this.event;
  }

  get isCompetitionOrPreparationMeeting() {
    return this.event && (this.event.type === 'competition' || this.event.type === 'preparation_meeting');
  }

  deleteEvent() {
    if (confirm('Deleting the Event will also delete all questions and attempts. Click OK to proceed.')) {
      this.eventService.delete(this.event.id).subscribe(() => {
          this.alertService.setAlert('new-event', AlertType.success,
            null, 'The Event has been deleted successfully.', true);
          this.router.navigateByUrl('/events').catch(e => alert(e));
        }
      );
    }
  }

}
