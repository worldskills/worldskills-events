import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseSponsorUpdateComponent } from './base-sponsor-update.component';

describe('BaseSponsorUpdateComponent', () => {
  let component: BaseSponsorUpdateComponent;
  let fixture: ComponentFixture<BaseSponsorUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseSponsorUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseSponsorUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
