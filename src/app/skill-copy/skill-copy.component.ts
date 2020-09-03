import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertService, AlertType, WsComponent} from "@worldskills/worldskills-angular-lib";
import {Event} from "../../types/event";
import {Skill} from "../../types/skill";
import {EventService} from "../../services/event/event.service";
import {SkillService} from "../../services/skill/skill.service";
import {UiSkillService} from "../../services/ui-skill/ui-skill.service";
import {combineLatest} from "rxjs";
import {map} from "rxjs/operators";
import {Router} from "@angular/router";
import {EventsService} from "../../services/events/events.service";
import {TranslateService} from "@ngx-translate/core";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-skill-copy',
  templateUrl: './skill-copy.component.html',
  styleUrls: ['./skill-copy.component.css']
})
export class SkillCopyComponent extends WsComponent implements OnInit {

  event: Event;
  skill: Skill;
  events: Array<Event>;
  loading = false;
  @ViewChild('form') form: NgForm;

  constructor(
    private eventService: EventService,
    private skillService: SkillService,
    private eventsService: EventsService,
    private uiSkillService: UiSkillService,
    private alertService: AlertService,
    private translateService: TranslateService,
    private router: Router,
  ) {
    super();
  }

  ngOnInit(): void {
    this.uiSkillService.subject.next(null);
    this.subscribe(
      this.eventService.subject.subscribe(event => (this.event = event)),
      this.skillService.subject.subscribe(skill => (this.skill = skill)),
      this.eventsService.subject.subscribe(events => (this.events = events.events)),
      combineLatest([
        this.eventService.loading,
        this.skillService.loading,
      ])
        .pipe(map(ls => !ls.every(l => !l)))
        .subscribe(loading => (this.loading = loading))
    );
    this.eventsService.fetch({limit: 9999, type: 'competition'});
  }

  get initialized() {
    return !!this.event && !!this.skill && !!this.events;
  }

  submit() {
    if (this.form.valid) {
      const {eventId} = this.form.value;
      const event = this.events.find(e => e.id === eventId);
      this.skillService.copySkill(this.event.id, this.skill.id, {event})
        .subscribe(skill => {
          this.translateService.get('The Skill has been copied successfully.').subscribe(t => {
            this.alertService.setAlert('copied-skill', AlertType.success,
              null, t, true);
            this.router.navigate(['/events', event.id, 'skills', skill.id]);
          });
        });
    }
  }

}
