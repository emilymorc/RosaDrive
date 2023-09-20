import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderServiceComponent } from './order-service.component';

describe('OrderServiceComponent', () => {
  let component: OrderServiceComponent;
  let fixture: ComponentFixture<OrderServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderServiceComponent]
    });
    fixture = TestBed.createComponent(OrderServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
