import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRecipesNavComponent } from './admin-recipes-nav.component';

describe('AdminRecipesNavComponent', () => {
  let component: AdminRecipesNavComponent;
  let fixture: ComponentFixture<AdminRecipesNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminRecipesNavComponent]
    });
    fixture = TestBed.createComponent(AdminRecipesNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
