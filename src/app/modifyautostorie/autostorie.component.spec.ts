import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutostorieComponent } from './autostorie.component';

describe('AutostorieComponent', () => {
  let component: AutostorieComponent;
  let fixture: ComponentFixture<AutostorieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutostorieComponent]
    });
    fixture = TestBed.createComponent(AutostorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
