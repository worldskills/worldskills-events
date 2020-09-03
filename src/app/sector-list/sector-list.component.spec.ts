import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SectorListComponent} from './sector-list.component';
import {TranslateServiceTestingProvider, TranslationMockPipe} from "../../test";
import {RouterTestingModule} from "@angular/router/testing";
import {WorldskillsAngularLibModule} from "@worldskills/worldskills-angular-lib";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('SectorListComponent', () => {
  let component: SectorListComponent;
  let fixture: ComponentFixture<SectorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SectorListComponent, TranslationMockPipe],
      imports: [RouterTestingModule, WorldskillsAngularLibModule, HttpClientTestingModule],
      providers: [
        TranslateServiceTestingProvider
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
