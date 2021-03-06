import {Component, OnInit} from '@angular/core';
import {Event} from "../../types/event";
import {Tag} from "../../types/tag";
import {TagService} from "../../services/tag/tag.service";
import {AlertService, AlertType, EntityTreeService, RxjsUtil, WsComponent} from "@worldskills/worldskills-angular-lib";
import {TranslateService} from "@ngx-translate/core";
import {EventService} from "../../services/event/event.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tag-create',
  templateUrl: './tag-create.component.html',
  styleUrls: ['./tag-create.component.css']
})
export class TagCreateComponent extends WsComponent implements OnInit {

  event: Event;
  loading = false;

  constructor(
    private eventService: EventService,
    private tagService: TagService,
    private alertService: AlertService,
    private translateService: TranslateService,
    private router: Router,
    private entityTreeService: EntityTreeService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      this.eventService.subject.subscribe(event => (this.event = event)),
      RxjsUtil.loaderSubscriber(
        this.eventService,
        this.tagService,
      ).subscribe(loading => (this.loading = loading))
    );
  }

  get initialized() {
    return !!this.event;
  }

  save(request: Tag) {
    this.tagService.create(this.event.id, request).subscribe(() => {
      this.translateService.get('The Tag has been created successfully.').subscribe(t => {
        this.alertService.setAlert('created-tag', AlertType.success,
          null, t, true);
        this.entityTreeService.clearCache();
        this.router.navigate(['/events', this.event.id, 'tags']);
      });
    });
  }

}
