import {Component, OnInit, ViewChild} from '@angular/core';
import {LOADER_ONLY, WsComponent} from "@worldskills/worldskills-angular-lib";
import {Event} from "../../types/event";
import {Photo} from "../../types/photo";
import {Skill} from "../../types/skill";
import {EventService} from "../../services/event/event.service";
import {SkillService} from "../../services/skill/skill.service";
import {combineLatest} from "rxjs";
import {map} from "rxjs/operators";
import {SkillPhotoService} from "../../services/skill-photo/skill-photo.service";
import {UiSkillService} from "../../services/ui-skill/ui-skill.service";

@Component({
  selector: 'app-skill-photos',
  templateUrl: './skill-photos.component.html',
  styleUrls: ['./skill-photos.component.css']
})
export class SkillPhotosComponent extends WsComponent implements OnInit {

  event: Event;
  skill: Skill;
  loading = false;
  @ViewChild('button', {static: true}) button;

  constructor(
    private eventService: EventService,
    private skillService: SkillService,
    private skillPhotoService: SkillPhotoService,
    private uiSkillService: UiSkillService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.uiSkillService.subject.next(this.button);
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

  move(down: Photo, up: Photo) {
    combineLatest([
      this.skillPhotoService.update(this.event.id, this.skill.id, down.id, {...down, sort: up.sort}, LOADER_ONLY),
      this.skillPhotoService.update(this.event.id, this.skill.id, up.id, {...up, sort: down.sort}, LOADER_ONLY),
    ])
      .subscribe(() => {
        this.skillService.fetch(this.event.id, this.skill.id);
      });
  }

}
