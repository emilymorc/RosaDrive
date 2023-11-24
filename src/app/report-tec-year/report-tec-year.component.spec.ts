import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportTecYearComponent } from './report-tec-year.component';

describe('ReportTecYearComponent', () => {
  let component: ReportTecYearComponent;
  let fixture: ComponentFixture<ReportTecYearComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportTecYearComponent]
    });
    fixture = TestBed.createComponent(ReportTecYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
