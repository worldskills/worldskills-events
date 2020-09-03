import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SkillPhotoCreateComponent} from './skill-photo-create.component';
import {TranslateServiceTestingProvider, TranslationMockPipe} from "../../test";
import {RouterTestingModule} from "@angular/router/testing";
import {WorldskillsAngularLibModule} from "@worldskills/worldskills-angular-lib";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('SkillPhotoCreateComponent', () => {
  let component: SkillPhotoCreateComponent;
  let fixture: ComponentFixture<SkillPhotoCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SkillPhotoCreateComponent, TranslationMockPipe],
      imports: [RouterTestingModule, WorldskillsAngularLibModule, HttpClientTestingModule],
      providers: [
        TranslateServiceTestingProvider
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillPhotoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
