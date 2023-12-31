import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {FormBuilder, FormGroup} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { WasmService } from '../services/wasm.service';
import { of } from 'rxjs';


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
  data$: any;

  constructor(private fns: AngularFireFunctions, private fb: FormBuilder, private http: HttpClient, private wasmService: WasmService) {}

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

  onUpload() {
    this.uploadFile('Sales', this.salesFile);
    this.uploadFile('Purchasing', this.purchasingFile);
    this.uploadFile('Recipes', this.recipeFile);
  }

  private async uploadFile(fileType: string, file: File | null) {
    if (!file) {
      console.error(`No ${fileType} file selected.`);
      return;
    }

    // const formData = new FormData();
    try {
      this.http.post('https://us-central1-virtual-menu-59b9e.cloudfunctions.net/uploadFile', { fileContent: file.text.toString(), fileName: file.name, fileType: fileType })
      .subscribe(
        (response: any) => {
          console.log(response);
          console.log(response.status); // 'success' or 'error'
          console.log(response.message); // The message from the Cloud Function
        },
        (error) => {
          console.error('Error:', error);
        }
      );
      // const uploadFileCallable = this.fns.httpsCallable('uploadFile');
      // const result = await uploadFileCallable({ fileContent: formData, fileName: file.name, fileType: fileType });
      // console.log(result);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
     // this.http.post(`https://us-central1-virtual-menu-59b9e.cloudfunctions.net/uploadFile/${fileType}/${file.name}`, formData)
    //   .subscribe(response => {
    //     console.log(`${fileType} File uploaded successfully!`, response);
    //   }, error => {
    //     console.error(`Error uploading ${fileType} file:`, error);
    //   });
  }
}