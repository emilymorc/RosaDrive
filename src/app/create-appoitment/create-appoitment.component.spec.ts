import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAppoitmentComponent } from './create-appoitment.component';

describe('CreateAppoitmentComponent', () => {
  let component: CreateAppoitmentComponent;
  let fixture: ComponentFixture<CreateAppoitmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateAppoitmentComponent]
    });
    fixture = TestBed.createComponent(CreateAppoitmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
