// // file-operation.component.ts

import { Component } from '@angular/core';
import { FileService } from '../../services/file.service';


@Component({
    selector: 'app-file-operation',
    template: `
    <button (click)="readFile()">Read File</button>
    <button (click)="updateFile()">Write File</button>
    <!-- Add other buttons and UI elements -->
  `,
})
export class FileOperationComponent {
    fileContent: string | undefined;
    newContent = '';
    operationResult: string | undefined;
  
    constructor(private fileService: FileService) {}
  
    readFile() {
      this.fileService.readFile().subscribe(
        (content) => {
          this.fileContent = content;
          this.operationResult = 'File read successfully.';
        },
        (error) => {
          console.error('Error reading file:', error);
          this.operationResult = 'Error reading file.';
        }
      );
    }
  
    updateFile() {
      this.fileService.writeFile(this.newContent).subscribe(
        () => {
          this.operationResult = 'File updated successfully.';
        },
        (error) => {
          console.error('Error updating file:', error);
          this.operationResult = 'Error updating file.';
        }
      );
    }
  
    deleteFile() {
      this.fileService.deleteFile().subscribe(
        () => {
          this.fileContent = undefined;
          this.newContent = '';
          this.operationResult = 'File deleted successfully.';
        },
        (error) => {
          console.error('Error deleting file:', error);
          this.operationResult = 'Error deleting file.';
        }
      );
    }
  }