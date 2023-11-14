import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportOrderByMonthComponent } from './report-order-by-month.component';

describe('ReportOrderByMonthComponent', () => {
  let component: ReportOrderByMonthComponent;
  let fixture: ComponentFixture<ReportOrderByMonthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportOrderByMonthComponent]
    });
    fixture = TestBed.createComponent(ReportOrderByMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
