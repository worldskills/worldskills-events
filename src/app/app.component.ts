import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {
  PuppeteerBannerComponent,
  BreadcrumbsService,
  Language,
  MenuItem,
  NgAuthService,
  User,
  UserRoleUtil,
  WorldskillsAngularLibService,
  WsiTranslateService
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
  environmentWarning = environment.environmentWarning;

  constructor(
    private appService: AppService,
    private authService: NgAuthService,
    private router: Router,
    private route: ActivatedRoute,
    private breadcrumb: BreadcrumbsService,
    private translateService: TranslateService,
    private wsiTranslate: WsiTranslateService,
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
    this.authService.currentUser.subscribe(currentUser => (this.currentUser = currentUser));

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

    this.wsiTranslate.translator.setDefaultLang('en'); // translation fallback
    this.wsiTranslate.onLangChanged.subscribe(
      lang => this.handleLangChange(lang),
      error => { } // no need to processs language as error, default will be loaded
    );
  }

  handleLangChange(language: Language) {
    window.location.reload();
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
