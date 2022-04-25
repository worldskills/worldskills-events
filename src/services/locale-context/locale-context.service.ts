import {Injectable} from '@angular/core';
import {combineLatest, ReplaySubject} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {WsiTranslateService, Language, LangUtil} from "@worldskills/worldskills-angular-lib";

@Injectable({
  providedIn: 'root'
})
export class LocaleContextService {

  subject = new ReplaySubject<Language>(1);
  override = new ReplaySubject<Language>(1);
  effectiveOverriddenLanguage = new ReplaySubject<Language>(1);

  constructor(
    private wsiTranslate: WsiTranslateService,
  ) {
    this.subject.next(this.wsiTranslate.getSelectedLanguage());
    this.override.next(null);
    combineLatest([this.subject, this.override]).subscribe(([s, o]) => {
      this.effectiveOverriddenLanguage.next(o || s);
    });
  }

  get languages(): Array<Language> {
    return LangUtil.getDefaultLanguages();;
  }

}
