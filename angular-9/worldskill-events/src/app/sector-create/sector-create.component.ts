import {Component, OnInit} from '@angular/core';
import {Event} from "../../types/event";
import {SectorRequest} from "../../types/sector";
import {SectorService} from "../../services/sector/sector.service";
import {AlertService, AlertType, EntityTreeService, WsComponent} from "@worldskills/worldskills-angular-lib";
import {TranslateService} from "@ngx-translate/core";
import {EventService} from "../../services/event/event.service";
import {combineLatest} from "rxjs";
import {map} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sector-create',
  templateUrl: './sector-create.component.html',
  styleUrls: ['./sector-create.component.css']
})
export class SectorCreateComponent extends WsComponent implements OnInit {

  event: Event;
  loading = false;

  constructor(
    private eventService: EventService,
    private sectorService: SectorService,
    private alertService: AlertService,
    private translateService: TranslateService,
    private router: Router,
    private entityTreeService: EntityTreeService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      this.eventService.subject.subscribe(event => (this.event = event)),
      combineLatest([
        this.eventService.loading,
      ])
        .pipe(map(ls => !ls.every(l => !l)))
        .subscribe(loading => (this.loading = loading))
    );
  }

  get initialized() {
    return !!this.event;
  }

  save(request: SectorRequest) {
    this.sectorService.create(this.event.id, request).subscribe(sector => {
      this.translateService.get('The Sector has been created successfully.').subscribe(t => {
        this.alertService.setAlert('created-sector', AlertType.success,
          null, undefined, t, true);
        this.entityTreeService.clearCache();
        this.router.navigate(['/events', this.event.id, 'sectors', sector.id]);
      });
    });
  }

}
