import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertService, AlertType, LOADER_ONLY, WsComponent} from "@worldskills/worldskills-angular-lib";
import {EventService} from "../../services/event/event.service";
import {SkillService} from "../../services/skill/skill.service";
import {SkillSponsorsService} from "../../services/skill-sponsors/skill-sponsors.service";
import {SkillSponsorService} from "../../services/skill-sponsor/skill-sponsor.service";
import {UiSkillService} from "../../services/ui-skill/ui-skill.service";
import {combineLatest} from "rxjs";
import {map} from "rxjs/operators";
import {Event} from "../../types/event";
import {Skill} from "../../types/skill";
import {Sponsor} from "../../types/sponsor";
import {TranslateService} from "@ngx-translate/core";
import {faTimes, faCaretDown, faCaretUp, faStar} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-skill-sponsors',
  templateUrl: './skill-sponsors.component.html',
  styleUrls: ['./skill-sponsors.component.css']
})
export class SkillSponsorsComponent extends WsComponent implements OnInit {

  event: Event;
  skill: Skill;
  sponsors: Array<Sponsor>;
  loading = false;
  @ViewChild('button', {static: true}) button;
  faTimes = faTimes;
  faCaretDown = faCaretDown;
  faCaretUp = faCaretUp;
  faStar = faStar;

  constructor(
    private eventService: EventService,
    private skillService: SkillService,
    private skillSponsorsService: SkillSponsorsService,
    private skillSponsorService: SkillSponsorService,
    private alertService: AlertService,
    private translateService: TranslateService,
    private uiSkillService: UiSkillService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.uiSkillService.subject.next(this.button);
    this.subscribe(
      this.eventService.subject.subscribe(event => {
        this.event = event;
        this.skillSponsorsService.fetch(this.event.id);
      }),
      this.skillService.subject.subscribe(skill => (this.skill = skill)),
      this.skillSponsorsService.subject.subscribe(sponsors => (this.sponsors = sponsors.sponsors)),
      combineLatest([
        this.eventService.loading,
        this.skillService.loading,
        this.skillSponsorsService.loading,
        this.skillSponsorService.loading,
      ])
        .pipe(map(ls => !ls.every(l => !l)))
        .subscribe(loading => (this.loading = loading))
    );
  }

  get initialized() {
    return !!this.event && !!this.skill && !!this.sponsors;
  }

  get filteredSponsors() {
    return !!this.sponsors && !!this.skill ? this.sponsors.filter(s => !this.skill.sponsors.some(s2 => s.id === s2.id)) : [];
  }

  get featuredSponsors() {
    return !!this.skill ? this.skill.sponsors.filter(s => s.sort === 0) : [];
  }

  get unfeaturedSponsors() {
    return !!this.skill ? this.skill.sponsors.filter(s => s.sort > 0) : [];
  }

  bind(sponsor: Sponsor) {
    this.skillSponsorService.bind(this.event.id, this.skill.id, sponsor.id, {
      ...sponsor,
      sort: this.skill.sponsors.reduce((acc, s) => s.sort > acc ? s.sort : acc, 0) + 1
    }).subscribe(() => {
      this.translateService.get('The Sponsor has been bound successfully.').subscribe(t => {
        this.alertService.setAlert('bound-sponsor', AlertType.success,
          null, undefined, t, true);
        this.skillService.fetch(this.event.id, this.skill.id);
      });
    });
  }

  unbind(sponsor: Sponsor) {
    this.skillSponsorService.unbind(this.event.id, this.skill.id, sponsor.id).subscribe(() => {
      this.translateService.get('The Sponsor has been unbound successfully.').subscribe(t => {
        this.alertService.setAlert('unbound-sponsor', AlertType.success,
          null, undefined, t, true);
        this.skillService.fetch(this.event.id, this.skill.id);
      });
    });
  }

  feature(sponsor: Sponsor) {
    this.skillSponsorService.bind(this.event.id, this.skill.id, sponsor.id, {
      ...sponsor,
      sort: 0,
    }).subscribe(() => {
      this.skillService.fetch(this.event.id, this.skill.id);
    });
  }

  unfeature(sponsor: Sponsor) {
    this.skillSponsorService.bind(this.event.id, this.skill.id, sponsor.id, {
      ...sponsor,
      sort: this.skill.sponsors.reduce((acc, s) => s.sort > acc ? s.sort : acc, 0) + 1,
    }).subscribe(() => {
      this.skillService.fetch(this.event.id, this.skill.id);
    });
  }

  move(down: Sponsor, up: Sponsor) {
    combineLatest([
      this.skillSponsorService.update(this.event.id, this.skill.id, down.id, {...down, sort: up.sort}, LOADER_ONLY),
      this.skillSponsorService.update(this.event.id, this.skill.id, up.id, {...up, sort: down.sort}, LOADER_ONLY),
    ])
      .subscribe(() => {
        this.skillService.fetch(this.event.id, this.skill.id);
      });
  }


}
