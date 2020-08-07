import {Component, OnInit} from '@angular/core';
import {Event} from "../../types/event";
import {Sponsor, SponsorRequest} from "../../types/sponsor";
import {SponsorService} from "../../services/sponsor/sponsor.service";
import {AlertService, AlertType, UserModel, WsComponent} from "@worldskills/worldskills-angular-lib";
import {TranslateService} from "@ngx-translate/core";
import {EventService} from "../../services/event/event.service";
import {combineLatest} from "rxjs";
import {map} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {userHasRolesOfEntity} from "../../utils/userRole";
import {environment} from "../../environments/environment";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-sponsor-update',
  templateUrl: './sponsor-update.component.html',
  styleUrls: ['./sponsor-update.component.css']
})
export class SponsorUpdateComponent extends WsComponent implements OnInit {

  authenticatedUser: UserModel;
  event: Event;
  sponsor: Sponsor;
  loading = false;

  constructor(
    private authService: AuthService,
    private eventService: EventService,
    private sponsorService: SponsorService,
    private alertService: AlertService,
    private translateService: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      this.authService.authStatus.subscribe(authStatus => (this.authenticatedUser = authStatus.user)),
      this.route.params.subscribe(({sponsorId}) => {
        this.sponsorService.fetch(parseInt(sponsorId));
      }),
      this.eventService.subject.subscribe(event => (this.event = event)),
      this.sponsorService.subject.subscribe(sponsor => (this.sponsor = sponsor)),
      combineLatest([
        this.eventService.loading,
        this.sponsorService.loading
      ])
        .pipe(map(ls => !ls.every(l => !l)))
        .subscribe(loading => (this.loading = loading))
    );
  }

  get initialized() {
    return !!this.event && !!this.sponsor;
  }

  save(request: SponsorRequest) {
    this.sponsorService.update(this.sponsor.id, request).subscribe(() => {
      this.translateService.get('The Sponsor has been updated successfully.').subscribe(t => {
        this.alertService.setAlert('updated-sponsor', AlertType.success,
          null, undefined, t, true);
      });
      this.router.navigate(['/events', this.event.id, 'sponsors']);
    });
  }

  hasUserRole(...roles: Array<string>) {
    return this.authenticatedUser && this.event && this.event.ws_entity &&
      userHasRolesOfEntity(this.authenticatedUser, environment.worldskillsAppId, this.event.ws_entity.id, ...roles);
  }

}
