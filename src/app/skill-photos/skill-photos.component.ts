import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertService, AlertType, LOADER_ONLY, RxjsUtil, WsComponent} from "@worldskills/worldskills-angular-lib";
import {Event} from "../../types/event";
import {Photo} from "../../types/photo";
import {Skill} from "../../types/skill";
import {EventService} from "../../services/event/event.service";
import {SkillService} from "../../services/skill/skill.service";
import {combineLatest} from "rxjs";
import {SkillPhotoService} from "../../services/skill-photo/skill-photo.service";
import {faCaretDown, faCaretUp, faTimes} from '@fortawesome/free-solid-svg-icons';
import {environment} from "../../environments/environment";
import {TranslateService} from "@ngx-translate/core";
import {AppService} from "../../services/app/app.service";

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
  faTimes = faTimes;
  faCaretDown = faCaretDown;
  faCaretUp = faCaretUp;
  appId = environment.worldskillsAppId;

  constructor(
    private appService: AppService,
    private eventService: EventService,
    private skillService: SkillService,
    private skillPhotoService: SkillPhotoService,
    private alertService: AlertService,
    private translateService: TranslateService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.appService.skillMenu.next(this.button);
    this.subscribe(
      this.eventService.subject.subscribe(event => (this.event = event)),
      this.skillService.subject.subscribe(skill => (this.skill = skill)),
      RxjsUtil.loaderSubscriber(
        this.eventService,
        this.skillService,
        this.skillPhotoService,
      ).subscribe(loading => (this.loading = loading))
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

  delete(photo: Photo) {
    this.translateService.get('Are you sure you want you delete the Photo?').subscribe(t => {
      if (confirm(t)) {
        this.skillPhotoService.delete(this.event.id, this.skill.id, photo.id)
          .subscribe(() => {
            this.translateService.get('The Photo has been removed successfully.').subscribe(t2 => {
              this.alertService.setAlert('removed-skill-photo', AlertType.success,
                null, t2, true);
              this.skillService.fetch(this.event.id, this.skill.id);
            });
          });
      }
    });
  }

}
