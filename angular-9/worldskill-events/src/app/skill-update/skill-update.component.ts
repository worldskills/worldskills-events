import {Component, OnInit} from '@angular/core';
import {Event} from "../../types/event";
import {Skill, SkillRequest} from "../../types/skill";
import {SkillService} from "../../services/skill/skill.service";
import {AlertService, AlertType, WsComponent} from "@worldskills/worldskills-angular-lib";
import {TranslateService} from "@ngx-translate/core";
import {EventService} from "../../services/event/event.service";
import {combineLatest} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-skill-update',
  templateUrl: './skill-update.component.html',
  styleUrls: ['./skill-update.component.css']
})
export class SkillUpdateComponent extends WsComponent implements OnInit {

  event: Event;
  skill: Skill;
  loading = false;

  constructor(
    private eventService: EventService,
    private skillService: SkillService,
    private alertService: AlertService,
    private translateService: TranslateService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      this.eventService.subject.subscribe(event => (this.event = event)),
      this.skillService.subject.subscribe(skill => (this.skill = skill)),
      combineLatest([
        this.eventService.loading,
        this.skillService.loading
      ])
        .pipe(map(ls => !ls.every(l => !l)))
        .subscribe(loading => (this.loading = loading))
    );
  }

  get initialized() {
    return !!this.event && !!this.skill;
  }

  save(request: SkillRequest) {
    this.skillService.update(this.event.id, this.skill.id, request).subscribe(() => {
      this.translateService.get('The Skill has been updated successfully.').subscribe(t => {
        this.alertService.setAlert('updated-skill', AlertType.success,
          null, undefined, t, true);
      });
    });
  }

}
