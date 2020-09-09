import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertService, AlertType, RxjsUtil, User, WsComponent} from "@worldskills/worldskills-angular-lib";
import {BaseSkillService} from "../../services/base-skill/base-skill.service";
import {BaseSkillTagService} from "../../services/base-skill-tag/base-skill-tag.service";
import {BaseSkill} from "../../types/base-skill";
import {Tag} from "../../types/tag";
import {TranslateService} from "@ngx-translate/core";
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {environment} from "../../environments/environment";
import {BaseSkillTagsService} from "../../services/base-skill-tags/base-skill-tags.service";

@Component({
  selector: 'app-baseSkill-tags',
  templateUrl: './base-skill-tags.component.html',
  styleUrls: ['./base-skill-tags.component.css']
})
export class BaseSkillTagsComponent extends WsComponent implements OnInit {

  authenticatedUser: User;
  baseSkill: BaseSkill;
  tags: Array<Tag>;
  loading = false;
  @ViewChild('button', {static: true}) button;
  faTimes = faTimes;
  appId = environment.worldskillsAppId;

  constructor(
    private baseSkillService: BaseSkillService,
    private baseSkillTagsService: BaseSkillTagsService,
    private baseSkillTagService: BaseSkillTagService,
    private alertService: AlertService,
    private translateService: TranslateService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      this.baseSkillService.subject.subscribe(baseSkill => (this.baseSkill = baseSkill)),
      this.baseSkillTagsService.subject.subscribe(tags => (this.tags = tags.tags)),
      RxjsUtil.loaderSubscriber(
        this.baseSkillService,
        this.baseSkillTagsService,
        this.baseSkillTagService,
      ).subscribe(loading => (this.loading = loading))
    );
    this.baseSkillTagsService.fetch();
  }

  get initialized() {
    return !!this.baseSkill && !!this.tags;
  }

  get filteredTags() {
    return !!this.tags && !!this.baseSkill ? this.tags.filter(t => !this.baseSkill.tags.some(t2 => t.id === t2.id)) : [];
  }

  bind(tag: Tag) {
    this.baseSkillTagService.bind(this.baseSkill.id, tag.id).subscribe(() => {
      this.translateService.get('The Tag has been bound successfully.').subscribe(t => {
        this.alertService.setAlert('bound-tag', AlertType.success,
          null, t, true);
        this.baseSkillService.fetch(this.baseSkill.id);
      });
    });
  }

  unbind(tag: Tag) {
    this.baseSkillTagService.unbind(this.baseSkill.id, tag.id).subscribe(() => {
      this.translateService.get('The Tag has been unbound successfully.').subscribe(t => {
        this.alertService.setAlert('unbound-tag', AlertType.success,
          null, t, true);
        this.baseSkillService.fetch(this.baseSkill.id);
      });
    });
  }

}
