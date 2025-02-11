import {async, ComponentFixture, TestBed} from '@angular/core/testing'

import { ForgotPasswordPageComponent } from './admin-forgot-password-page.component'

describe('ForgotPasswordPageComponent', () => {

    let component: ForgotPasswordPageComponent;
    let fixture: ComponentFixture<ForgotPasswordPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
          declarations: [ ForgotPasswordPageComponent ]
        })
        .compileComponents();
      }));
    
      beforeEach(() => {
        fixture = TestBed.createComponent(ForgotPasswordPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
    
      it('should create', () => {
        expect(component).toBeTruthy();
      });
   
});
