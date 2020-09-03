import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SkillFormComponent} from './skill-form.component';
import {TranslateServiceTestingProvider, TranslationMockPipe} from "../../test";
import {RouterTestingModule} from "@angular/router/testing";
import {WorldskillsAngularLibModule} from "@worldskills/worldskills-angular-lib";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormsModule} from "@angular/forms";

describe('SkillFormComponent', () => {
  let component: SkillFormComponent;
  let fixture: ComponentFixture<SkillFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SkillFormComponent, TranslationMockPipe],
      imports: [RouterTestingModule, WorldskillsAngularLibModule, HttpClientTestingModule, FormsModule],
      providers: [
        TranslateServiceTestingProvider
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillFormComponent);
    component = fixture.componentInstance;
    component.event = {ws_entity: {id: 1}} as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
