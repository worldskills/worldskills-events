import {Component, OnInit} from '@angular/core';
import {Event} from "../../types/event";
import {SponsorRequest} from "../../types/sponsor";
import {SponsorService} from "../../services/sponsor/sponsor.service";
import {AlertService, AlertType, RxjsUtil, WsComponent} from "@worldskills/worldskills-angular-lib";
import {TranslateService} from "@ngx-translate/core";
import {EventService} from "../../services/event/event.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sponsor-create',
  templateUrl: './sponsor-create.component.html',
  styleUrls: ['./sponsor-create.component.css']
})
export class SponsorCreateComponent extends WsComponent implements OnInit {

  event: Event;
  loading = false;

  constructor(
    private eventService: EventService,
    private sponsorService: SponsorService,
    private alertService: AlertService,
    private translateService: TranslateService,
    private router: Router,
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      this.eventService.subject.subscribe(event => (this.event = event)),
      RxjsUtil.loaderSubscriber(
        this.eventService,
        this.sponsorService,
      ).subscribe(loading => (this.loading = loading))
    );
  }

  get initialized() {
    return !!this.event;
  }

  save(request: SponsorRequest) {
    this.sponsorService.create(request).subscribe(() => {
      this.translateService.get('The Sponsor has been created successfully.').subscribe(t => {
        this.alertService.setAlert('created-sponsor', AlertType.success,
          null, t, true);
        this.router.navigate(['/events', this.event.id, 'sponsors']);
      });
    });
  }

}
