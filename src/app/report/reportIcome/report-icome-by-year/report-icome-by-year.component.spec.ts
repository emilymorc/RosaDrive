import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportIcomeByYearComponent } from './report-icome-by-year.component';

describe('ReportIcomeByYearComponent', () => {
  let component: ReportIcomeByYearComponent;
  let fixture: ComponentFixture<ReportIcomeByYearComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportIcomeByYearComponent]
    });
    fixture = TestBed.createComponent(ReportIcomeByYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
