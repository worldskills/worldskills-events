import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SponsorUpdateComponent} from './sponsor-update.component';
import {TranslateServiceTestingProvider, TranslationMockPipe} from "../../test";
import {RouterTestingModule} from "@angular/router/testing";
import {NgAuthService, WorldskillsAngularLibModule} from "@worldskills/worldskills-angular-lib";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('SponsorUpdateComponent', () => {
  let component: SponsorUpdateComponent;
  let fixture: ComponentFixture<SponsorUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SponsorUpdateComponent, TranslationMockPipe],
      imports: [RouterTestingModule, WorldskillsAngularLibModule, HttpClientTestingModule],
      providers: [
        {provide: NgAuthService, useValue: {currentUser: {subscribe: () => undefined}}},
        TranslateServiceTestingProvider
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
