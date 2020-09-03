import {Component, OnInit} from '@angular/core';
import {WsComponent} from "@worldskills/worldskills-angular-lib";
import {Event} from "../../types/event";
import {EventService} from "../../services/event/event.service";
import {combineLatest} from "rxjs";
import {map} from "rxjs/operators";
import {UiSectorService} from "../../services/ui-sector/ui-sector.service";
import {LocaleContextService} from "../../services/locale-context/locale-context.service";

@Component({
  selector: 'app-sectors',
  templateUrl: './sectors.component.html',
  styleUrls: ['./sectors.component.css']
})
export class SectorsComponent extends WsComponent implements OnInit {

  event: Event;
  loading = false;
  additionalMenu = null;

  constructor(
    private eventService: EventService,
    private uiSectorService: UiSectorService,
    public localeContextService: LocaleContextService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      this.eventService.subject.subscribe(event => (this.event = event)),
      this.uiSectorService.subject.subscribe(templateRef => (setTimeout(() => this.additionalMenu = templateRef))),
      combineLatest([
        this.eventService.loading,
      ])
        .pipe(map(ls => !ls.every(l => !l)))
        .subscribe(loading => (this.loading = loading)),
    );
  }

  get initialized() {
    return !!this.event;
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.localeContextService.override.next(null);
  }

  switchLanguage(event, language) {
    event.preventDefault();
    event.stopPropagation();
    this.localeContextService.override.next(language);
  }

}
