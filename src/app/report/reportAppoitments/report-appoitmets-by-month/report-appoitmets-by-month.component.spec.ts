import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportAppoitmetsByMonthComponent } from './report-appoitmets-by-month.component';

describe('ReportAppoitmetsByMonthComponent', () => {
  let component: ReportAppoitmetsByMonthComponent;
  let fixture: ComponentFixture<ReportAppoitmetsByMonthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportAppoitmetsByMonthComponent]
    });
    fixture = TestBed.createComponent(ReportAppoitmetsByMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
