import {Component, OnInit} from '@angular/core';
import {Event} from "../../types/event";
import {SectorRequest} from "../../types/sector";
import {SectorService} from "../../services/sector/sector.service";
import {AlertService, AlertType, EntityTreeService, RxjsUtil, WsComponent} from "@worldskills/worldskills-angular-lib";
import {TranslateService} from "@ngx-translate/core";
import {EventService} from "../../services/event/event.service";
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
      RxjsUtil.loaderSubscriber(
        this.eventService,
        this.sectorService,
      ).subscribe(loading => (this.loading = loading))
    );
  }

  get initialized() {
    return !!this.event;
  }

  save(request: SectorRequest) {
    this.sectorService.create(this.event.id, request).subscribe(() => {
      this.translateService.get('The Sector has been created successfully.').subscribe(t => {
        this.alertService.setAlert('created-sector', AlertType.success,
          null, t, true);
        this.entityTreeService.clearCache();
        this.router.navigate(['/events', this.event.id, 'sectors']);
      });
    });
  }

}
