import {Component, OnInit} from '@angular/core';
import {Event} from "../../types/event";
import {Skill, SkillRequest} from "../../types/skill";
import {SkillService} from "../../services/skill/skill.service";
import {AlertType, User, UserRoleUtil, WsComponent, ɵa as AlertService} from "@worldskills/worldskills-angular-lib";
import {TranslateService} from "@ngx-translate/core";
import {EventService} from "../../services/event/event.service";
import {combineLatest} from "rxjs";
import {map} from "rxjs/operators";
import {UiSkillService} from "../../services/ui-skill/ui-skill.service";
import {AuthService} from "../../services/auth/auth.service";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-skill-update',
  templateUrl: './skill-update.component.html',
  styleUrls: ['./skill-update.component.css']
})
export class SkillUpdateComponent extends WsComponent implements OnInit {

  authenticatedUser: User;
  event: Event;
  skill: Skill;
  loading = false;
  appId = environment.worldskillsAppId;
  hasUserRole = UserRoleUtil.userHasRolesOfEntity;

  constructor(
    private authService: AuthService,
    private eventService: EventService,
    private skillService: SkillService,
    private alertService: AlertService,
    private translateService: TranslateService,
    private uiSkillService: UiSkillService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.authService.authStatus.subscribe(authStatus => (this.authenticatedUser = authStatus.user)),
      this.uiSkillService.subject.next(null);
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
          null, t, true);
      });
    });
  }

}
