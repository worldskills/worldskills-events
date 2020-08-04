import {Component, OnInit} from '@angular/core';
import {Event} from "../../types/event";
import {Sector, SectorRequest} from "../../types/sector";
import {SectorService} from "../../services/sector/sector.service";
import {AlertService, AlertType, WsComponent} from "@worldskills/worldskills-angular-lib";
import {TranslateService} from "@ngx-translate/core";
import {EventService} from "../../services/event/event.service";
import {combineLatest} from "rxjs";
import {map} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-sector-update',
  templateUrl: './sector-update.component.html',
  styleUrls: ['./sector-update.component.css']
})
export class SectorUpdateComponent extends WsComponent implements OnInit {

  event: Event;
  sector: Sector;
  loading = false;

  constructor(
    private eventService: EventService,
    private sectorService: SectorService,
    private alertService: AlertService,
    private translateService: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      combineLatest([
        this.route.params,
        this.eventService.subject,
      ]).subscribe(([{sectorId}, event]) => {
        this.event = event;
        this.sectorService.fetch(this.event.id, parseInt(sectorId));
      }),
      this.sectorService.subject.subscribe(sector => (this.sector = sector)),
      combineLatest([
        this.eventService.loading,
        this.sectorService.loading
      ])
        .pipe(map(ls => !ls.every(l => !l)))
        .subscribe(loading => (this.loading = loading))
    );
  }

  get initialized() {
    return !!this.event && !!this.sector;
  }

  save(request: SectorRequest) {
    this.sectorService.update(this.event.id, this.sector.id, request).subscribe(() => {
      this.translateService.get('The Sector has been updated successfully.').subscribe(t => {
        this.alertService.setAlert('updated-sector', AlertType.success,
          null, undefined, t, true);
      });
      this.router.navigate(['/events', this.event.id, 'sectors']);
    });
  }

}
