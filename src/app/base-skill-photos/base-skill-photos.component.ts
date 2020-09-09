import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertService, AlertType, LOADER_ONLY, RxjsUtil, WsComponent} from "@worldskills/worldskills-angular-lib";
import {Photo} from "../../types/photo";
import {BaseSkill} from "../../types/base-skill";
import {BaseSkillService} from "../../services/base-skill/base-skill.service";
import {combineLatest} from "rxjs";
import {BaseSkillPhotoService} from "../../services/base-skill-photo/base-skill-photo.service";
import {faCaretDown, faCaretUp, faTimes} from '@fortawesome/free-solid-svg-icons';
import {environment} from "../../environments/environment";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-base-skill-photos',
  templateUrl: './base-skill-photos.component.html',
  styleUrls: ['./base-skill-photos.component.css']
})
export class BaseSkillPhotosComponent extends WsComponent implements OnInit {

  baseSkill: BaseSkill;
  loading = false;
  @ViewChild('button', {static: true}) button;
  faTimes = faTimes;
  faCaretDown = faCaretDown;
  faCaretUp = faCaretUp;
  appId = environment.worldskillsAppId;

  constructor(
    private baseSkillService: BaseSkillService,
    private baseSkillPhotoService: BaseSkillPhotoService,
    private alertService: AlertService,
    private translateService: TranslateService,
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

  move(down: Photo, up: Photo) {
    combineLatest([
      this.baseSkillPhotoService.update(this.baseSkill.id, down.id, {...down, sort: up.sort}, LOADER_ONLY),
      this.baseSkillPhotoService.update(this.baseSkill.id, up.id, {...up, sort: down.sort}, LOADER_ONLY),
    ])
      .subscribe(() => {
        this.baseSkillService.fetch(this.baseSkill.id);
      });
  }

  delete(photo: Photo) {
    this.translateService.get('Are you sure you want you delete the Photo?').subscribe(t => {
      if (confirm(t)) {
        this.baseSkillPhotoService.delete(this.baseSkill.id, photo.id)
          .subscribe(() => {
            this.translateService.get('The Photo has been removed successfully.').subscribe(t2 => {
              this.alertService.setAlert('removed-base-skill-photo', AlertType.success,
                null, t2, true);
              this.baseSkillService.fetch(this.baseSkill.id);
            });
          });
      }
    });
  }

}
