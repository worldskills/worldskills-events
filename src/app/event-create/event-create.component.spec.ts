import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import {EventCreateComponent} from './event-create.component';
import {TranslateServiceTestingProvider, TranslationMockPipe} from "../../test";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {WorldskillsAngularLibModule} from "@worldskills/worldskills-angular-lib";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('EventCreateComponent', () => {
  let component: EventCreateComponent;
  let fixture: ComponentFixture<EventCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [EventCreateComponent, TranslationMockPipe],
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
    fixture = TestBed.createComponent(EventCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
