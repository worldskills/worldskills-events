import {Component, OnInit} from '@angular/core';
import {BaseSkillService} from "../../services/base-skill/base-skill.service";
import {AlertService, AlertType, RxjsUtil, WsComponent} from "@worldskills/worldskills-angular-lib";
import {BaseSkill, BaseSkillRequest} from "../../types/base-skill";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-base-skill-update',
  templateUrl: './base-skill-update.component.html',
  styleUrls: ['./base-skill-update.component.css']
})
export class BaseSkillUpdateComponent extends WsComponent implements OnInit {

  baseSkill: BaseSkill;
  loading = false;

  constructor(
    private baseSkillService: BaseSkillService,
    private alertService: AlertService,
    private translateService: TranslateService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      this.baseSkillService.subject.subscribe(baseSkill => (this.baseSkill = baseSkill)),
      RxjsUtil.loaderSubscriber(this.baseSkillService).subscribe(loading => (this.loading = loading)),
    );
  }

  get initialized() {
    return !!this.baseSkill;
  }

  save(request: BaseSkillRequest) {
    this.baseSkillService.update(this.baseSkill.id, request).subscribe(() => {
      this.translateService.get('The Base Skill has been updated successfully.').subscribe(t => {
        this.alertService.setAlert('updated-base-skill', AlertType.success,
          null, t, true);
      });
    });
  }

}
