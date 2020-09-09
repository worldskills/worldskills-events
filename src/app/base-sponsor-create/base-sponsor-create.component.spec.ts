import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BaseSponsorCreateComponent} from './base-sponsor-create.component';
import {RouterTestingModule} from "@angular/router/testing";
import {WorldskillsAngularLibModule} from "@worldskills/worldskills-angular-lib";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {TranslateServiceTestingProvider, TranslationMockPipe} from "../../test";
import {BaseSponsorsComponent} from "../base-sponsors/base-sponsors.component";

describe('BaseSponsorCreateComponent', () => {
  let component: BaseSponsorCreateComponent;
  let fixture: ComponentFixture<BaseSponsorCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BaseSponsorCreateComponent, TranslationMockPipe],
      imports: [RouterTestingModule, WorldskillsAngularLibModule, HttpClientTestingModule],
      providers: [
        TranslateServiceTestingProvider
      ],
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
