import {Component, OnInit} from '@angular/core';
import {Skill} from "../../types/skill";
import {Event} from "../../types/event";
import {EventService} from "../../services/event/event.service";
import {SkillsService} from "../../services/skills/skills.service";
import {AlertService, AlertType, WsComponent} from "@worldskills/worldskills-angular-lib";
import {combineLatest} from "rxjs";
import {map} from "rxjs/operators";
import {EventsService} from "../../services/events/events.service";
import {SkillService} from "../../services/skill/skill.service";
import {TranslateService} from "@ngx-translate/core";

interface Filter {
  number?: string;
  name?: string;
  type?: string;
}

const TypeLabels = [
  {key: 'official', label: 'Official Skill'},
  {key: 'demo', label: 'Demonstration Skill'},
  {key: 'presentation', label: 'Presentation Skill'},
  {key: 'multi', label: 'Multi Skill'},
  {key: 'possible_official', label: 'Possible Official Skill'},
  {key: 'proposed_demo', label: 'Proposed Demonstration Skill'},
  {key: 'exhibition', label: 'Exhibition Skill'},
  {key: 'host_member', label: 'Host Member Skill'},
  {key: 'juniors', label: 'WorldSkills Juniors'},
];

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent extends WsComponent implements OnInit {

  event: Event;
  skills: Array<Skill>;
  events: Array<Event>;
  loading = false;
  loadingClone = false;
  selectedSkills: Array<Skill> = [];
  filters: Filter = {};
  TypeLabels = TypeLabels;

  constructor(
    private eventService: EventService,
    private skillsService: SkillsService,
    private eventsService: EventsService,
    private skillService: SkillService,
    private alertService: AlertService,
    private translateService: TranslateService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      this.eventService.subject.subscribe(event => {
        this.event = event;
        this.skillsService.fetch(this.event.id);
      }),
      this.skillsService.subject.subscribe(skills => (this.skills = skills.skills)),
      this.eventsService.subject.subscribe(events => (this.events = events.events)),
      combineLatest([
        this.eventService.loading,
        this.skillsService.loading,
        this.eventsService.loading,
      ])
        .pipe(map(ls => !ls.every(l => !l)))
        .subscribe(loading => (this.loading = loading)),
      this.skillService.loading.subscribe(loadingClone => (this.loadingClone = loadingClone)),
    );
    this.eventsService.fetch({limit: 9999, offset: 0});
  }

  get initialized() {
    return !!this.event && !!this.skills && !!this.events;
  }

  get filteredSkills() {
    return this.skills.filter(skill => {
      if (!!this.filters.number) {
        if (!skill.number.includes(this.filters.number)) {
          return false;
        }
      }
      if (!!this.filters.name) {
        if (!skill.name.text.toLowerCase().includes(this.filters.name.toLowerCase())) {
          return false;
        }
      }
      if (!!this.filters.type) {
        if (skill.type !== this.filters.type) {
          return false;
        }
      }
      return true;
    })
  }

  isSelected(skill: Skill) {
    return this.selectedSkills.includes(skill);
  }

  toggleSelectAll(event: any) {
    if (event.currentTarget.checked) {
      this.selectedSkills = [...this.skills];
    } else {
      this.selectedSkills = [];
    }
  }

  toggleSelection(event: any, skill: Skill) {
    if (event.currentTarget.checked) {
      this.selectedSkills.push(skill);
    } else {
      this.selectedSkills = this.selectedSkills.filter(s => skill !== s);
    }
  }

  updateFilter(key: keyof Filter, evt: any) {
    this.filters[key] = evt.currentTarget.value;
  }

  getTypeLabel(type: string) {
    const label = TypeLabels.find(l => l.key === type);
    return label ? label.label : '';
  }

  copySelectedSkills(evt: any, event: Event) {
    evt.preventDefault();
    if (!this.loadingClone) {
      combineLatest(
        this.selectedSkills.map(skill => this.skillService.copySkill(this.event.id, skill.id, {event}))
      ).subscribe(() => {
        this.selectedSkills = [];
        this.translateService.get('The skills have been successfully copied.').subscribe(t => {
          this.alertService.setAlert('copied-events', AlertType.success,
            null, undefined, t, true);
        });
      });
    }
  }

}
