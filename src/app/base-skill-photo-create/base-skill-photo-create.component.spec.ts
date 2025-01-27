import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import {BaseSkillPhotoCreateComponent} from './base-skill-photo-create.component';
import {TranslateServiceTestingProvider, TranslationMockPipe} from "../../test";
import {RouterTestingModule} from "@angular/router/testing";
import {WorldskillsAngularLibModule} from "@worldskills/worldskills-angular-lib";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('BaseSkillPhotoCreateComponent', () => {
  let component: BaseSkillPhotoCreateComponent;
  let fixture: ComponentFixture<BaseSkillPhotoCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [BaseSkillPhotoCreateComponent, TranslationMockPipe],
    imports: [RouterTestingModule, WorldskillsAngularLibModule],
    providers: [
        TranslateServiceTestingProvider,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
})
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseSkillPhotoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
