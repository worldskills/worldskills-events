import {Component, OnInit} from '@angular/core';
import {Event} from "../../types/event";
import {Skill} from "../../types/skill";
import {SkillService} from "../../services/skill/skill.service";
import {AlertService, AlertType, WsComponent} from "@worldskills/worldskills-angular-lib";
import {TranslateService} from "@ngx-translate/core";
import {EventService} from "../../services/event/event.service";
import {combineLatest} from "rxjs";
import {map} from "rxjs/operators";
import {SkillPhotoService} from "../../services/skill-photo/skill-photo.service";
import {Photo as SkillPhoto, Photo as SkillPhotoRequest} from "../../types/photo";
import {ActivatedRoute, Router} from "@angular/router";
import {AppService} from "../../services/app/app.service";

@Component({
  selector: 'app-skill-photo-update',
  templateUrl: './skill-photo-update.component.html',
  styleUrls: ['./skill-photo-update.component.css']
})
export class SkillPhotoUpdateComponent extends WsComponent implements OnInit {

  event: Event;
  skill: Skill;
  skillPhoto: SkillPhoto;
  loading = false;

  constructor(
    private appService: AppService,
    private eventService: EventService,
    private skillService: SkillService,
    private skillPhotoService: SkillPhotoService,
    private alertService: AlertService,
    private translateService: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    super();
  }

  ngOnInit(): void {
    this.appService.skillMenu.next(null);
    this.subscribe(
      combineLatest([
        this.route.params,
        this.eventService.subject,
        this.skillService.subject,
      ]).subscribe(([{skillPhotoId}, event, skill]) => {
        this.event = event;
        this.skill = skill;
        this.skillPhotoService.fetch(this.event.id, this.skill.id, parseInt(skillPhotoId));
      }),
      this.skillPhotoService.subject.subscribe(skillPhoto => (this.skillPhoto = skillPhoto)),
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
    return !!this.event && !!this.skill && !!this.skillPhoto;
  }

  save(request: SkillPhotoRequest) {
    this.skillPhotoService.update(this.event.id, this.skill.id, this.skillPhoto.id, request).subscribe(() => {
      this.translateService.get('The Skill Photo has been updated successfully.').subscribe(t => {
        this.skillService.fetch(this.event.id, this.skill.id);
        this.alertService.setAlert('updated-skill-photo', AlertType.success,
          null, t, true);
        this.router.navigate(['/events', this.event.id, 'skills', this.skill.id, 'photos']);
      });
    });
  }

}
