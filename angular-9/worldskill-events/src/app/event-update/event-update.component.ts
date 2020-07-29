import {Component, OnInit} from '@angular/core';
import {Event, EventRequest} from "../../types/event";
import {EventService} from "../../services/event/event.service";
import {AlertService, AlertType, WsComponent} from "@worldskills/worldskills-angular-lib";

@Component({
  selector: 'app-event-update',
  templateUrl: './event-update.component.html',
  styleUrls: ['./event-update.component.css']
})
export class EventUpdateComponent extends WsComponent implements OnInit {

  event: Event = null;
  loading = false;

  constructor(
    private eventService: EventService,
    private alertService: AlertService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      this.eventService.subject.subscribe(event => (this.event = event)),
      this.eventService.loading.subscribe(loading => (this.loading = loading))
    );
  }

  get initialized() {
    return !!this.event;
  }

  save(request: EventRequest) {
    this.eventService.update(this.event.id, request).subscribe(() => {
      this.alertService.setAlert('updated-event', AlertType.success,
        null, undefined, 'The Event has been updated successfully.', true);
    })
  }

}
