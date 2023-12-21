import {async, ComponentFixture, TestBed} from '@angular/core/testing'

import { SignInAdminPageComponent } from './admin-sign-in-page.component'

describe('SignInAdminPageComponent', () => {

    let component: SignInAdminPageComponent;
    let fixture: ComponentFixture<SignInAdminPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
          declarations: [ SignInAdminPageComponent ]
        })
        .compileComponents();
      }));
    
      beforeEach(() => {
        fixture = TestBed.createComponent(SignInAdminPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
    
      it('should create', () => {
        expect(component).toBeTruthy();
      });
   
});
