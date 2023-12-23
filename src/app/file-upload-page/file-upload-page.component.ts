import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {FormBuilder, FormGroup} from '@angular/forms'
// import { finalize } from 'rxjs/operators';


declare var $ : any;

@Component({
  selector: 'admin-fileupload',
  templateUrl: './file-upload-page.component.html',
  styleUrls: ['./file-upload-page.component.css']
})

export class FileUploadPageComponent implements OnInit {
  @ViewChild('salesFileInput') salesFileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('purchasingFileInput') purchasingFileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('recipeFileInput') recipeFileInput!: ElementRef<HTMLInputElement>;

  // salesform: FormGroup;
  // purchasingform: FormGroup;
  // recipeform: FormGroup;
  

  selectedFile: File | null = null;

  constructor(private storage: AngularFireStorage, private fb: FormBuilder) {}

  ngOnInit(): void {
    // $(document)
    //     .on("click", function(evt){
    //         evt.preventDefault();
    //     })
    // this.salesform = this.fb.group({
    //   salesFilename: [''] // You can add validators if needed
    // });

    // this.purchasingform = this.fb.group({
    //   purchasingFilename: ['']
    // });

    // this.recipeform = this.fb.group({
    //   recipeFilename: ['']
    // });
  }

  // onFileSelected(event: any) {
  //   // Retrieve the selected file from the input element
  //   this.selectedFile = event.target.files[0];
  // }

  onSubmit() {
    // const salesFile = this.salesFileInput.nativeElement.files[0];
    // const purchasingFile = this.purchasingFileInput.nativeElement.files[0];
    // const recipeFile = this.recipeFileInput.nativeElement.files[0];
  //   let salesdata = this.salesform.value;
  //   let purchasingdata = this.purchasingform.value;
  //   let recipedata = this.recipeform.value;

  //   // Reset forms
  //   this.salesform.reset();
  //   this.purchasingform.reset();
  //   this.recipeform.reset();


  //   alert("Files are Uploading");

  //   // Upload Sales Data
  //   // this.uploadFile('salesFolder', 'salesFileInput', salesdata);

  //   // // Upload Purchasing Data
  //   // this.uploadFile('purchasingFolder', 'purchasingFileInput', purchasingdata);

  //   // // Upload Recipe Data
  //   // this.uploadFile('recipeFolder', 'recipeFileInput', recipedata);
  // }
  // uploadFile(folder: string, inputId: string) {
  //   const storageRef = this.storage.ref('gs://virtual-menu-59b9e.appspot.com/Restaurant/Kathmandu-Cuisine');
    
  //   // Use unique file name or generate one
  //   const fileName = inputId + `file_${new Date().getTime()}`;

  //   const fileInput = document.getElementById(inputId) as HTMLInputElement;

  //   if (fileInput.files && fileInput.files.length > 0) {
  //     const file = fileInput.files[0];
  //     const fileRef = storageRef.child(fileName);

  //     const uploadTask = fileRef.put(file);

  //     uploadTask
  //       .snapshotChanges()
  //       .pipe(
  //         finalize(() => {
  //           fileRef.getDownloadURL().subscribe((downloadURL) => {
  //             console.log('File is uploaded to', downloadURL);
  //             // You can save the downloadURL to your database or perform additional actions
  //           });
  //         })
  //       )
  //       .subscribe();
  //   }
  //  else {
  //   // Handle case where no file is selected
  //   console.warn('No file selected for upload.');
  // }
  }
}