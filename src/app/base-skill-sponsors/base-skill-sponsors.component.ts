import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertService, AlertType, RxjsUtil, WsComponent} from "@worldskills/worldskills-angular-lib";
import {BaseSkillService} from "../../services/base-skill/base-skill.service";
import {BaseSkillSponsorService} from "../../services/base-skill-sponsor/base-skill-sponsor.service";
import {BaseSkill} from "../../types/base-skill";
import {TranslateService} from "@ngx-translate/core";
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {BaseSponsorsService} from "../../services/base-sponsors/base-sponsors.service";
import {BaseSponsor} from "../../types/base-sponsor";

@Component({
  selector: 'app-base-skill-sponsors',
  templateUrl: './base-skill-sponsors.component.html',
  styleUrls: ['./base-skill-sponsors.component.css']
})
export class BaseSkillSponsorsComponent extends WsComponent implements OnInit {

  baseSkill: BaseSkill;
  baseSponsors: Array<BaseSponsor>;
  loading = false;
  @ViewChild('button', {static: true}) button;
  faTimes = faTimes;

  constructor(
    private baseSkillService: BaseSkillService,
    private baseSponsorsService: BaseSponsorsService,
    private baseSkillSponsorService: BaseSkillSponsorService,
    private alertService: AlertService,
    private translateService: TranslateService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      this.baseSkillService.subject.subscribe(baseSkill => (this.baseSkill = baseSkill)),
      this.baseSponsorsService.subject.subscribe(baseSponsors => (this.baseSponsors = baseSponsors.base_sponsors)),
      RxjsUtil.loaderSubscriber(
        this.baseSkillService,
        this.baseSponsorsService,
        this.baseSkillSponsorService,
      ).subscribe(loading => (this.loading = loading))
    );
    this.baseSponsorsService.fetchByEntity(1);
  }

  get initialized() {
    return !!this.baseSkill && !!this.baseSponsors;
  }

  get filteredSponsors() {
    return !!this.baseSponsors && !!this.baseSkill ? this.baseSponsors.filter(s => !this.baseSkill.sponsors.some(s2 => s.id === s2.id)) : [];
  }

  bind(sponsor: BaseSponsor) {
    this.baseSkillSponsorService.bind(this.baseSkill.id, sponsor.id, sponsor).subscribe(() => {
      this.translateService.get('The Sponsor has been bound successfully.').subscribe(t => {
        this.alertService.setAlert('bound-sponsor', AlertType.success,
          null, t, true);
        this.baseSkillService.fetch(this.baseSkill.id);
      });
    });
  }

  unbind(sponsor: BaseSponsor) {
    this.baseSkillSponsorService.unbind(this.baseSkill.id, sponsor.id).subscribe(() => {
      this.translateService.get('The Sponsor has been unbound successfully.').subscribe(t => {
        this.alertService.setAlert('unbound-sponsor', AlertType.success,
          null, t, true);
        this.baseSkillService.fetch(this.baseSkill.id);
      });
    });
  }

}
