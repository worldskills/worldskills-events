import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import {BaseSponsorUpdateComponent} from './base-sponsor-update.component';
import {RouterTestingModule} from "@angular/router/testing";
import {WorldskillsAngularLibModule} from "@worldskills/worldskills-angular-lib";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import {TranslateServiceTestingProvider, TranslationMockPipe} from "../../test";
import {BaseSponsorsComponent} from "../base-sponsors/base-sponsors.component";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('BaseSponsorUpdateComponent', () => {
  let component: BaseSponsorUpdateComponent;
  let fixture: ComponentFixture<BaseSponsorUpdateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [BaseSponsorUpdateComponent, TranslationMockPipe],
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
    fixture = TestBed.createComponent(BaseSponsorUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
