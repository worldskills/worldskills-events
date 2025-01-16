import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import {EventsSearchFormComponent} from './events-search-form.component';
import {TranslateServiceTestingProvider, TranslationMockPipe} from "../../test";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {WorldskillsAngularLibModule} from "@worldskills/worldskills-angular-lib";
import {FormsModule} from "@angular/forms";

describe('EventsSearchFormComponent', () => {
  let component: EventsSearchFormComponent;
  let fixture: ComponentFixture<EventsSearchFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EventsSearchFormComponent, TranslationMockPipe],
      imports: [RouterTestingModule, WorldskillsAngularLibModule, HttpClientTestingModule, FormsModule],
      providers: [
        TranslateServiceTestingProvider
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
