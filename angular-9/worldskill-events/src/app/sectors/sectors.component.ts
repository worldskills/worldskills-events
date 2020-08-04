import {Component, OnInit} from '@angular/core';
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

@Component({
  selector: 'app-sectors',
  templateUrl: './sectors.component.html',
  styleUrls: ['./sectors.component.css']
})
export class SectorsComponent extends WsComponent implements OnInit {

  event: Event;
  sectors: Array<Sector>;
  loading = false;
  faTimes = faTimes;

  constructor(
    private eventService: EventService,
    private sectorsService: SectorsService,
    private sectorService: SectorService,
    private alertService: AlertService,
    private translateService: TranslateService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      this.eventService.subject.subscribe(event => {
        this.event = event;
        this.sectorsService.fetch(this.event.id);
      }),
      this.sectorsService.subject.subscribe(sectors => (this.sectors = sectors.sectors)),
      combineLatest([
        this.eventService.loading,
        this.sectorsService.loading,
        this.sectorService.loading,
      ])
        .pipe(map(ls => !ls.every(l => !l)))
        .subscribe(loading => (this.loading = loading)),
    );
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

}
