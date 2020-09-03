import {Component, OnInit} from '@angular/core';
// import {AuthService, AuthStatus} from '../services/auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {combineLatest, Subject} from 'rxjs';
import {
  BreadcrumbsService,
  Language,
  NgAuthService,
  User,
  WorldskillsAngularLibService
} from '@worldskills/worldskills-angular-lib';
import {LocaleContextService} from '../services/locale-context/locale-context.service';
import {environment} from '../environments/environment';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  static showBreadcrumbs = new Subject<boolean>();
  date;
  currentUser: User;
  showBreadcrumb = true;
  languages: Array<Language>;
  language: Language;
  languageLock: boolean;
  isStaging = false;

  constructor(
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
    AppComponent.showBreadcrumbs.subscribe(showBreadcrumb => setTimeout(() => (this.showBreadcrumb = showBreadcrumb)));
    this.languages = this.localeContextService.languages;
    this.authService.currentUser.subscribe(currentUser => (this.currentUser = currentUser)),
      combineLatest([this.localeContextService.subject, this.localeContextService.lock])
        .subscribe(([language, lock]) =>
          setTimeout(() => {
            this.languageLock = lock;
            this.language = lock ? this.localeContextService.lockedLanguage : language;
          })
        );
    this.isStaging = !environment.production;

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
      appCode: [environment.worldskillsAppId, environment.worldskillsPeopleAppId],
      apiEndpoint: environment.worldskillsApi
    });
  }

  changeLanguage(language) {
    this.localeContextService.changeLanguage(language);
  }

}