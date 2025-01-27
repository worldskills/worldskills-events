import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import {HomeComponent} from './home.component';
import {TranslateServiceTestingProvider, TranslationMockPipe} from '../../test';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {NgAuthService, WorldskillsAngularLibModule} from "@worldskills/worldskills-angular-lib";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [HomeComponent, TranslationMockPipe],
    imports: [RouterTestingModule, WorldskillsAngularLibModule],
    providers: [
        {
            provide: NgAuthService, useValue: {
                currentUser: {
                    subscribe: () => undefined
                },
                isLoggedIn: () => false,
                login: () => undefined,
            }
        },
        TranslateServiceTestingProvider,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
})
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
