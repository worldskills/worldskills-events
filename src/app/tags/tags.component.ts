import {Component, OnInit} from '@angular/core';
import {AlertService, AlertType, RxjsUtil, WsComponent} from "@worldskills/worldskills-angular-lib";
import {Event} from "../../types/event";
import {Tag} from "../../types/tag";
import {EventService} from "../../services/event/event.service";
import {TagsService} from "../../services/tags/tags.service";
import {TagService} from "../../services/tag/tag.service";
import {TranslateService} from "@ngx-translate/core";
import {faTimes} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent extends WsComponent implements OnInit {

  event: Event;
  tags: Array<Tag>;
  loading = false;
  faTimes = faTimes;

  constructor(
    private eventService: EventService,
    private tagsService: TagsService,
    private tagService: TagService,
    private alertService: AlertService,
    private translateService: TranslateService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      this.eventService.subject.subscribe(event => {
        this.event = event;
        this.tagsService.fetch(this.event.id);
      }),
      this.tagsService.subject.subscribe(tags => (this.tags = tags.tags)),
      RxjsUtil.loaderSubscriber(
        this.eventService,
        this.tagsService,
        this.tagService,
      ).subscribe(loading => (this.loading = loading)),
    );
  }

  get initialized() {
    return !!this.event && !!this.tags;
  }

  delete(tag: Tag) {
    this.translateService.get('Are you sure you want you delete the Tag?').subscribe(t => {
      if (confirm(t)) {
        this.tagService.delete(this.event.id, tag.id)
          .subscribe(() => {
            this.translateService.get('The Tag has been removed successfully.').subscribe(t2 => {
              this.alertService.setAlert('removed-tag', AlertType.success,
                null, t2, true);
              this.eventService.fetch(this.event.id);
            });
          });
      }
    });
  }

}
