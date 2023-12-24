import { Component, OnInit} from '@angular/core'
import {FormControl, FormGroup} from '@angular/forms'
import {AngularFirestore} from '@angular/fire/compat/firestore'
import { Router } from '@angular/router';


declare var $ : any;

@Component({
    selector: 'admin-signin',
    templateUrl: './admin-sign-in-page.component.html',
    styleUrls: ['./admin-sign-in-page.component.css']
})

export class SignInAdminPageComponent implements OnInit {
    form = new FormGroup({email: new FormControl(''), password: new FormControl(''),});

    constructor(private db: AngularFirestore, private router: Router){}
    ngOnInit(): void {
        // $(document)
        //     .on("click", function(evt){
        //         evt.preventDefault();
        //     })
    }

    onSubmit() {

        let data = this.form.value;
        this.form.reset();
        console.log(data);

        return new Promise<void>((resolve, reject) => {
            // Check if the restaurant name and password combo exists in the collection
            console.log("YES");
            this.db.collection('RestaurantUser', ref =>
            ref.where('email', '==', data.email)
                .where('password', '==', data.password)
            )
            .get()
            .subscribe(querySnapshot => {
            if (querySnapshot.size > 0) {
                alert("Welcome back!");
                // Combo exists, navigate to admin homepage
                this.router.navigate(['/admin-homepage']);
                resolve();
            } else {
                // Combo does not exist, handle accordingly (e.g., show an error message)
                alert("Invalid restaurant email or password combo.");
                console.error('Invalid restaurant email or password combo.');
                reject('Invalid restaurant email or password combo.');
            }
            }, err => {
            console.error('Error querying data:', err);
            reject(err);
            });
        });
      }

}

