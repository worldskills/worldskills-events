import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SkillPhotoUpdateComponent} from './skill-photo-update.component';
import {TranslateServiceTestingProvider, TranslationMockPipe} from "../../test";
import {RouterTestingModule} from "@angular/router/testing";
import {WorldskillsAngularLibModule} from "@worldskills/worldskills-angular-lib";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AuthService} from "../../services/auth/auth.service";

describe('SkillPhotoUpdateComponent', () => {
  let component: SkillPhotoUpdateComponent;
  let fixture: ComponentFixture<SkillPhotoUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SkillPhotoUpdateComponent, TranslationMockPipe],
      imports: [RouterTestingModule, WorldskillsAngularLibModule, HttpClientTestingModule],
      providers: [
        {provide: AuthService, useValue: {authStatus: {subscribe: () => undefined}}},
        TranslateServiceTestingProvider
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillPhotoUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
