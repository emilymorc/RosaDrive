import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportOrderByWeekComponent } from './report-order-by-week.component';

describe('ReportOrderByWeekComponent', () => {
  let component: ReportOrderByWeekComponent;
  let fixture: ComponentFixture<ReportOrderByWeekComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportOrderByWeekComponent]
    });
    fixture = TestBed.createComponent(ReportOrderByWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
