import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewApoimentComponent } from './view-apoiment.component';

describe('ViewApoimentComponent', () => {
  let component: ViewApoimentComponent;
  let fixture: ComponentFixture<ViewApoimentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewApoimentComponent]
    });
    fixture = TestBed.createComponent(ViewApoimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
