import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import {SectorCreateComponent} from './sector-create.component';
import {TranslateServiceTestingProvider, TranslationMockPipe} from "../../test";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {EntityTreeService, WorldskillsAngularLibModule} from "@worldskills/worldskills-angular-lib";
import {of} from "rxjs";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('SectorCreateComponent', () => {
  let component: SectorCreateComponent;
  let fixture: ComponentFixture<SectorCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [SectorCreateComponent, TranslationMockPipe],
    imports: [RouterTestingModule, WorldskillsAngularLibModule],
    providers: [
        { provide: EntityTreeService, useValue: { list: (fetchParams: any) => of([]), clearCache: () => undefined } },
        TranslateServiceTestingProvider,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
})
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectorCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
