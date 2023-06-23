import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {Event, EventRequest} from '../../types/event';
import {NgForm} from '@angular/forms';
import {WsComponent} from '@worldskills/worldskills-angular-lib';
import {CountriesService} from "../../services/countries/countries.service";
import {NgbDateParserFormatter, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {Country} from "../../types/country";
import {TranslateService} from "@ngx-translate/core";
import {combineLatest} from "rxjs";

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent extends WsComponent implements OnInit, OnChanges {

  @Input() event: Event = null;
  @Input() editable = false;
  countries: Array<Country>;
  @Output() save: EventEmitter<EventRequest> = new EventEmitter<EventRequest>();
  @ViewChild('form') form: NgForm;
  loading = false;
  startDate: NgbDateStruct;
  endDate: NgbDateStruct;
  closingDate: NgbDateStruct;

  constructor(
    private countriesService: CountriesService,
    private translateService: TranslateService,
    public formatter: NgbDateParserFormatter,
  ) {
    super();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.event && changes.event.firstChange) {
      if (this.event) {
        if (this.event.start_date) {
          this.startDate = this.formatter.parse(this.event.start_date);
        }
        if (this.event.end_date) {
          this.endDate = this.formatter.parse(this.event.end_date);
        }
        if (this.event.closing_date) {
          this.closingDate = this.formatter.parse(this.event.closing_date);
        }
      }
    }
  }

  ngOnInit(): void {
    this.subscribe(
      combineLatest([
        this.countriesService.subject,
        this.translateService.get('Global')
      ])
        .subscribe(([countries, text]) => (this.countries = [{
          code: 'GLOBAL',
          name: {lang_code: 'en', text},
          phone_prefix: '',
          id: 0,
          member: null
        }, ...countries.country_list])),
      this.countriesService.loading.subscribe(loading => (this.loading = loading)),
    );
    this.countriesService.fetch();
  }

  get initialized() {
    return !!this.countries;
  }

  submit() {
    if (this.editable && this.form.valid) {
      const {
        name,
        type,
        start_date,
        end_date,
        closing_date,
        venue,
        town,
        code,
        country,
        utc_offset,
        url,
        cancelled,
        description,
        ws_entity,
      } = this.form.value;
      const event: EventRequest = {
        name,
        type: this.event ? this.event.type : type,
        start_date: this.formatter.format(start_date),
        end_date: this.formatter.format(end_date),
        closing_date: closing_date ? this.formatter.format(closing_date) : null,
        venue,
        town,
        code,
        country: {
          id: country === 0 ? null : parseInt(country),
        },
        utc_offset: parseInt(utc_offset),
        url,
        cancelled,
        description,
        ws_entity: {
          id: this.event ? this.event.ws_entity.id : parseInt(ws_entity),
        },
      };
      this.save.emit(event);
    }
  }

}
