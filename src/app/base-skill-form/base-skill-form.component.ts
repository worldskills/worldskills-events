import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {RxjsUtil, WsComponent} from "@worldskills/worldskills-angular-lib";
import {BaseSkill, BaseSkillRequest} from "../../types/base-skill";
import {NgForm} from "@angular/forms";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {BaseSectorsService} from "../../services/base-sectors/base-sectors.service";
import {BaseSector} from "../../types/base-sector";

@Component({
  selector: 'app-base-skill-form',
  templateUrl: './base-skill-form.component.html',
  styleUrls: ['./base-skill-form.component.css']
})
export class BaseSkillFormComponent extends WsComponent implements OnInit {

  @Input() baseSkill: BaseSkill;
  @Output() save: EventEmitter<BaseSkillRequest> = new EventEmitter<BaseSkillRequest>();
  @ViewChild('form') form: NgForm;
  baseSectors: Array<BaseSector>;
  loading = false;
  editor = ClassicEditor;
  editorConfig = {
    licenseKey: 'GPL'
  }

  constructor(private baseSectorsService: BaseSectorsService) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      this.baseSectorsService.subject.subscribe(baseSectors => (this.baseSectors = baseSectors.base_sectors)),
      RxjsUtil.loaderSubscriber(this.baseSectorsService).subscribe(loading => (this.loading = loading)),
    );
    this.baseSectorsService.fetch();
  }

  get initialized() {
    return !!this.baseSectors;
  }

  submit() {
    if (this.form.valid) {
      const {description, name, summary, url_video, sector} = this.form.value;
      const data: BaseSkillRequest = {
        description: {
          text: description,
          lang_code: 'en',
        },
        name: {
          text: name,
          lang_code: 'en',
        },
        summary: {
          text: summary,
          lang_code: 'en',
        },
        url_video,
        sector: sector ? {id: parseInt(sector)} : null,
      };
      this.save.emit(data);
    }
  }

}
