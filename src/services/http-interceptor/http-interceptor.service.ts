import {Injectable, Injector} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AlertService, AlertType, AuthService} from '@worldskills/worldskills-angular-lib';
import {LocaleContextService} from '../locale-context/locale-context.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  private static ignoredPaths: Array<string> = [];
  private currentLanguage = 'en';
  private overrideLanguage: string = undefined;

  constructor(
    private injector: Injector,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
  ) {
    setTimeout(() => {
      this.injector.get(LocaleContextService).subject.subscribe(language => (this.currentLanguage = language.code));
      this.injector.get(LocaleContextService).override.subscribe(language => (this.overrideLanguage = language ? language.code : null));
    });
  }

  ignorePush(path: string) {
    if (!HttpInterceptorService.ignoredPaths.includes(path)) {
      HttpInterceptorService.ignoredPaths.push(path);
    }
  }

  ignorePop(path: string) {
    if (HttpInterceptorService.ignoredPaths.includes(path)) {
      HttpInterceptorService.ignoredPaths = HttpInterceptorService.ignoredPaths.filter(p => p !== path);
    }
  }

  private convertI18nModel(object: any, language: string) {
    if (object) {
      if (typeof object === 'object') {
        if (Array.isArray(object)) {
          for (let i = 0; i < object.length; i++) {
            object[i] = this.convertI18nModel(object[i], language);
          }
        } else {
          if ('text' in object && 'lang_code' in object) {
            object.lang_code = language;
          } else {
            for (let key in object) {
              object[key] = this.convertI18nModel(object[key], language);
            }
          }
        }
      }
    }
    return object;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const l = this.overrideLanguage ? this.overrideLanguage : this.currentLanguage;
    return next.handle(req.clone({
      body: req.body ? this.convertI18nModel(req.body, l) : undefined,
      setParams: {l},
    })).pipe(tap({
      error: (event: HttpErrorResponse) => {
        if (!req.url.startsWith('/assets/') && !HttpInterceptorService.ignoredPaths.includes(req.url)) {
          if (event.status === 404) {
            this.router.navigateByUrl('/not-found', {skipLocationChange: true});
          } else if (event.status === 403) {
            this.authService.login();
          } else if (event.status === 400) {
            this.alertService.setAlert('request', AlertType.error, event.error, undefined,
              'user_msg' in event.error ? event.error.user_msg : event.message, true);
          } else {
            if (event.error && 'user_msg' in event.error) {
              this.alertService.setAlert('request', AlertType.error, event.error, undefined,
                'user_msg' in event.error ? event.error.user_msg : event.message, true);
            } else {
              this.alertService.setError('request', event.error, event.statusText, event.message);
            }
          }
        }
      }
    }));
  }


}
