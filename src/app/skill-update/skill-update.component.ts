import {Component, OnInit} from '@angular/core';
import {Event} from "../../types/event";
import {Skill, SkillRequest} from "../../types/skill";
import {SkillService} from "../../services/skill/skill.service";
import {
  AlertService,
  AlertType,
  NgAuthService,
  RxjsUtil,
  User,
  UserRoleUtil,
  WsComponent
} from "@worldskills/worldskills-angular-lib";
import {TranslateService} from "@ngx-translate/core";
import {EventService} from "../../services/event/event.service";
import {environment} from "../../environments/environment";
import {AppService} from "../../services/app/app.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-skill-update',
  templateUrl: './skill-update.component.html',
  styleUrls: ['./skill-update.component.css']
})
export class SkillUpdateComponent extends WsComponent implements OnInit {

  currentUser: User;
  event: Event;
  skill: Skill;
  loading = false;
  appId = environment.worldskillsAppId;
  hasUserRole = UserRoleUtil.userHasRolesOfEntity;

  constructor(
    private appService: AppService,
    private authService: NgAuthService,
    private eventService: EventService,
    private skillService: SkillService,
    private alertService: AlertService,
    private translateService: TranslateService,
    private router: Router,
  ) {
    super();
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(currentUser => (this.currentUser = currentUser));
    this.appService.skillMenu.next(null);
    this.subscribe(
      this.eventService.subject.subscribe(event => (this.event = event)),
      this.skillService.subject.subscribe(skill => (this.skill = skill)),
      RxjsUtil.loaderSubscriber(
        this.eventService,
        this.skillService,
      ).subscribe(loading => (this.loading = loading))
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
        this.router.navigate(['/events', this.event.id, 'skills']);
      });
    });
  }

}
