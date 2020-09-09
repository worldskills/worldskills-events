import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Photo as SkillPhoto, Photo as SkillPhotoRequest} from '../../types/photo';
import {NgForm} from '@angular/forms';
import {UploadService, WsComponent} from '@worldskills/worldskills-angular-lib';
import {ImageService} from "../../services/image/image.service";
import {HttpEventType} from "@angular/common/http";
import {Image} from "../../types/image";
import {Skill} from "../../types/skill";
import {BaseSkill} from "../../types/base-skill";

@Component({
  selector: 'app-skill-photo-form',
  templateUrl: './skill-photo-form.component.html',
  styleUrls: ['./skill-photo-form.component.css']
})
export class SkillPhotoFormComponent extends WsComponent {

  @Input() cancelLink: Array<any>;
  @Input() skill: Skill | BaseSkill;
  @Input() skillPhoto: SkillPhoto = null;
  @Output() save: EventEmitter<SkillPhotoRequest> = new EventEmitter<SkillPhotoRequest>();
  @ViewChild('form') form: NgForm;
  loading = false;

  @ViewChild('fileInput') input: ElementRef<HTMLInputElement>;
  resourceLoading = false;
  resourceProgress = 0;
  uploadFile: File;

  constructor(
    private uploadService: UploadService,
    private imageService: ImageService,
  ) {
    super();
  }

  setFileFromInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files.length > 0) {
      this.uploadFile = input.files.item(0);
    } else {
      this.uploadFile = null;
    }
  }

  upload(onComplete: (image: Image) => void) {
    this.resourceLoading = true;
    this.resourceProgress = 0;
    const request = this.imageService.httpRequest(this.uploadFile);
    this.uploadFile = null;
    this.uploadService.listen<Image>(
      request,
      ({loaded, total, type}) => {
        if (type === HttpEventType.UploadProgress) {
          this.resourceProgress = loaded / total;
        }
      },
      image => {
        this.resourceLoading = false;
        onComplete(image.body);
      });
  }

  unsetUpload() {
    this.uploadFile = null;
    this.input.nativeElement.value = null;
  }

  submit() {
    if (this.form.valid) {
      const {
        description,
      } = this.form.value;
      let skillPhoto: SkillPhotoRequest = {...this.skillPhoto, description: {text: description, lang_code: 'en'}};
      if (this.uploadFile) {
        // tslint:disable-next-line:variable-name
        this.upload(image => {
          skillPhoto = {
            ...skillPhoto,
            image_id: image.id,
            thumbnail: image.thumbnail,
            thumbnail_hash: image.thumbnail_hash,
            sort: this.skill.photos.reduce((acc, p) => p.sort > acc ? p.sort : acc, -1) + 1,
          };
          this.save.emit(skillPhoto);
        });
      } else {
        this.save.emit(skillPhoto);
      }
    }
  }

}
