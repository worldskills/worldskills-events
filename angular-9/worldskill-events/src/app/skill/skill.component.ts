import {Component, OnInit} from '@angular/core';
import {AlertService, AlertType, WsComponent} from "@worldskills/worldskills-angular-lib";
import {Skill} from "../../types/skill";
import {Event} from "../../types/event";
import {SkillService} from "../../services/skill/skill.service";
import {ActivatedRoute} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {EventService} from "../../services/event/event.service";
import {combineLatest} from "rxjs";
import {map} from "rxjs/operators";
import {UiSkillService} from "../../services/ui-skill/ui-skill.service";

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent extends WsComponent implements OnInit {

  event: Event;
  skill: Skill;
  loading = false;
  loadingRemoving = false;
  additionalMenu = null;

  constructor(
    private eventService: EventService,
    private skillService: SkillService,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private translateService: TranslateService,
    private uiSkillService: UiSkillService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      this.uiSkillService.subject.subscribe(templateRef => (setTimeout(() => this.additionalMenu = templateRef))),
      combineLatest([
        this.eventService.subject,
        this.route.params,
      ])
        .subscribe(([event, {skillId}]) => {
          this.event = event;
          this.skillService.fetch(this.event.id, skillId);
        }),
      this.skillService.subject.subscribe(skill => (this.skill = skill)),
      combineLatest([
        this.eventService.loading,
        this.skillService.loading,
      ])
        .pipe(map(ls => !ls.every(l => !l)))
        .subscribe(loading => (this.loading = loading)),
    );
  }

  get initialized() {
    return !!this.skill;
  }

  markAsRemoved() {
    this.translateService.get('Setting the status of the Skill to Removed will hide it from all Skill lists. The data associated with it will not be deleted. Click OK to proceed..').subscribe(confirm => {
      if (confirm) {
        this.skillService.update(this.event.id, this.skill.id, {...this.skill, status: 'removed'}).subscribe(() => {
          this.translateService.get('The Skill has been removed successfully.').subscribe(t => {
            this.alertService.setAlert('removed-skill', AlertType.success,
              null, undefined, t, true);
          });
        });
      }
    });
  }

  delete() {
    this.translateService.get('Are you sure you want you delete the Skill.').subscribe(confirm => {
      if (confirm) {
        this.skillService.delete(this.event.id, this.skill.id).subscribe(() => {
          this.translateService.get('The Skill has been deleted successfully.').subscribe(t => {
            this.alertService.setAlert('deleted-skill', AlertType.success,
              null, undefined, t, true);
          });
        });
      }
    });
  }

}
