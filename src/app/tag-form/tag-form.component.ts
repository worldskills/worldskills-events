import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Event} from '../../types/event';
import {Tag, TagRequest} from '../../types/tag';
import {NgForm} from '@angular/forms';
import {WsComponent} from '@worldskills/worldskills-angular-lib';

@Component({
  selector: 'app-tag-form',
  templateUrl: './tag-form.component.html',
  styleUrls: ['./tag-form.component.css']
})
export class TagFormComponent extends WsComponent implements OnInit {

  @Input() event: Event;
  @Input() tag: Tag = null;
  @Output() save: EventEmitter<TagRequest> = new EventEmitter<TagRequest>();
  @ViewChild('form') form: NgForm;
  loading = false;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  get initialized() {
    return true;
  }

  submit() {
    if (this.form.valid) {
      const {
        name,
      } = this.form.value;
      const tag: TagRequest = {
        name: {
          text: name,
          lang_code: 'en',
        },
      };
      this.save.emit(tag);
    }
  }

}
