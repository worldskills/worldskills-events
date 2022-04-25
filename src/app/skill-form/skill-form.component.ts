import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Event} from '../../types/event';
import {Skill, SkillRequest} from '../../types/skill';
import {NgForm} from '@angular/forms';
import {RxjsUtil, WsComponent} from '@worldskills/worldskills-angular-lib';
import {NgbDateParserFormatter} from "@ng-bootstrap/ng-bootstrap";
import {BaseSkill} from "../../types/base-skill";
import {BaseSkillsService} from "../../services/base-skills/base-skills.service";
import {SectorsService} from "../../services/sectors/sectors.service";
import {Sector} from "../../types/sector";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-skill-form',
  templateUrl: './skill-form.component.html',
  styleUrls: ['./skill-form.component.css']
})
export class SkillFormComponent extends WsComponent implements OnInit {

  @Input() event: Event;
  @Input() skill: Skill = null;
  @Input() editable = false;
  @Input() organizerEditable = false;
  baseSkills: Array<BaseSkill>;
  sectors: Array<Sector>;
  @Output() save: EventEmitter<SkillRequest> = new EventEmitter<SkillRequest>();
  @ViewChild('form') form: NgForm;
  loading = false;
  editor = ClassicEditor;

  constructor(
    private baseSkillsService: BaseSkillsService,
    private sectorsService: SectorsService,
    public formatter: NgbDateParserFormatter,
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      this.baseSkillsService.subject.subscribe(baseSkills => (this.baseSkills = baseSkills.base_skills)),
      this.sectorsService.subject.subscribe(sectors => (this.sectors = sectors.sectors)),
      RxjsUtil.loaderSubscriber(
        this.baseSkillsService.loading,
        this.sectorsService.loading,
      ).subscribe(loading => (this.loading = loading)),
    );
    this.baseSkillsService.fetchByEntity(this.event.ws_entity.id);
    this.sectorsService.fetch(this.event.id);
  }

  get initialized() {
    return !!this.baseSkills && !!this.sectors;
  }

  submit() {
    if ((this.editable || this.organizerEditable) && this.form.valid) {
      const {
        type,
        base_id,
        number,
        status,
        url_video,
        name,
        description,
        description_required_skills,
        description_industry_action,
        description_competition_action,
        description_facts,
        sector,
        min_teams,
        max_teams,
        team_size,
        identify_judges,
        group_competitors,
        compatriot_marking,
        generate_500_scale,
        landscape_marking,
        competitor_max_age,
      } = this.form.value;
      const skill: SkillRequest = {
        event: {id: this.event.id},
        type,
        base_id: base_id ? parseInt(base_id) : undefined,
        number,
        status,
        url_video,
        sort: this.skill ? this.skill.sort : undefined,
        name: this.skill ? this.skill.name : undefined,
        description: {
          text: description,
          lang_code: 'en',
        },
        description_required_skills: {
          text: description_required_skills,
          lang_code: 'en',
        },
        description_industry_action: {
          text: description_industry_action,
          lang_code: 'en',
        },
        description_competition_action: {
          text: description_competition_action,
          lang_code: 'en',
        },
        description_facts: {
          text: description_facts,
          lang_code: 'en',
        },
        sector: sector ? {id: parseInt(sector)} : undefined,
        min_teams: min_teams ? parseInt(min_teams) : undefined,
        max_teams: max_teams ? parseInt(max_teams) : undefined,
        team_size: team_size ? parseInt(team_size) : undefined,
        identify_judges,
        group_competitors,
        compatriot_marking,
        generate_500_scale,
        landscape_marking,
        competitor_max_age: competitor_max_age ? parseInt(competitor_max_age) : undefined,
        ws_entity: this.skill ? {id: this.skill.ws_entity.id} : undefined,
      };
      this.save.emit(skill);
    }
  }

}
