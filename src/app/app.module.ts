import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {WorldskillsAngularLibModule, WsHttpInterceptor} from '@worldskills/worldskills-angular-lib';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {ErrorComponent} from './error/error.component';
import {OAuthModule} from 'angular-oauth2-oidc';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';
import {HttpInterceptorService} from '../services/http-interceptor/http-interceptor.service';
import {WsSpinnerComponent} from './ws-spinner/ws-spinner.component';
import {EventsComponent} from './events/events.component';
import {EventsSearchFormComponent} from './events-search-form/events-search-form.component';
import {EventComponent} from './event/event.component';
import {EventFormComponent} from './event-form/event-form.component';
import {EventUpdateComponent} from './event-update/event-update.component';
import {SkillsComponent} from './skills/skills.component';
import {SkillComponent} from './skill/skill.component';
import {SkillUpdateComponent} from './skill-update/skill-update.component';
import {SkillFormComponent} from './skill-form/skill-form.component';
import {SkillPhotosComponent} from './skill-photos/skill-photos.component';
import {SkillTagsComponent} from './skill-tags/skill-tags.component';
import {SkillSponsorsComponent} from './skill-sponsors/skill-sponsors.component';
import {SkillCopyComponent} from './skill-copy/skill-copy.component';
import {SectorListComponent} from './sector-list/sector-list.component';
import {SectorFormComponent} from './sector-form/sector-form.component';
import {SectorUpdateComponent} from './sector-update/sector-update.component';
import {SectorCreateComponent} from './sector-create/sector-create.component';
import {TagsComponent} from './tags/tags.component';
import {TagFormComponent} from './tag-form/tag-form.component';
import {TagUpdateComponent} from './tag-update/tag-update.component';
import {TagCreateComponent} from './tag-create/tag-create.component';
import {SponsorsComponent} from './sponsors/sponsors.component';
import {SponsorCreateComponent} from './sponsor-create/sponsor-create.component';
import {SponsorUpdateComponent} from './sponsor-update/sponsor-update.component';
import {SponsorFormComponent} from './sponsor-form/sponsor-form.component';
import {EventCreateComponent} from './event-create/event-create.component';
import {SkillCreateComponent} from './skill-create/skill-create.component';
import {SkillPhotoFormComponent} from './skill-photo-form/skill-photo-form.component';
import {SkillPhotoCreateComponent} from './skill-photo-create/skill-photo-create.component';
import {SkillPhotoUpdateComponent} from './skill-photo-update/skill-photo-update.component';
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {SectorsComponent} from './sectors/sectors.component';
import {BaseSkillFormComponent} from './base-skill-form/base-skill-form.component';
import {BaseSkillUpdateComponent} from './base-skill-update/base-skill-update.component';
import {BaseSkillComponent} from './base-skill/base-skill.component';
import {BaseSkillsComponent} from './base-skills/base-skills.component';
import {BaseSponsorUpdateComponent} from './base-sponsor-update/base-sponsor-update.component';
import {BaseSponsorCreateComponent} from './base-sponsor-create/base-sponsor-create.component';
import {BaseSponsorsComponent} from './base-sponsors/base-sponsors.component';
import {BaseSkillPhotoCreateComponent} from "./base-skill-photo-create/base-skill-photo-create.component";
import {BaseSkillPhotoUpdateComponent} from "./base-skill-photo-update/base-skill-photo-update.component";
import {BaseSkillPhotosComponent} from "./base-skill-photos/base-skill-photos.component";
import {BaseSkillTagsComponent} from "./base-skill-tags/base-skill-tags.component";
import {BaseSkillSponsorsComponent} from "./base-skill-sponsors/base-skill-sponsors.component";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorComponent,
    WsSpinnerComponent,
    EventsComponent,
    EventsSearchFormComponent,
    EventComponent,
    EventFormComponent,
    EventUpdateComponent,
    SkillsComponent,
    SkillComponent,
    SkillUpdateComponent,
    SkillFormComponent,
    SkillPhotosComponent,
    SkillTagsComponent,
    SkillSponsorsComponent,
    SkillCopyComponent,
    SectorListComponent,
    SectorFormComponent,
    SectorUpdateComponent,
    SectorCreateComponent,
    TagsComponent,
    TagFormComponent,
    TagUpdateComponent,
    TagCreateComponent,
    SponsorsComponent,
    SponsorCreateComponent,
    SponsorUpdateComponent,
    SponsorFormComponent,
    EventCreateComponent,
    SkillCreateComponent,
    SkillPhotoFormComponent,
    SkillPhotoCreateComponent,
    SkillPhotoUpdateComponent,
    SectorsComponent,
    BaseSkillFormComponent,
    BaseSkillUpdateComponent,
    BaseSkillComponent,
    BaseSkillsComponent,
    BaseSponsorUpdateComponent,
    BaseSponsorCreateComponent,
    BaseSponsorsComponent,
    BaseSkillPhotosComponent,
    BaseSkillPhotoCreateComponent,
    BaseSkillPhotoUpdateComponent,
    BaseSkillTagsComponent,
    BaseSkillSponsorsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OAuthModule.forRoot(),
    WorldskillsAngularLibModule,
    NgSelectModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    CKEditorModule,
  ],
  providers: [
    DatePipe,
    {provide: HTTP_INTERCEPTORS, useClass: WsHttpInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
