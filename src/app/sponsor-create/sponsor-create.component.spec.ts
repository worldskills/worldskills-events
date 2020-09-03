import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SponsorCreateComponent} from './sponsor-create.component';
import {TranslateServiceTestingProvider, TranslationMockPipe} from "../../test";
import {RouterTestingModule} from "@angular/router/testing";
import {WorldskillsAngularLibModule} from "@worldskills/worldskills-angular-lib";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('SponsorCreateComponent', () => {
  let component: SponsorCreateComponent;
  let fixture: ComponentFixture<SponsorCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SponsorCreateComponent, TranslationMockPipe],
      imports: [RouterTestingModule, WorldskillsAngularLibModule, HttpClientTestingModule],
      providers: [
        TranslateServiceTestingProvider
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
