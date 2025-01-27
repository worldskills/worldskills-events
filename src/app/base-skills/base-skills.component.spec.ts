import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import {BaseSkillsComponent} from './base-skills.component';
import {RouterTestingModule} from "@angular/router/testing";
import {WorldskillsAngularLibModule} from "@worldskills/worldskills-angular-lib";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import {TranslateServiceTestingProvider, TranslationMockPipe} from "../../test";
import {BaseSponsorsComponent} from "../base-sponsors/base-sponsors.component";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('BaseSkillsComponent', () => {
  let component: BaseSkillsComponent;
  let fixture: ComponentFixture<BaseSkillsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [BaseSkillsComponent, TranslationMockPipe],
    imports: [RouterTestingModule, WorldskillsAngularLibModule],
    providers: [
        TranslateServiceTestingProvider,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
})
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
