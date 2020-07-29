import {Component, OnInit} from '@angular/core';
import {Event} from '../../types/event';
import {ActivatedRoute, Router} from '@angular/router';
import {CountriesService} from '../../services/countries/countries.service';
import {CountryList} from '../../types/country';
import {AlertService, AlertType, WsComponent} from '@worldskills/worldskills-angular-lib';
import {EventService} from '../../services/event/event.service';
import {combineLatest} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent extends WsComponent implements OnInit {

  event: Event = null;
  countries: CountryList = null;
  deleteLoading = false;
  loading = false;

  constructor(
    private countriesService: CountriesService,
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      this.eventService.subject.subscribe(event => (this.event = event)),
      this.countriesService.subject.subscribe(countries => (this.countries = countries)),
      combineLatest([
        this.eventService.loading,
        this.countriesService.loading,
      ])
        .pipe(map(ls => !ls.every(l => !l)))
        .subscribe(loading => (this.loading = loading))
    );
    this.route.params.subscribe(value => {
      const {eventId} = value;
      this.eventService.fetch(eventId);
    });
    this.countriesService.fetch();
  }

  get initialized() {
    return !!this.event && !!this.countries;
  }

  deleteEvent() {
    if (confirm('Deleting the Event will also delete all questions and attempts. Click OK to proceed.')) {
      this.eventService.delete(this.event.id).subscribe(() => {
          this.alertService.setAlert('new-event', AlertType.success,
            null, undefined, 'The Event has been deleted successfully.', true);
          this.router.navigateByUrl('/events').catch(e => alert(e));
        }
      );
    }
  }

}
