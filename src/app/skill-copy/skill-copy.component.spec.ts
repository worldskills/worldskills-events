import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SkillCopyComponent} from './skill-copy.component';
import {TranslateServiceTestingProvider, TranslationMockPipe} from "../../test";
import {RouterTestingModule} from "@angular/router/testing";
import {WorldskillsAngularLibModule} from "@worldskills/worldskills-angular-lib";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('SkillCopyComponent', () => {
  let component: SkillCopyComponent;
  let fixture: ComponentFixture<SkillCopyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SkillCopyComponent, TranslationMockPipe],
      imports: [RouterTestingModule, WorldskillsAngularLibModule, HttpClientTestingModule],
      providers: [
        TranslateServiceTestingProvider
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillCopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
