import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BaseSkillTagsComponent} from './base-skill-tags.component';
import {TranslateServiceTestingProvider, TranslationMockPipe} from "../../test";
import {RouterTestingModule} from "@angular/router/testing";
import {WorldskillsAngularLibModule} from "@worldskills/worldskills-angular-lib";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('BaseSkillTagsComponent', () => {
  let component: BaseSkillTagsComponent;
  let fixture: ComponentFixture<BaseSkillTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BaseSkillTagsComponent, TranslationMockPipe],
      imports: [RouterTestingModule, WorldskillsAngularLibModule, HttpClientTestingModule],
      providers: [
        TranslateServiceTestingProvider
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseSkillTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
