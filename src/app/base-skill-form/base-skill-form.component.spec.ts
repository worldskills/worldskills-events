import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BaseSkillFormComponent} from './base-skill-form.component';
import {RouterTestingModule} from "@angular/router/testing";
import {WorldskillsAngularLibModule} from "@worldskills/worldskills-angular-lib";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {TranslateServiceTestingProvider, TranslationMockPipe} from "../../test";
import {BaseSponsorsComponent} from "../base-sponsors/base-sponsors.component";

describe('BaseSkillFormComponent', () => {
  let component: BaseSkillFormComponent;
  let fixture: ComponentFixture<BaseSkillFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BaseSkillFormComponent, TranslationMockPipe],
      imports: [RouterTestingModule, WorldskillsAngularLibModule, HttpClientTestingModule],
      providers: [
        TranslateServiceTestingProvider
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseSkillFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
