import { Component, OnInit, Input } from '@angular/core';
import { RxjsUtil, WsComponent } from '@worldskills/worldskills-angular-lib';
import { EventService } from '../../services/event/event.service';
import { SkillService } from '../../services/skill/skill.service';
import { SkillsService } from '../../services/skills/skills.service';
import { Skill } from '../../types/skill';
import { Event } from "../../types/event";

@Component({
  selector: 'app-skills-translations',
  templateUrl: './skills-translations.component.html',
  styleUrls: ['./skills-translations.component.css']
})
export class SkillsTranslationsComponent extends WsComponent implements OnInit {

  event: Event;
  skills: Array<Skill>;
  loading = false;

  constructor(
    private eventService: EventService,
    private skillsService: SkillsService,
    private skillService: SkillService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      this.eventService.subject.subscribe(event => {
        this.event = event;
        this.skillsService.fetch(this.event.id);
      }),
      this.skillsService.subject.subscribe(skills => {
        this.skills = skills.skills
        this.skills.forEach(skill => {
          this.skillService.fetch(this.event.id, skill.id, {translations: true}).subscribe(skillTranslations => skill.name = skillTranslations.name);
        });
      }),
      RxjsUtil.loaderSubscriber(
        this.eventService,
        this.skillsService,
      ).subscribe(loading => (this.loading = loading)),
    );
  }

}
