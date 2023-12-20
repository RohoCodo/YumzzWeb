import { Component, OnInit} from '@angular/core'
import {FormControl, FormGroup} from '@angular/forms'
import {AngularFirestore} from '@angular/fire/compat/firestore'

declare var $ : any;

@Component({
    selector: 'admin',
    templateUrl: './admin-sign-up-page.component.html',
    styleUrls: ['./admin-sign-up-page.component.css']
})

export class SignUpAdminPageComponent implements OnInit {

    constructor(private db: AngularFirestore){}

    ngOnInit(): void {
        // $(document)
        //     .on("click", function(evt){

        //     })
    }


}

