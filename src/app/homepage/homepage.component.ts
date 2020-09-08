import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl('')
  });

  onSubmit() {
    let data = this.form.value;

    return new Promise<any>((resolve, reject) => {
      this.db
        .collection('EarlyAccessEmails')
        .doc(data.email)
        .set(data)
        .then(
          (res) => {},
          (err) => reject(err)
        );
    });
  }

  constructor(private db: AngularFirestore) {}

  ngOnInit(): void {}
}
