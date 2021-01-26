import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {combineLatest} from 'rxjs';
import {
  BreadcrumbsService,
  Language,
  MenuItem,
  NgAuthService,
  User,
  UserRoleUtil,
  WorldskillsAngularLibService
} from '@worldskills/worldskills-angular-lib';
import {LocaleContextService} from '../services/locale-context/locale-context.service';
import {environment} from '../environments/environment';
import {TranslateService} from '@ngx-translate/core';
import {AppService} from "../services/app/app.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  date;
  currentUser: User;
  showBreadcrumb = true;
  languages: Array<Language>;
  language: Language;
  languageLock: boolean;
  environmentWarning = environment.environmentWarning;

  constructor(
    private appService: AppService,
    private authService: NgAuthService,
    private router: Router,
    private route: ActivatedRoute,
    private breadcrumb: BreadcrumbsService,
    private translateService: TranslateService,
    private localeContextService: LocaleContextService,
    private wsi: WorldskillsAngularLibService,
  ) {
    this.date = new Date();
    this.breadcrumb.homeItemRoute = '/events';
    this.breadcrumb.targetOutlet = 'primary';
    this.breadcrumb.build(this.route.root);
  }

  ngOnInit(): void {
    this.appService.showBreadcrumbs.subscribe(showBreadcrumb => setTimeout(() => (this.showBreadcrumb = showBreadcrumb)));
    this.languages = this.localeContextService.languages;
    this.authService.currentUser.subscribe(currentUser => (this.currentUser = currentUser)),
      combineLatest([this.localeContextService.subject, this.localeContextService.lock])
        .subscribe(([language, lock]) =>
          setTimeout(() => {
            this.languageLock = lock;
            this.language = lock ? this.localeContextService.lockedLanguage : language;
          })
        );

    this.wsi.authConfigSubject.next({
      loginUrl: environment.worldskillsAuthorizeUrl,
      redirectUri: environment.worldskillsAuthorizeRedirect,
      userinfoEndpoint: environment.worldskillsAuthorizeUserinfoEndpoint,
      clientId: environment.worldskillsClientId,
      requireHttps: environment.production,
      oidc: false
    });

    this.wsi.httpConfigSubject.next({
      encoderUriPatterns: [],
      authUriPatterns: environment.worldskillsAuthUriPatterns
    });

    this.wsi.serviceConfigSubject.next({
      appCode: [environment.worldskillsAppId],
      apiEndpoint: environment.worldskillsApi
    });
  }

  changeLanguage(language) {
    this.localeContextService.changeLanguage(language);
  }

  get menuItems(): Array<MenuItem> {
    const menuItems = [];
    if (UserRoleUtil.userHasRoles(this.currentUser, environment.worldskillsAppId, 'Admin', 'EditBaseSkills')) {
      menuItems.push({
        label: 'Base Skills',
        url: '/base-skills',
        requiredRoles: [],
      });
    }
    if (UserRoleUtil.userHasRoles(this.currentUser, environment.worldskillsAppId, 'Admin', 'EditBaseSponsors')) {
      menuItems.push({
        label: 'Base Sponsors',
        url: '/base-sponsors',
        requiredRoles: [],
      });
    }
    return menuItems;
  }

}
