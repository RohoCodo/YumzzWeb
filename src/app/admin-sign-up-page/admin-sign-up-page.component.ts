import { Component, OnInit} from '@angular/core'
import {FormControl, FormGroup} from '@angular/forms'
import {AngularFirestore} from '@angular/fire/compat/firestore'
import { Router } from '@angular/router';


declare var $ : any;

@Component({
    selector: 'admin',
    templateUrl: './admin-sign-up-page.component.html',
    styleUrls: ['./admin-sign-up-page.component.css']
})  

export class SignUpAdminPageComponent implements OnInit {
    form = new FormGroup({email: new FormControl(''), ownername: new FormControl(''), password: new FormControl(''), restaurantname: new FormControl(''), passwordrepeat: new FormControl('')});

    constructor(private db: AngularFirestore, private router: Router){}

    onSubmit() {
        let data = this.form.value;

        // Check if any of the fields are empty
        if (!data.email || !data.ownername || !data.password || !data.restaurantname) {
            alert("Please fill in all fields");
            return; // Exit the function if any field is empty
        }

        // Check if the email is a valid email address
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert("Please enter a valid email address");
            return; // Exit the function if the email is invalid
        }

        if (data.password !== data.passwordrepeat) {
            alert("Passwords do not match");
            return; // Exit the function if passwords do not match
          }

        // Reset the form
        this.form.reset();
        alert("Welcome to Yumzz " + data.ownername);

        return new Promise < any > ((resolve, reject) => {
            this
                .db
                .collection('RestaurantUser')
                .doc()
                .set(data)
                .then(
                    (res) => {
                        console.log('Data added successfully:', res);
                        this.router.navigate(['/admin-homepage']);
                        resolve(res);
                    },
                    (err) => {
                        console.error('Error adding data:', err);
                        reject(err);
                    }
                );
        });
      }

    ngOnInit(): void {
        $(document)
            .on("click", function (evt) {
                evt.preventDefault();
            })
    }
}

