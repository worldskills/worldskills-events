import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertService, AlertType, User, WsComponent} from "@worldskills/worldskills-angular-lib";
import {EventService} from "../../services/event/event.service";
import {SkillService} from "../../services/skill/skill.service";
import {TagsService} from "../../services/tags/tags.service";
import {SkillTagService} from "../../services/skill-tag/skill-tag.service";
import {UiSkillService} from "../../services/ui-skill/ui-skill.service";
import {combineLatest} from "rxjs";
import {map} from "rxjs/operators";
import {Event} from "../../types/event";
import {Skill} from "../../types/skill";
import {Tag} from "../../types/tag";
import {TranslateService} from "@ngx-translate/core";
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-skill-tags',
  templateUrl: './skill-tags.component.html',
  styleUrls: ['./skill-tags.component.css']
})
export class SkillTagsComponent extends WsComponent implements OnInit {

  authenticatedUser: User;
  event: Event;
  skill: Skill;
  tags: Array<Tag>;
  loading = false;
  @ViewChild('button', {static: true}) button;
  faTimes = faTimes;
  appId = environment.worldskillsAppId;

  constructor(
    private eventService: EventService,
    private skillService: SkillService,
    private tagsService: TagsService,
    private skillTagService: SkillTagService,
    private alertService: AlertService,
    private translateService: TranslateService,
    private uiSkillService: UiSkillService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.uiSkillService.subject.next(this.button);
    this.subscribe(
      this.eventService.subject.subscribe(event => {
        this.event = event;
        this.tagsService.fetch(this.event.id);
      }),
      this.skillService.subject.subscribe(skill => (this.skill = skill)),
      this.tagsService.subject.subscribe(tags => (this.tags = tags.tags)),
      combineLatest([
        this.eventService.loading,
        this.skillService.loading,
        this.tagsService.loading,
        this.skillTagService.loading,
      ])
        .pipe(map(ls => !ls.every(l => !l)))
        .subscribe(loading => (this.loading = loading))
    );
  }

  get initialized() {
    return !!this.event && !!this.skill && !!this.tags;
  }

  get filteredTags() {
    return !!this.tags && !!this.skill ? this.tags.filter(t => !this.skill.tags.some(t2 => t.id === t2.id)) : [];
  }

  bind(tag: Tag) {
    this.skillTagService.bind(this.event.id, this.skill.id, tag.id).subscribe(() => {
      this.translateService.get('The Tag has been bound successfully.').subscribe(t => {
        this.alertService.setAlert('bound-tag', AlertType.success,
          null, t, true);
        this.skillService.fetch(this.event.id, this.skill.id);
      });
    });
  }

  unbind(tag: Tag) {
    this.skillTagService.unbind(this.event.id, this.skill.id, tag.id).subscribe(() => {
      this.translateService.get('The Tag has been unbound successfully.').subscribe(t => {
        this.alertService.setAlert('unbound-tag', AlertType.success,
          null, t, true);
        this.skillService.fetch(this.event.id, this.skill.id);
      });
    });
  }

}
