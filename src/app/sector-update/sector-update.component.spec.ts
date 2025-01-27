import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import {SectorUpdateComponent} from './sector-update.component';
import {TranslateServiceTestingProvider, TranslationMockPipe} from "../../test";
import {RouterTestingModule} from "@angular/router/testing";
import {NgAuthService, WorldskillsAngularLibModule} from "@worldskills/worldskills-angular-lib";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('SectorUpdateComponent', () => {
  let component: SectorUpdateComponent;
  let fixture: ComponentFixture<SectorUpdateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [SectorUpdateComponent, TranslationMockPipe],
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
    fixture = TestBed.createComponent(SectorUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
