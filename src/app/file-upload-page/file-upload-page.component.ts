import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {FormBuilder, FormGroup} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

// import { finalize } from 'rxjs/operators';


declare var $ : any;

@Component({
  selector: 'admin-fileupload',
  templateUrl: './file-upload-page.component.html',
  styleUrls: ['./file-upload-page.component.css']
})

export class FileUploadPageComponent implements OnInit {

  salesFile: File | null = null;
  purchasingFile: File | null = null;
  recipeFile: File | null = null;

  constructor(private storage: AngularFireStorage, private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {

  }

  onFileSelected(event: any, fileType: string) {
    const file = event.target.files[0] as File;

    switch (fileType) {
      case 'sales':
        this.salesFile = file;
        break;
      case 'purchasing':
        this.purchasingFile = file;
        break;
      case 'recipe':
        this.recipeFile = file;
        break;
      default:
        console.error('Invalid fileType:', fileType);
    }
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
  }
  onUpload() {
    this.uploadFile('sales', this.salesFile);
    this.uploadFile('purchasing', this.purchasingFile);
    this.uploadFile('recipe', this.recipeFile);
  }

  private uploadFile(fileType: string, file: File | null) {
    if (!file) {
      console.error(`No ${fileType} file selected.`);
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    this.http.post(`https://us-central1-virtual-menu-59b9e.cloudfunctions.net/uploadFile/${fileType}`, formData)
      .subscribe(response => {
        console.log(`${fileType} File uploaded successfully!`, response);
      }, error => {
        console.error(`Error uploading ${fileType} file:`, error);
      });
  }
}