import {Component, OnInit} from '@angular/core';
import {AlertService, AlertType, RxjsUtil, WsComponent} from "@worldskills/worldskills-angular-lib";
import {Event} from "../../types/event";
import {Sponsor} from "../../types/sponsor";
import {EventService} from "../../services/event/event.service";
import {SponsorsService} from "../../services/sponsors/sponsors.service";
import {SponsorService} from "../../services/sponsor/sponsor.service";
import {TranslateService} from "@ngx-translate/core";
import {faTimes} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.css']
})
export class SponsorsComponent extends WsComponent implements OnInit {

  event: Event;
  sponsors: Array<Sponsor>;
  loading = false;
  faTimes = faTimes;

  constructor(
    private eventService: EventService,
    private sponsorsService: SponsorsService,
    private sponsorService: SponsorService,
    private alertService: AlertService,
    private translateService: TranslateService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      this.eventService.subject.subscribe(event => {
        this.event = event;
        this.sponsorsService.fetch(this.event.id);
      }),
      this.sponsorsService.subject.subscribe(sponsors => (this.sponsors = sponsors.sponsors)),
      RxjsUtil.loaderSubscriber(
        this.eventService,
        this.sponsorsService,
        this.sponsorService,
      ).subscribe(loading => (this.loading = loading)),
    );
  }

  get initialized() {
    return !!this.event && !!this.sponsors;
  }

  delete(sponsor: Sponsor) {
    this.translateService.get('Are you sure you want you delete the Sponsor?').subscribe(t => {
      if (confirm(t)) {
        this.sponsorService.delete(sponsor.id)
          .subscribe(() => {
            this.translateService.get('The Sponsor has been removed successfully.').subscribe(t2 => {
              this.alertService.setAlert('removed-sponsor', AlertType.success,
                null, t2, true);
              this.eventService.fetch(this.event.id);
            });
          });
      }
    });
  }

}
