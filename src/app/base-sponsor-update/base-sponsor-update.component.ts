import {Component, OnInit} from '@angular/core';
import {Event} from "../../types/event";
import {BaseSponsor} from "../../types/base-sponsor";
import {BaseSponsorService} from "../../services/base-sponsor/base-sponsor.service";
import {AlertService, AlertType, RxjsUtil, User, WsComponent} from "@worldskills/worldskills-angular-lib";
import {TranslateService} from "@ngx-translate/core";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {SponsorRequest} from "../../types/sponsor";

@Component({
  selector: 'app-base-sponsor-update',
  templateUrl: './base-sponsor-update.component.html',
  styleUrls: ['./base-sponsor-update.component.css']
})
export class BaseSponsorUpdateComponent extends WsComponent implements OnInit {

  currentUser: User;
  event: Event;
  baseSponsor: BaseSponsor;
  loading = false;
  appId = environment.worldskillsAppId;

  constructor(
    private baseSponsorService: BaseSponsorService,
    private alertService: AlertService,
    private translateService: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      this.route.params.subscribe(({baseSponsorId}) => {
        this.baseSponsorService.fetch(parseInt(baseSponsorId));
      }),
      this.baseSponsorService.subject.subscribe(baseSponsor => (this.baseSponsor = baseSponsor)),
      RxjsUtil.loaderSubscriber(
        this.baseSponsorService
      ).subscribe(loading => (this.loading = loading))
    );
  }

  get initialized() {
    return !!this.baseSponsor;
  }

  save(request: SponsorRequest) {
    this.baseSponsorService.update(this.baseSponsor.id, request as any).subscribe(() => {
      this.translateService.get('The Base Sponsor has been updated successfully.').subscribe(t => {
        this.alertService.setAlert('updated-base-sponsor', AlertType.success,
          null, t, true);
      });
      this.router.navigate(['/base-sponsors']);
    });
  }

}
