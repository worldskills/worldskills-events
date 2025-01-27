import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import {SkillPhotoFormComponent} from './skill-photo-form.component';
import {TranslateServiceTestingProvider, TranslationMockPipe} from "../../test";
import {RouterTestingModule} from "@angular/router/testing";
import {WorldskillsAngularLibModule} from "@worldskills/worldskills-angular-lib";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import {FormsModule} from "@angular/forms";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('SkillPhotoFormComponent', () => {
  let component: SkillPhotoFormComponent;
  let fixture: ComponentFixture<SkillPhotoFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [SkillPhotoFormComponent, TranslationMockPipe],
    imports: [RouterTestingModule, WorldskillsAngularLibModule, FormsModule],
    providers: [
        TranslateServiceTestingProvider,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
})
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillPhotoFormComponent);
    component = fixture.componentInstance;
    component.skill = {id: 1} as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
