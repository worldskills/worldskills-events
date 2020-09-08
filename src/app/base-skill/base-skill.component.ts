import {Component, OnInit} from '@angular/core';
import {RxjsUtil, WsComponent} from "@worldskills/worldskills-angular-lib";
import {BaseSkillService} from "../../services/base-skill/base-skill.service";
import {BaseSkill} from "../../types/base-skill";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-base-skill',
  templateUrl: './base-skill.component.html',
  styleUrls: ['./base-skill.component.css']
})
export class BaseSkillComponent extends WsComponent implements OnInit {

  baseSkill: BaseSkill;
  loading = false;

  constructor(
    private baseSkillService: BaseSkillService,
    private route: ActivatedRoute,
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      this.baseSkillService.subject.subscribe(baseSkill => (this.baseSkill = baseSkill)),
      RxjsUtil.loaderSubscriber(this.baseSkillService).subscribe(loading => (this.loading = loading)),
    );
    this.route.params.subscribe(({baseSkillId}) => (this.baseSkillService.fetch(parseInt(baseSkillId))));
  }

  get initialized() {
    return !!this.baseSkill;
  }

}
