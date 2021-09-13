import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AngularFirestore} from '@angular/fire/firestore';
declare var $ : any;

@Component({selector: 'app-homepage', templateUrl: './homepage.component.html', styleUrls: ['./homepage.component.css']})
export class HomepageComponent implements OnInit {
    form = new FormGroup({email: new FormControl('')});

    onSubmit() {
        let data = this.form.value;

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
