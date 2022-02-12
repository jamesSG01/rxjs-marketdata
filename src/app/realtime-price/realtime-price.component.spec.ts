import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealtimePriceComponent } from './realtime-price.component';

describe('RealtimePriceComponent', () => {
  let component: RealtimePriceComponent;
  let fixture: ComponentFixture<RealtimePriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealtimePriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RealtimePriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
