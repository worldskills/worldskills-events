import {Component, OnInit} from '@angular/core';
import {BaseSponsorsService} from "../../services/base-sponsors/base-sponsors.service";
import {RxjsUtil, WsComponent} from "@worldskills/worldskills-angular-lib";
import {BaseSponsor} from "../../types/base-sponsor";

@Component({
  selector: 'app-base-sponsors',
  templateUrl: './base-sponsors.component.html',
  styleUrls: ['./base-sponsors.component.css']
})
export class BaseSponsorsComponent extends WsComponent implements OnInit {

  baseSponsors: Array<BaseSponsor>;
  loading = false;

  constructor(private baseSponsorsService: BaseSponsorsService) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      this.baseSponsorsService.subject.subscribe(baseSponsors => (this.baseSponsors = baseSponsors.base_sponsors)),
      RxjsUtil.loaderSubscriber(this.baseSponsorsService).subscribe(loading => (this.loading = loading))
    );
    this.baseSponsorsService.fetchByEntity(1);
  }

  get initialized() {
    return !!this.baseSponsors;
  }

}
