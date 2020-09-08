import {Component, OnInit} from '@angular/core';
import {BaseSkillsService} from "../../services/base-skills/base-skills.service";
import {RxjsUtil, WsComponent} from "@worldskills/worldskills-angular-lib";
import {BaseSkill} from "../../types/base-skill";

@Component({
  selector: 'app-base-skills',
  templateUrl: './base-skills.component.html',
  styleUrls: ['./base-skills.component.css']
})
export class BaseSkillsComponent extends WsComponent implements OnInit {

  baseSkills: Array<BaseSkill>;
  loading = false;

  constructor(private baseSkillsService: BaseSkillsService) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      this.baseSkillsService.subject.subscribe(baseSkills => (this.baseSkills = baseSkills.base_skills)),
      RxjsUtil.loaderSubscriber(this.baseSkillsService).subscribe(loading => (this.loading = loading))
    );
    this.baseSkillsService.fetchByEntity(1);
  }

  get initialized() {
    return !!this.baseSkills;
  }

}
