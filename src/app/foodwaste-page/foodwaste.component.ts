import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AngularFirestore} from '@angular/fire/compat/firestore';
declare var $ : any;

@Component({
  selector: 'app-foodwaste-page',
  templateUrl: './foodwaste.component.html',
  styleUrls: ['./foodwaste.component.css']
})

export class FoodWastePageComponent implements OnInit {
  form = new FormGroup({email: new FormControl('')});

    onSubmit() {
        let data = this.form.value;
        this.form.reset();
        alert("We will get back to you shortly!");
        return new Promise < any > ((resolve, reject) => {
            this
                .db
                .collection('EarlyAccessEmails')
                .doc(data.email)
                .set(data)
                .then((res) => {}, (err) => reject(err));
        });

    }

    constructor(private db : AngularFirestore) {}

    ngOnInit() : void {

      $(document)
          .on("click", function (evt) {

              evt.preventDefault();

              if ($(evt.target).parent().is('.tab')) {

                  var screenSelected = $(evt.target)
                      .parent()
                      .data("anchor");

                  $(".screens")
                      .children()
                      .each(function (index) {

                          if ($(this).data("id") !== screenSelected) {
                              $(this).removeClass("is-active");
                          } else {
                              $(this).addClass("is-active");
                          }
                      });

                  $(evt.target)
                      .parent()
                      .parent()
                      .children()
                      .each(function (index) {
                          $(this).removeClass("is-active");
                      });

                  $(evt.target)
                      .parent()
                      .addClass("is-active");
              } else if ($(evt.target).is('.tab')) {
                  var screenSelected = $(evt.target).data("anchor");

                  $(".screens")
                      .children()
                      .each(function (index) {

                          if ($(this).data("id") !== screenSelected) {
                              $(this).removeClass("is-active");
                          } else {
                              $(this).addClass("is-active");
                          }
                      });

                  $(evt.target)
                      .parent()
                      .children()
                      .each(function (index) {
                          $(this).removeClass("is-active");
                      });

                  $(evt.target).addClass("is-active");

              }
          });
  }

}
