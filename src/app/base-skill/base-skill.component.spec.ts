import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import {BaseSkillComponent} from './base-skill.component';
import {RouterTestingModule} from "@angular/router/testing";
import {WorldskillsAngularLibModule} from "@worldskills/worldskills-angular-lib";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import {TranslateServiceTestingProvider, TranslationMockPipe} from "../../test";
import {BaseSponsorsComponent} from "../base-sponsors/base-sponsors.component";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('BaseSkillComponent', () => {
  let component: BaseSkillComponent;
  let fixture: ComponentFixture<BaseSkillComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [BaseSkillComponent, TranslationMockPipe],
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
    fixture = TestBed.createComponent(BaseSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
