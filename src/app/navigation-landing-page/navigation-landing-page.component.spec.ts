import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationLandingPageComponent } from './navigation-landing-page.component';

describe('NavigationLandingPageComponent', () => {
  let component: NavigationLandingPageComponent;
  let fixture: ComponentFixture<NavigationLandingPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavigationLandingPageComponent]
    });
    fixture = TestBed.createComponent(NavigationLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
