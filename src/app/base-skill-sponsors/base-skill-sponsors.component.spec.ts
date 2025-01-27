import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import {BaseSkillSponsorsComponent} from './base-skill-sponsors.component';
import {TranslateServiceTestingProvider, TranslationMockPipe} from "../../test";
import {RouterTestingModule} from "@angular/router/testing";
import {WorldskillsAngularLibModule} from "@worldskills/worldskills-angular-lib";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('BaseSkillSponsorsComponent', () => {
  let component: BaseSkillSponsorsComponent;
  let fixture: ComponentFixture<BaseSkillSponsorsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [BaseSkillSponsorsComponent, TranslationMockPipe],
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
    fixture = TestBed.createComponent(BaseSkillSponsorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
