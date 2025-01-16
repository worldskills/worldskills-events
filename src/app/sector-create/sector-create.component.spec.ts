import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import {SectorCreateComponent} from './sector-create.component';
import {TranslateServiceTestingProvider, TranslationMockPipe} from "../../test";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {EntityTreeService, WorldskillsAngularLibModule} from "@worldskills/worldskills-angular-lib";
import {of} from "rxjs";

describe('SectorCreateComponent', () => {
  let component: SectorCreateComponent;
  let fixture: ComponentFixture<SectorCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SectorCreateComponent, TranslationMockPipe],
      imports: [RouterTestingModule, WorldskillsAngularLibModule, HttpClientTestingModule],
      providers: [
        {provide: EntityTreeService, useValue: {list: (fetchParams: any) => of([]), clearCache: () => undefined}},
        TranslateServiceTestingProvider
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
