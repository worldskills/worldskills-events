import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import {BaseSponsorCreateComponent} from './base-sponsor-create.component';
import {RouterTestingModule} from "@angular/router/testing";
import {WorldskillsAngularLibModule} from "@worldskills/worldskills-angular-lib";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import {TranslateServiceTestingProvider, TranslationMockPipe} from "../../test";
import {BaseSponsorsComponent} from "../base-sponsors/base-sponsors.component";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('BaseSponsorCreateComponent', () => {
  let component: BaseSponsorCreateComponent;
  let fixture: ComponentFixture<BaseSponsorCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [BaseSponsorCreateComponent, TranslationMockPipe],
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
    fixture = TestBed.createComponent(BaseSponsorCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
