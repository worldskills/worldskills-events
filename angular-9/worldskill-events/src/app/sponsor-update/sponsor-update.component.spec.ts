import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorUpdateComponent } from './sponsor-update.component';

describe('SponsorUpdateComponent', () => {
  let component: SponsorUpdateComponent;
  let fixture: ComponentFixture<SponsorUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SponsorUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
