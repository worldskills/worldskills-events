import {Component, OnInit} from '@angular/core';
import {EventRequest} from "../../types/event";
import {EventService} from "../../services/event/event.service";
import {ɵa as AlertService, AlertType, WsComponent} from "@worldskills/worldskills-angular-lib";
import {TranslateService} from "@ngx-translate/core";
import {combineLatest} from "rxjs";
import {map} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent extends WsComponent implements OnInit {

  loading = false;

  constructor(
    private eventService: EventService,
    private alertService: AlertService,
    private translateService: TranslateService,
    private router: Router,
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      combineLatest([
        this.eventService.loading,
      ])
        .pipe(map(ls => !ls.every(l => !l)))
        .subscribe(loading => (this.loading = loading))
    );
  }

  get initialized() {
    return true;
  }

  save(request: EventRequest) {
    this.eventService.create(request).subscribe(event => {
      this.translateService.get('The Event has been created successfully.').subscribe(t => {
        this.alertService.setAlert('created-event', AlertType.success,
          null, t, true);
        this.router.navigate(['/events', event.id]);
      });
    });
  }

}
