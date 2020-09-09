import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Event as WsEvent} from '../../types/event';
import {Sponsor, SponsorRequest} from '../../types/sponsor';
import {NgForm} from '@angular/forms';
import {UploadService, WsComponent} from '@worldskills/worldskills-angular-lib';
import {ImageService} from "../../services/image/image.service";
import {HttpEventType} from "@angular/common/http";
import {Image} from "../../types/image";
import {BaseSponsor, BaseSponsorRequest} from "../../types/base-sponsor";

@Component({
  selector: 'app-sponsor-form',
  templateUrl: './sponsor-form.component.html',
  styleUrls: ['./sponsor-form.component.css']
})
export class SponsorFormComponent extends WsComponent {

  @Input() event: WsEvent;
  @Input() cancelLink: Array<any>;
  @Input() sponsor: Sponsor | BaseSponsor = null;
  @Input() isBaseSponsor = false;
  @Input() editable = false;
  @Output() save: EventEmitter<SponsorRequest | BaseSponsorRequest> = new EventEmitter<SponsorRequest | BaseSponsorRequest>();
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
    if (this.editable && this.form.valid) {
      const {
        name,
        description,
        website,
        url,
        removeFile,
      } = this.form.value;
      let sponsor: SponsorRequest | BaseSponsorRequest;
      if (this.isBaseSponsor) {
        const s: BaseSponsorRequest = {
          entity: {id: 1},
          name: {text: name, lang_code: 'en'},
          url,
          website,
          description: {text: description, lang_code: 'en'},
          logo: removeFile ? null : (this.sponsor && this.sponsor.logo) ? this.sponsor.logo : null,
        };
        sponsor = s;
      } else {
        const s: SponsorRequest = {
          name,
          url,
          logo: removeFile ? null : (this.sponsor && this.sponsor.logo) ? this.sponsor.logo : null,
          event: this.event,
        };
        sponsor = s;
      }

      if (!removeFile && this.uploadFile) {
        // tslint:disable-next-line:variable-name
        this.upload(logo => {
          sponsor.logo = logo;
          this.save.emit(sponsor);
        });
      } else {
        this.save.emit(sponsor);
      }
    }
  }

  get name() {
    return this.sponsor ? (this.isBaseSponsor ? (this.sponsor as BaseSponsor).name.text : (this.sponsor as Sponsor).name) : undefined;
  }

  get description() {
    return this.sponsor && this.isBaseSponsor ? (this.sponsor as BaseSponsor).description.text : undefined;
  }

  get website() {
    return this.sponsor && this.isBaseSponsor ? (this.sponsor as BaseSponsor).website : undefined;
  }

}
