import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Event, EventRequest} from '../../types/event';
import {NgForm} from '@angular/forms';
import {WsComponent} from '@worldskills/worldskills-angular-lib';
import {CountriesService} from "../../services/countries/countries.service";
import {isNgbDateStruct, NgbDateCache} from "../../utils/ngb";
import {NgbDateParserFormatter} from "@ng-bootstrap/ng-bootstrap";
import {Country} from "../../types/country";

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent extends WsComponent implements OnInit {

  @Input() event: Event = null;
  @Input() editable = false;
  countries: Array<Country>;
  @Output() save: EventEmitter<EventRequest> = new EventEmitter<EventRequest>();
  @ViewChild('form') form: NgForm;
  loading = false;
  ngbDateCache: NgbDateCache;

  constructor(
    private countriesService: CountriesService,
    public formatter: NgbDateParserFormatter,
  ) {
    super();
    this.ngbDateCache = new NgbDateCache(formatter);
  }

  ngOnInit(): void {
    this.subscribe(
      this.countriesService.subject.subscribe(countries => (this.countries = countries.country_list)),
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
        venue,
        town,
        code,
        country,
        utc_offset,
        url,
        description,
        ws_entity,
      } = this.form.value;
      const event: EventRequest = {
        name,
        type: this.event ? this.event.type : type,
        start_date: start_date && isNgbDateStruct(start_date) ? this.formatter.format(start_date) : start_date,
        end_date: end_date && isNgbDateStruct(end_date) ? this.formatter.format(end_date) : end_date,
        venue,
        town,
        code,
        country: {
          id: parseInt(country),
        },
        utc_offset: parseInt(utc_offset),
        url,
        description,
        ws_entity: {
          id: this.event ? this.event.ws_entity.id : parseInt(ws_entity),
        },
      };
      this.save.emit(event);
    }
  }

}
