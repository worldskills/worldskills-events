import {Component, OnInit} from '@angular/core';
import {BaseSkill} from "../../types/base-skill";
import {BaseSkillService} from "../../services/base-skill/base-skill.service";
import {AlertService, AlertType, WsComponent} from "@worldskills/worldskills-angular-lib";
import {TranslateService} from "@ngx-translate/core";
import {combineLatest} from "rxjs";
import {map} from "rxjs/operators";
import {BaseSkillPhotoService} from "../../services/base-skill-photo/base-skill-photo.service";
import {Photo as BaseSkillPhoto, Photo as BaseSkillPhotoRequest} from "../../types/photo";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-base-skill-photo-update',
  templateUrl: './base-skill-photo-update.component.html',
  styleUrls: ['./base-skill-photo-update.component.css']
})
export class BaseSkillPhotoUpdateComponent extends WsComponent implements OnInit {

  baseSkill: BaseSkill;
  baseSkillPhoto: BaseSkillPhoto;
  loading = false;

  constructor(
    private baseSkillService: BaseSkillService,
    private baseSkillPhotoService: BaseSkillPhotoService,
    private alertService: AlertService,
    private translateService: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      combineLatest([
        this.route.params,
        this.baseSkillService.subject,
      ]).subscribe(([{baseSkillPhotoId}, baseSkill]) => {
        this.baseSkill = baseSkill;
        this.baseSkillPhotoService.fetch(this.baseSkill.id, parseInt(baseSkillPhotoId));
      }),
      this.baseSkillPhotoService.subject.subscribe(baseSkillPhoto => (this.baseSkillPhoto = baseSkillPhoto)),
      combineLatest([
        this.baseSkillService.loading,
        this.baseSkillPhotoService.loading,
      ])
        .pipe(map(ls => !ls.every(l => !l)))
        .subscribe(loading => (this.loading = loading))
    );
  }

  get initialized() {
    return !!this.baseSkill && !!this.baseSkillPhoto;
  }

  save(request: BaseSkillPhotoRequest) {
    this.baseSkillPhotoService.update(this.baseSkill.id, this.baseSkillPhoto.id, request).subscribe(() => {
      this.translateService.get('The Base Skill Photo has been updated successfully.').subscribe(t => {
        this.baseSkillService.fetch(this.baseSkill.id);
        this.alertService.setAlert('updated-base-skill-photo', AlertType.success,
          null, t, true);
        this.router.navigate(['/baseSkills', this.baseSkill.id, 'photos']);
      });
    });
  }

}
