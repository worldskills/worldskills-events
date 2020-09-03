import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SkillPhotoFormComponent} from './skill-photo-form.component';
import {TranslateServiceTestingProvider, TranslationMockPipe} from "../../test";
import {RouterTestingModule} from "@angular/router/testing";
import {WorldskillsAngularLibModule} from "@worldskills/worldskills-angular-lib";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormsModule} from "@angular/forms";

describe('SkillPhotoFormComponent', () => {
  let component: SkillPhotoFormComponent;
  let fixture: ComponentFixture<SkillPhotoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SkillPhotoFormComponent, TranslationMockPipe],
      imports: [RouterTestingModule, WorldskillsAngularLibModule, HttpClientTestingModule, FormsModule],
      providers: [
        TranslateServiceTestingProvider
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillPhotoFormComponent);
    component = fixture.componentInstance;
    component.event = {id: 1} as any;
    component.skill = {id: 1} as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
