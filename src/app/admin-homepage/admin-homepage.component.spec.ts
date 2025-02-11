import {async, ComponentFixture, TestBed} from '@angular/core/testing'

import { AdminHomePageComponent } from './admin-homepage.component'

describe('AdminHomePageComponent', () => {

    let component: AdminHomePageComponent;
    let fixture: ComponentFixture<AdminHomePageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
          declarations: [ AdminHomePageComponent ]
        })
        .compileComponents();
      }));
    
      beforeEach(() => {
        fixture = TestBed.createComponent(AdminHomePageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
    
      it('should create', () => {
        expect(component).toBeTruthy();
      });
   
});
