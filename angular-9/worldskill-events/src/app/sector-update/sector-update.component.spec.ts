import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectorUpdateComponent } from './sector-update.component';

describe('SectorUpdateComponent', () => {
  let component: SectorUpdateComponent;
  let fixture: ComponentFixture<SectorUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectorUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectorUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
