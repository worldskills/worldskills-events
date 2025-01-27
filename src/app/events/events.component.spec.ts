import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import {EventsComponent} from './events.component';
import {TranslateServiceTestingProvider, TranslationMockPipe} from "../../test";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {NgAuthService, WorldskillsAngularLibModule} from "@worldskills/worldskills-angular-lib";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('EventsComponent', () => {
  let component: EventsComponent;
  let fixture: ComponentFixture<EventsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [EventsComponent, TranslationMockPipe],
    imports: [RouterTestingModule, WorldskillsAngularLibModule],
    providers: [
        { provide: NgAuthService, useValue: { currentUser: { subscribe: () => undefined } } },
        TranslateServiceTestingProvider,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
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
