import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrderServiceComponent } from './create-order-service.component';

describe('CreateOrderServiceComponent', () => {
  let component: CreateOrderServiceComponent;
  let fixture: ComponentFixture<CreateOrderServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateOrderServiceComponent]
    });
    fixture = TestBed.createComponent(CreateOrderServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
