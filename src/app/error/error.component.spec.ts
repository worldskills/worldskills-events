import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import {ErrorComponent} from './error.component';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateServiceTestingProvider, TranslationMockPipe} from '../../test';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ErrorComponent', () => {
  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [ErrorComponent, TranslationMockPipe],
    imports: [RouterTestingModule],
    providers: [TranslateServiceTestingProvider, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
