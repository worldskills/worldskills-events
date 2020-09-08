import {Component, OnInit} from '@angular/core';
import {BaseSponsorRequest} from "../../types/base-sponsor";
import {BaseSponsorService} from "../../services/base-sponsor/base-sponsor.service";
import {AlertService, AlertType, WsComponent} from "@worldskills/worldskills-angular-lib";
import {TranslateService} from "@ngx-translate/core";
import {combineLatest} from "rxjs";
import {map} from "rxjs/operators";
import {Router} from "@angular/router";
import {SponsorRequest} from "../../types/sponsor";

@Component({
  selector: 'app-base-sponsor-create',
  templateUrl: './base-sponsor-create.component.html',
  styleUrls: ['./base-sponsor-create.component.css']
})
export class BaseSponsorCreateComponent extends WsComponent implements OnInit {

  loading = false;

  constructor(
    private baseSponsorService: BaseSponsorService,
    private alertService: AlertService,
    private translateService: TranslateService,
    private router: Router,
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      combineLatest([
        this.baseSponsorService.loading,
      ])
        .pipe(map(ls => !ls.every(l => !l)))
        .subscribe(loading => (this.loading = loading))
    );
  }

  get initialized() {
    return true
  }

  save(request: SponsorRequest) {
    this.baseSponsorService.create(request as any).subscribe(() => {
      this.translateService.get('The Base Sponsor has been created successfully.').subscribe(t => {
        this.alertService.setAlert('created-base-sponsor', AlertType.success,
          null, t, true);
        this.router.navigate(['/base-sponsors']);
      });
    });
  }

}
