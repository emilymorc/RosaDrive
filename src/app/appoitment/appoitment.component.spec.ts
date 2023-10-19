import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppoitmentComponent } from './appoitment.component';

describe('AppoitmentComponent', () => {
  let component: AppoitmentComponent;
  let fixture: ComponentFixture<AppoitmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppoitmentComponent]
    });
    fixture = TestBed.createComponent(AppoitmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
