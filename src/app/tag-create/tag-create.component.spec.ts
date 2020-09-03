import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TagCreateComponent} from './tag-create.component';
import {TranslateServiceTestingProvider, TranslationMockPipe} from "../../test";
import {RouterTestingModule} from "@angular/router/testing";
import {EntityTreeService, WorldskillsAngularLibModule} from "@worldskills/worldskills-angular-lib";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {of} from "rxjs";

describe('TagCreateComponent', () => {
  let component: TagCreateComponent;
  let fixture: ComponentFixture<TagCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TagCreateComponent, TranslationMockPipe],
      imports: [RouterTestingModule, WorldskillsAngularLibModule, HttpClientTestingModule],
      providers: [
        {provide: EntityTreeService, useValue: {list: (fetchParams: any) => of([]), clearCache: () => undefined}},
        TranslateServiceTestingProvider
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
