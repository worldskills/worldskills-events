import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SectorFormComponent} from './sector-form.component';
import {TranslateServiceTestingProvider, TranslationMockPipe} from "../../test";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {WorldskillsAngularLibModule} from "@worldskills/worldskills-angular-lib";
import {FormsModule} from "@angular/forms";

describe('SectorFormComponent', () => {
  let component: SectorFormComponent;
  let fixture: ComponentFixture<SectorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SectorFormComponent, TranslationMockPipe],
      imports: [RouterTestingModule, WorldskillsAngularLibModule, HttpClientTestingModule, FormsModule],
      providers: [
        TranslateServiceTestingProvider
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
