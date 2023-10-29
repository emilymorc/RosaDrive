import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyAppoitmentComponent } from './modify-appoitment.component';

describe('ModifyAppoitmentComponent', () => {
  let component: ModifyAppoitmentComponent;
  let fixture: ComponentFixture<ModifyAppoitmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifyAppoitmentComponent]
    });
    fixture = TestBed.createComponent(ModifyAppoitmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
