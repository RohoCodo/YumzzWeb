import { Component, OnInit} from '@angular/core'
import {FormControl, FormGroup} from '@angular/forms'
import {AngularFirestore} from '@angular/fire/compat/firestore'

declare var $ : any;

@Component({
    selector: 'admin-signin',
    templateUrl: './admin-sign-in-page.component.html',
    styleUrls: ['./admin-sign-in-page.component.css']
})

export class SignInAdminPageComponent implements OnInit {

    constructor(private db: AngularFirestore){}

    ngOnInit(): void {
        // $(document)
        //     .on("click", function(evt){

        //     })
    }


}

