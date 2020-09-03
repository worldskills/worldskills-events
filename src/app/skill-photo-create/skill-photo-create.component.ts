import {Component, OnInit} from '@angular/core';
import {Event} from "../../types/event";
import {Skill} from "../../types/skill";
import {SkillService} from "../../services/skill/skill.service";
import {AlertService, AlertType, WsComponent} from "@worldskills/worldskills-angular-lib";
import {TranslateService} from "@ngx-translate/core";
import {EventService} from "../../services/event/event.service";
import {combineLatest} from "rxjs";
import {map} from "rxjs/operators";
import {UiSkillService} from "../../services/ui-skill/ui-skill.service";
import {SkillPhotoService} from "../../services/skill-photo/skill-photo.service";
import {Photo as SkillPhotoRequest} from "../../types/photo";
import {Router} from "@angular/router";

@Component({
  selector: 'app-skill-photo-create',
  templateUrl: './skill-photo-create.component.html',
  styleUrls: ['./skill-photo-create.component.css']
})
export class SkillPhotoCreateComponent extends WsComponent implements OnInit {

  event: Event;
  skill: Skill;
  loading = false;

  constructor(
    private eventService: EventService,
    private skillService: SkillService,
    private skillPhotoService: SkillPhotoService,
    private alertService: AlertService,
    private translateService: TranslateService,
    private uiSkillService: UiSkillService,
    private router: Router,
  ) {
    super();
  }

  ngOnInit(): void {
    this.uiSkillService.subject.next(null);
    this.subscribe(
      this.eventService.subject.subscribe(event => (this.event = event)),
      this.skillService.subject.subscribe(skill => (this.skill = skill)),
      combineLatest([
        this.eventService.loading,
        this.skillService.loading,
        this.skillPhotoService.loading,
      ])
        .pipe(map(ls => !ls.every(l => !l)))
        .subscribe(loading => (this.loading = loading))
    );
  }

  get initialized() {
    return !!this.event && !!this.skill;
  }

  save(request: SkillPhotoRequest) {
    this.skillPhotoService.create(this.event.id, this.skill.id, request).subscribe(() => {
      this.translateService.get('The Skill Photo has been created successfully.').subscribe(t => {
        this.skillService.fetch(this.event.id, this.skill.id);
        this.alertService.setAlert('created-skill-photo', AlertType.success,
          null, t, true);
        this.router.navigate(['/events', this.event.id, 'skills', this.skill.id, 'photos']);
      });
    });
  }

}
