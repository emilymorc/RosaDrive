import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportOrderByDayComponent } from './report-order-by-day.component';

describe('ReportOrderByDayComponent', () => {
  let component: ReportOrderByDayComponent;
  let fixture: ComponentFixture<ReportOrderByDayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportOrderByDayComponent]
    });
    fixture = TestBed.createComponent(ReportOrderByDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
