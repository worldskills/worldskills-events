import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import {SectorFormComponent} from './sector-form.component';
import {TranslateServiceTestingProvider, TranslationMockPipe} from "../../test";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {WorldskillsAngularLibModule} from "@worldskills/worldskills-angular-lib";
import {FormsModule} from "@angular/forms";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('SectorFormComponent', () => {
  let component: SectorFormComponent;
  let fixture: ComponentFixture<SectorFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [SectorFormComponent, TranslationMockPipe],
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
    fixture = TestBed.createComponent(SectorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
