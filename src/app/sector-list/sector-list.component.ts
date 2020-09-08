import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AlertService, AlertType, WsComponent} from "@worldskills/worldskills-angular-lib";
import {Event} from "../../types/event";
import {Sector} from "../../types/sector";
import {EventService} from "../../services/event/event.service";
import {SectorsService} from "../../services/sectors/sectors.service";
import {combineLatest} from "rxjs";
import {map} from "rxjs/operators";
import {SectorService} from "../../services/sector/sector.service";
import {TranslateService} from "@ngx-translate/core";
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {environment} from "../../environments/environment";
import {SkillsService} from "../../services/skills/skills.service";
import {LocaleContextService} from "../../services/locale-context/locale-context.service";
import {AppService} from "../../services/app/app.service";

@Component({
  selector: 'app-sector-list',
  templateUrl: './sector-list.component.html',
  styleUrls: ['./sector-list.component.css']
})
export class SectorListComponent extends WsComponent implements OnInit, OnDestroy {

  event: Event;
  sectors: Array<Sector>;
  loading = false;
  @ViewChild('button', {static: true}) button;
  faTimes = faTimes;
  sectorDeletableInfo: Map<number, boolean> = new Map<number, boolean>();
  appId = environment.worldskillsAppId;

  constructor(
    private appService: AppService,
    private eventService: EventService,
    private sectorsService: SectorsService,
    private sectorService: SectorService,
    private skillsService: SkillsService,
    private alertService: AlertService,
    private translateService: TranslateService,
    private localeContextService: LocaleContextService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.appService.sectorMenu.next(this.button);
    this.subscribe(
      combineLatest([
        this.eventService.subject,
        this.localeContextService.override,
      ]).subscribe(([event]) => {
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

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.appService.sectorMenu.next(null);
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
                null, t2, true);
              this.eventService.fetch(this.event.id);
            });
          });
      }
    });
  }

}
