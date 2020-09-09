import {Component, OnInit} from '@angular/core';
import {BaseSkill} from "../../types/base-skill";
import {BaseSkillService} from "../../services/base-skill/base-skill.service";
import {AlertService, AlertType, RxjsUtil, WsComponent} from "@worldskills/worldskills-angular-lib";
import {TranslateService} from "@ngx-translate/core";
import {BaseSkillPhotoService} from "../../services/base-skill-photo/base-skill-photo.service";
import {Photo as BaseSkillPhotoRequest} from "../../types/photo";
import {Router} from "@angular/router";

@Component({
  selector: 'app-base-skill-photo-create',
  templateUrl: './base-skill-photo-create.component.html',
  styleUrls: ['./base-skill-photo-create.component.css']
})
export class BaseSkillPhotoCreateComponent extends WsComponent implements OnInit {

  baseSkill: BaseSkill;
  loading = false;

  constructor(
    private baseSkillService: BaseSkillService,
    private baseSkillPhotoService: BaseSkillPhotoService,
    private alertService: AlertService,
    private translateService: TranslateService,
    private router: Router,
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      this.baseSkillService.subject.subscribe(baseSkill => (this.baseSkill = baseSkill)),
      RxjsUtil.loaderSubscriber(
        this.baseSkillService,
        this.baseSkillPhotoService,
      ).subscribe(loading => (this.loading = loading))
    );
  }

  get initialized() {
    return !!this.baseSkill;
  }

  save(request: BaseSkillPhotoRequest) {
    this.baseSkillPhotoService.create(this.baseSkill.id, request).subscribe(() => {
      this.translateService.get('The Base Skill Photo has been created successfully.').subscribe(t => {
        this.baseSkillService.fetch(this.baseSkill.id);
        this.alertService.setAlert('created-base-skill-photo', AlertType.success,
          null, t, true);
        this.router.navigate(['/base-skills', this.baseSkill.id, 'photos']);
      });
    });
  }

}
