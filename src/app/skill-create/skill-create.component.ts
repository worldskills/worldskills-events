import {Component, OnInit} from '@angular/core';
import {SkillRequest} from "../../types/skill";
import {SkillService} from "../../services/skill/skill.service";
import {AlertService, AlertType, RxjsUtil, WsComponent} from "@worldskills/worldskills-angular-lib";
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";
import {EventService} from "../../services/event/event.service";
import {Event} from "../../types/event";

@Component({
  selector: 'app-skill-create',
  templateUrl: './skill-create.component.html',
  styleUrls: ['./skill-create.component.css']
})
export class SkillCreateComponent extends WsComponent implements OnInit {

  event: Event;
  loading = false;

  constructor(
    private eventService: EventService,
    private skillService: SkillService,
    private alertService: AlertService,
    private translateService: TranslateService,
    private router: Router,
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      this.eventService.subject.subscribe(event => (this.event = event)),
      RxjsUtil.loaderSubscriber(
        this.eventService,
        this.skillService,
      ).subscribe(loading => (this.loading = loading))
    );
  }

  get initialized() {
    return !!this.event;
  }

  save(request: SkillRequest) {
    this.skillService.create(this.event.id, request).subscribe(skill => {
      this.translateService.get('The Skill has been created successfully.').subscribe(t => {
        this.alertService.setAlert('created-skill', AlertType.success,
          null, t, true);
        this.router.navigate(['/events', this.event.id, 'skills', skill.id]);
      });
    });
  }

}
