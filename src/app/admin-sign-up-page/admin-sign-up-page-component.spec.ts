import {async, ComponentFixture, TestBed} from '@angular/core/testing'

import { SignUpAdminPageComponent } from './admin-sign-up-page.component'

describe('SignUpAdminPageComponent', () => {

    let component: SignUpAdminPageComponent;
    let fixture: ComponentFixture<SignUpAdminPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
          declarations: [ SignUpAdminPageComponent ]
        })
        .compileComponents();
      }));
    
      beforeEach(() => {
        fixture = TestBed.createComponent(SignUpAdminPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
    
      it('should create', () => {
        expect(component).toBeTruthy();
      });
   
});
