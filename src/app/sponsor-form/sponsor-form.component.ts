import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Event as WsEvent} from '../../types/event';
import {Sponsor, SponsorRequest} from '../../types/sponsor';
import {NgForm} from '@angular/forms';
import {UploadService, WsComponent} from '@worldskills/worldskills-angular-lib';
import {ImageService} from "../../services/image/image.service";
import {HttpEventType} from "@angular/common/http";
import {Image} from "../../types/image";

@Component({
  selector: 'app-sponsor-form',
  templateUrl: './sponsor-form.component.html',
  styleUrls: ['./sponsor-form.component.css']
})
export class SponsorFormComponent extends WsComponent implements OnInit {

  @Input() event: WsEvent;
  @Input() sponsor: Sponsor = null;
  @Input() editable = false;
  @Output() save: EventEmitter<SponsorRequest> = new EventEmitter<SponsorRequest>();
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

  ngOnInit(): void {

  }

  get initialized() {
    return true;
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
        url,
        removeFile,
      } = this.form.value;
      const sponsor: SponsorRequest = {
        name,
        url,
        logo: removeFile ? null : (this.sponsor && this.sponsor.logo) ? this.sponsor.logo : null,
        event: this.event,
      };
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

}