import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BcgMatrixComponent } from './bcg-matrix.component';

describe('BcgMatrixComponent', () => {
  let component: BcgMatrixComponent;
  let fixture: ComponentFixture<BcgMatrixComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BcgMatrixComponent]
    });
    fixture = TestBed.createComponent(BcgMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
