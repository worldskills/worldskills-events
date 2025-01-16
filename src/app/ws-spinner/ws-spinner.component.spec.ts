import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import {WsSpinnerComponent} from './ws-spinner.component';
import {TranslateServiceTestingProvider, TranslationMockPipe} from '../../test';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('WsSpinnerComponent', () => {
  let component: WsSpinnerComponent;
  let fixture: ComponentFixture<WsSpinnerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [WsSpinnerComponent, TranslationMockPipe],
    imports: [RouterTestingModule],
    providers: [TranslateServiceTestingProvider, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WsSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
