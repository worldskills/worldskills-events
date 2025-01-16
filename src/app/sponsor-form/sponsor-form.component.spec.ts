import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import {SponsorFormComponent} from './sponsor-form.component';
import {TranslateServiceTestingProvider, TranslationMockPipe} from "../../test";
import {RouterTestingModule} from "@angular/router/testing";
import {WorldskillsAngularLibModule} from "@worldskills/worldskills-angular-lib";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import {FormsModule} from "@angular/forms";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('SponsorFormComponent', () => {
  let component: SponsorFormComponent;
  let fixture: ComponentFixture<SponsorFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [SponsorFormComponent, TranslationMockPipe],
    imports: [RouterTestingModule, WorldskillsAngularLibModule, FormsModule],
    providers: [
        TranslateServiceTestingProvider,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
})
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorFormComponent);
    component = fixture.componentInstance;
    component.event = {id: 1} as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
