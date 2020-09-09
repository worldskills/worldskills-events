import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Event} from '../../types/event';
import {Tag} from '../../types/tag';
import {NgForm} from '@angular/forms';
import {WsComponent} from '@worldskills/worldskills-angular-lib';

@Component({
  selector: 'app-tag-form',
  templateUrl: './tag-form.component.html',
  styleUrls: ['./tag-form.component.css']
})
export class TagFormComponent extends WsComponent {

  @Input() event: Event;
  @Input() tag: Tag = null;
  @Output() save: EventEmitter<Tag> = new EventEmitter<Tag>();
  @ViewChild('form') form: NgForm;
  loading = false;

  constructor() {
    super();
  }

  submit() {
    if (this.form.valid) {
      const {
        name,
      } = this.form.value;
      const tag: Tag = {
        name: {
          text: name,
          lang_code: 'en',
        },
      };
      this.save.emit(tag);
    }
  }

}
