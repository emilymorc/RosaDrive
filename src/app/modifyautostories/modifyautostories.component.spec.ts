import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyautostoriesComponent } from './modifyautostories.component';

describe('ModifyautostoriesComponent', () => {
  let component: ModifyautostoriesComponent;
  let fixture: ComponentFixture<ModifyautostoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifyautostoriesComponent]
    });
    fixture = TestBed.createComponent(ModifyautostoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
