import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseSponsorsComponent } from './base-sponsors.component';

describe('BaseSponsorsComponent', () => {
  let component: BaseSponsorsComponent;
  let fixture: ComponentFixture<BaseSponsorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseSponsorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseSponsorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
