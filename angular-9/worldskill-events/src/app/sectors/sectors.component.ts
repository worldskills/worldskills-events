import {Component, OnInit} from '@angular/core';
import {AlertService, AlertType, UserModel, WsComponent} from "@worldskills/worldskills-angular-lib";
import {Event} from "../../types/event";
import {Sector} from "../../types/sector";
import {EventService} from "../../services/event/event.service";
import {SectorsService} from "../../services/sectors/sectors.service";
import {combineLatest} from "rxjs";
import {map} from "rxjs/operators";
import {SectorService} from "../../services/sector/sector.service";
import {TranslateService} from "@ngx-translate/core";
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {userHasRolesOfEntity} from "../../utils/userRole";
import {environment} from "../../environments/environment";
import {AuthService} from "../../services/auth/auth.service";
import {SkillsService} from "../../services/skills/skills.service";

@Component({
  selector: 'app-sectors',
  templateUrl: './sectors.component.html',
  styleUrls: ['./sectors.component.css']
})
export class SectorsComponent extends WsComponent implements OnInit {

  authenticatedUser: UserModel;
  event: Event;
  sectors: Array<Sector>;
  loading = false;
  faTimes = faTimes;
  sectorDeletableInfo: Map<number, boolean> = new Map<number, boolean>();

  constructor(
    private authService: AuthService,
    private eventService: EventService,
    private sectorsService: SectorsService,
    private sectorService: SectorService,
    private skillsService: SkillsService,
    private alertService: AlertService,
    private translateService: TranslateService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      this.authService.authStatus.subscribe(authStatus => (this.authenticatedUser = authStatus.user)),
      this.eventService.subject.subscribe(event => {
        this.event = event;
        this.sectorsService.fetch(this.event.id);
      }),
      this.sectorsService.subject.subscribe(sectors => {
        this.sectors = sectors.sectors;
        this.sectors.forEach(sector => {
          this.skillsService.fetch(sector.event.id, {sector: sector.id}, {
            subject: false,
            loader: false,
            subscription: false,
          }).subscribe(skills => this.sectorDeletableInfo.set(sector.id, skills.total_count === 0));
        });
      }),
      combineLatest([
        this.eventService.loading,
        this.sectorsService.loading,
        this.sectorService.loading,
      ])
        .pipe(map(ls => !ls.every(l => !l)))
        .subscribe(loading => (this.loading = loading)),
    );
  }

  deletableSectorLoading(sector: Sector) {
    return !this.sectorDeletableInfo.has(sector.id);
  }

  deletableSector(sector: Sector) {
    return this.sectorDeletableInfo.get(sector.id);
  }

  get initialized() {
    return !!this.event && !!this.sectors;
  }

  delete(sector: Sector) {
    this.translateService.get('Are you sure you want you delete the Sector?').subscribe(t => {
      if (confirm(t)) {
        this.sectorService.delete(this.event.id, sector.id)
          .subscribe(() => {
            this.translateService.get('The Sector has been removed successfully.').subscribe(t2 => {
              this.alertService.setAlert('removed-sector', AlertType.success,
                null, undefined, t2, true);
              this.eventService.fetch(this.event.id);
            });
          });
      }
    });
  }

  hasUserRole(...roles: Array<string>) {
    return this.authenticatedUser && this.event && this.event.ws_entity &&
      userHasRolesOfEntity(this.authenticatedUser, environment.worldskillsAppId, this.event.ws_entity.id, ...roles);
  }

}
