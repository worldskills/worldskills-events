import { TestBed, waitForAsync as  } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {NgAuthService, WorldskillsAngularLibModule} from '@worldskills/worldskills-angular-lib';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {TranslateServiceTestingProvider, TranslationMockPipe} from '../test';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [AppComponent, TranslationMockPipe],
    imports: [RouterTestingModule, WorldskillsAngularLibModule],
    providers: [
        { provide: NgAuthService, useValue: { currentUser: { subscribe: () => undefined } } },
        TranslateServiceTestingProvider,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
}).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
