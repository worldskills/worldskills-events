import {Component, OnInit, ViewChild} from '@angular/core';
import {LOADER_ONLY, WsComponent} from "@worldskills/worldskills-angular-lib";
import {EventsFetchParams, EventsService} from "../../services/events/events.service";
import {NgForm} from "@angular/forms";
import {Event} from '../../types/event';
import {NgbDateParserFormatter} from "@ng-bootstrap/ng-bootstrap";
import {CountriesService} from "../../services/countries/countries.service";
import {Country} from "../../types/country";
import {combineLatest} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-events-search-form',
  templateUrl: './events-search-form.component.html',
  styleUrls: ['./events-search-form.component.css']
})
export class EventsSearchFormComponent extends WsComponent implements OnInit {

  fetchParams: EventsFetchParams;
  events: Array<Event>;
  countries: Array<Country>;
  loading = false;
  @ViewChild('form') form: NgForm;

  constructor(
    private eventsService: EventsService,
    private countriesService: CountriesService,
    public formatter: NgbDateParserFormatter,
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      this.countriesService.subject.subscribe(countries => (this.countries = countries.country_list)),
      this.eventsService.fetchParams.subscribe(fetchParams =>
        this.fetchParams = {
          ...fetchParams,
          after: this.formatter.parse(fetchParams.after) as any || undefined,
          before: this.formatter.parse(fetchParams.before) as any || undefined
        }),
      combineLatest([
        this.eventsService.loading,
        this.countriesService.loading,
      ])
        .pipe(map(ls => !ls.every(l => !l)))
        .subscribe(loading => (this.loading = loading)),
    );
    this.eventsService.fetch(LOADER_ONLY).subscribe(events => (this.events = events.events));
    this.countriesService.fetch();
  }

  submit() {
    this.eventsService.updateFetchParams(this.getFetchParamsFromForm());
  }

  get initialized() {
    return !!this.events && !!this.countries;
  }

  onChange() {
    this.eventsService.updateFetchParams(this.getFetchParamsFromForm(), false);
  }

  getFetchParamsFromForm() {
    const fetchParams = {...this.fetchParams, ...this.form.value};
    if (!fetchParams.type) {
      fetchParams.type = undefined;
    }
    if (fetchParams.after) {
      fetchParams.after = this.formatter.format(fetchParams.after);
    }
    if (fetchParams.before) {
      fetchParams.before = this.formatter.format(fetchParams.before);
    }
    return fetchParams;
  }

  clear() {
    this.eventsService.updateFetchParams({}, false);
  }

}
