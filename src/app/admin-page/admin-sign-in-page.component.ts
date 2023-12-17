import { Component, OnInit} from '@angular/core'
import {FormControl, FormGroup} from '@angular/forms'
import {AngularFirestore} from '@angular/fire/compat/firestore'

declare var $ : any;

@Component({
    selector: 'app-admin-page',
    templateUrl: './admin-page.component.html',
    styleUrls: ['./admin-page.component.css']
})

export class SignInAdminPageComponent implements OnInit {

    constructor(private db: AngularFirestore){}

    ngOnInit(): void {
        // $(document)
        //     .on("click", function(evt){

        //     })
    }


}

