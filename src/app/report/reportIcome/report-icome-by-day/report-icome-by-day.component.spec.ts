import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportIcomeByDayComponent } from './report-icome-by-day.component';

describe('ReportIcomeByDayComponent', () => {
  let component: ReportIcomeByDayComponent;
  let fixture: ComponentFixture<ReportIcomeByDayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportIcomeByDayComponent]
    });
    fixture = TestBed.createComponent(ReportIcomeByDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
