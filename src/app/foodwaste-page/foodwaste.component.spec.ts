import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodWastePageComponent } from './foodwaste.component';

describe('FoodWastePageComponent', () => {
  let component: FoodWastePageComponent;
  let fixture: ComponentFixture<FoodWastePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodWastePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodWastePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
