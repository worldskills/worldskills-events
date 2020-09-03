import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SkillSponsorsComponent} from './skill-sponsors.component';
import {TranslateServiceTestingProvider, TranslationMockPipe} from "../../test";
import {RouterTestingModule} from "@angular/router/testing";
import {WorldskillsAngularLibModule} from "@worldskills/worldskills-angular-lib";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('SkillSponsorsComponent', () => {
  let component: SkillSponsorsComponent;
  let fixture: ComponentFixture<SkillSponsorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SkillSponsorsComponent, TranslationMockPipe],
      imports: [RouterTestingModule, WorldskillsAngularLibModule, HttpClientTestingModule],
      providers: [
        TranslateServiceTestingProvider
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillSponsorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
