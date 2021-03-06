import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EventsComponent} from './events.component';
import {TranslateServiceTestingProvider, TranslationMockPipe} from "../../test";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {NgAuthService, WorldskillsAngularLibModule} from "@worldskills/worldskills-angular-lib";

describe('EventsComponent', () => {
  let component: EventsComponent;
  let fixture: ComponentFixture<EventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EventsComponent, TranslationMockPipe],
      imports: [RouterTestingModule, WorldskillsAngularLibModule, HttpClientTestingModule],
      providers: [
        {provide: NgAuthService, useValue: {currentUser: {subscribe: () => undefined}}},
        TranslateServiceTestingProvider
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
