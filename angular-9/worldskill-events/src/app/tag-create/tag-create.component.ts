import {Component, OnInit} from '@angular/core';
import {Event} from "../../types/event";
import {TagRequest} from "../../types/tag";
import {TagService} from "../../services/tag/tag.service";
import {AlertService, AlertType, WsComponent} from "@worldskills/worldskills-angular-lib";
import {TranslateService} from "@ngx-translate/core";
import {EventService} from "../../services/event/event.service";
import {combineLatest} from "rxjs";
import {map} from "rxjs/operators";
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
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      this.eventService.subject.subscribe(event => (this.event = event)),
      combineLatest([
        this.eventService.loading,
      ])
        .pipe(map(ls => !ls.every(l => !l)))
        .subscribe(loading => (this.loading = loading))
    );
  }

  get initialized() {
    return !!this.event;
  }

  save(request: TagRequest) {
    this.tagService.create(this.event.id, request).subscribe(() => {
      this.translateService.get('The Tag has been created successfully.').subscribe(t => {
        this.alertService.setAlert('created-tag', AlertType.success,
          null, undefined, t, true);
        this.router.navigate(['/events', this.event.id, 'tags']);
      });
    });
  }

}
