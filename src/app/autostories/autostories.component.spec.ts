import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutostoriesComponent } from './autostories.component';

describe('AutostoriesComponent', () => {
  let component: AutostoriesComponent;
  let fixture: ComponentFixture<AutostoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutostoriesComponent]
    });
    fixture = TestBed.createComponent(AutostoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
