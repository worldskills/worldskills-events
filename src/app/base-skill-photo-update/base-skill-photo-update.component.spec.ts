import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import {BaseSkillPhotoUpdateComponent} from './base-skill-photo-update.component';
import {TranslateServiceTestingProvider, TranslationMockPipe} from "../../test";
import {RouterTestingModule} from "@angular/router/testing";
import {WorldskillsAngularLibModule} from "@worldskills/worldskills-angular-lib";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('BaseSkillPhotoUpdateComponent', () => {
  let component: BaseSkillPhotoUpdateComponent;
  let fixture: ComponentFixture<BaseSkillPhotoUpdateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [BaseSkillPhotoUpdateComponent, TranslationMockPipe],
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
    fixture = TestBed.createComponent(BaseSkillPhotoUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
