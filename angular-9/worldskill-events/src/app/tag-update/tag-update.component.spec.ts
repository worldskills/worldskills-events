import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TagUpdateComponent} from './tag-update.component';
import {TranslateServiceTestingProvider, TranslationMockPipe} from "../../test";
import {RouterTestingModule} from "@angular/router/testing";
import {WorldskillsAngularLibModule} from "@worldskills/worldskills-angular-lib";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AuthService} from "../../services/auth/auth.service";

describe('TagUpdateComponent', () => {
  let component: TagUpdateComponent;
  let fixture: ComponentFixture<TagUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TagUpdateComponent, TranslationMockPipe],
      imports: [RouterTestingModule, WorldskillsAngularLibModule, HttpClientTestingModule],
      providers: [
        {provide: AuthService, useValue: {authStatus: {subscribe: () => undefined}}},
        TranslateServiceTestingProvider
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
