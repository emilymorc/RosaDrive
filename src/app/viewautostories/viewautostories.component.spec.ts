import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewautostoriesComponent } from './viewautostories.component';

describe('ViewautostoriesComponent', () => {
  let component: ViewautostoriesComponent;
  let fixture: ComponentFixture<ViewautostoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewautostoriesComponent]
    });
    fixture = TestBed.createComponent(ViewautostoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
