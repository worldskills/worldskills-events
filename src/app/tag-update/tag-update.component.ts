import {Component, OnInit} from '@angular/core';
import {Event} from "../../types/event";
import {Tag, TagRequest} from "../../types/tag";
import {TagService} from "../../services/tag/tag.service";
import {AlertService, AlertType, WsComponent} from "@worldskills/worldskills-angular-lib";
import {TranslateService} from "@ngx-translate/core";
import {EventService} from "../../services/event/event.service";
import {combineLatest} from "rxjs";
import {map} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-tag-update',
  templateUrl: './tag-update.component.html',
  styleUrls: ['./tag-update.component.css']
})
export class TagUpdateComponent extends WsComponent implements OnInit {

  event: Event;
  tag: Tag;
  loading = false;

  constructor(
    private eventService: EventService,
    private tagService: TagService,
    private alertService: AlertService,
    private translateService: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      combineLatest([
        this.route.params,
        this.eventService.subject,
      ]).subscribe(([{tagId}, event]) => {
        this.event = event;
        this.tagService.fetch(this.event.id, parseInt(tagId));
      }),
      this.tagService.subject.subscribe(tag => (this.tag = tag)),
      combineLatest([
        this.eventService.loading,
        this.tagService.loading
      ])
        .pipe(map(ls => !ls.every(l => !l)))
        .subscribe(loading => (this.loading = loading))
    );
  }

  get initialized() {
    return !!this.event && !!this.tag;
  }

  save(request: TagRequest) {
    this.tagService.update(this.event.id, this.tag.id, request).subscribe(() => {
      this.translateService.get('The Tag has been updated successfully.').subscribe(t => {
        this.alertService.setAlert('updated-tag', AlertType.success,
          null, t, true);
      });
      this.router.navigate(['/events', this.event.id, 'tags']);
    });
  }

}
