import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportIcomeByMonthComponent } from './report-icome-by-month.component';

describe('ReportIcomeByMonthComponent', () => {
  let component: ReportIcomeByMonthComponent;
  let fixture: ComponentFixture<ReportIcomeByMonthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportIcomeByMonthComponent]
    });
    fixture = TestBed.createComponent(ReportIcomeByMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
