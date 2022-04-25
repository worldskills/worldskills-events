import {Component, OnDestroy, OnInit} from '@angular/core';
import {AlertService, AlertType, RxjsUtil, WsComponent} from "@worldskills/worldskills-angular-lib";
import {Skill} from "../../types/skill";
import {Event} from "../../types/event";
import {SkillService} from "../../services/skill/skill.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {EventService} from "../../services/event/event.service";
import {combineLatest} from "rxjs";
import {environment} from "../../environments/environment";
import {LocaleContextService} from "../../services/locale-context/locale-context.service";
import {AppService} from "../../services/app/app.service";

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent extends WsComponent implements OnInit, OnDestroy {

  event: Event;
  skill: Skill;
  skillName = '';
  loading = false;
  loadingRemoving = false;
  additionalMenu = null;
  appId = environment.worldskillsAppId;

  constructor(
    private appService: AppService,
    private eventService: EventService,
    private skillService: SkillService,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private translateService: TranslateService,
    private router: Router,
    public localeContextService: LocaleContextService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      this.appService.skillMenu.subscribe(templateRef => (setTimeout(() => this.additionalMenu = templateRef))),
      combineLatest([
        this.eventService.subject,
        this.route.params,
        this.localeContextService.override,
      ])
        .subscribe(([event, {skillId}]) => {
          this.event = event;
          this.skillService.fetch(this.event.id, skillId, {translations: true});
        }),
      this.skillService.subject.subscribe(skill => {
        this.skill = skill;
        this.skillName = skill.number + ' ' + skill.name.text;
      }),
      RxjsUtil.loaderSubscriber(
        this.eventService,
        this.skillService,
      ).subscribe(loading => (this.loading = loading)),
    );
  }

  get initialized() {
    return !!this.skill;
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

  markAsRemoved() {
    this.translateService.get('Setting the status of the Skill to Removed will hide it from all Skill lists. The data associated with it will not be deleted. Click OK to proceed..').subscribe(c => {
      if (confirm(c)) {
        this.skillService.update(this.event.id, this.skill.id, {...this.skill, status: 'removed'}).subscribe(() => {
          this.translateService.get('The Skill has been removed successfully.').subscribe(t => {
            this.alertService.setAlert('removed-skill', AlertType.success,
              null, t, true);
          });
          this.router.navigate(['/events', this.event.id, 'skills']);
        });
      }
    });
  }

  delete() {
    this.translateService.get('Are you sure you want you delete the Skill.').subscribe(c => {
      if (confirm(c)) {
        this.skillService.delete(this.event.id, this.skill.id).subscribe(() => {
          this.translateService.get('The Skill has been deleted successfully.').subscribe(t => {
            this.alertService.setAlert('deleted-skill', AlertType.success,
              null, t, true);
          });
          this.router.navigate(['/events', this.event.id, 'skills']);
        });
      }
    });
  }

}
