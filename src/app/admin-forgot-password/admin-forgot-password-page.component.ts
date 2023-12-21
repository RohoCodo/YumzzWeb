import { Component, OnInit} from '@angular/core'
import {FormControl, FormGroup} from '@angular/forms'
import {AngularFirestore} from '@angular/fire/compat/firestore'

declare var $ : any;

@Component({
    selector: 'admin-forgotPassword',
    templateUrl: './admin-forgot-password-page.component.html',
    styleUrls: ['./admin-forgot-password-page.component.css']
})

export class ForgotPasswordPageComponent implements OnInit {

    constructor(private db: AngularFirestore){}

    ngOnInit(): void {
        // $(document)
        //     .on("click", function(evt){

        //     })
    }


}

