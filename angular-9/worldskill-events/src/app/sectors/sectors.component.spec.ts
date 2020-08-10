import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SectorsComponent} from './sectors.component';
import {TranslateServiceTestingProvider, TranslationMockPipe} from "../../test";
import {RouterTestingModule} from "@angular/router/testing";
import {WorldskillsAngularLibModule} from "@worldskills/worldskills-angular-lib";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AuthService} from "../../services/auth/auth.service";

describe('SectorsComponent', () => {
  let component: SectorsComponent;
  let fixture: ComponentFixture<SectorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SectorsComponent, TranslationMockPipe],
      imports: [RouterTestingModule, WorldskillsAngularLibModule, HttpClientTestingModule],
      providers: [
        {provide: AuthService, useValue: {authStatus: {subscribe: () => undefined}}},
        TranslateServiceTestingProvider
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
