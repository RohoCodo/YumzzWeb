import { Component, OnInit} from '@angular/core'
import {FormControl, FormGroup} from '@angular/forms'
import {AngularFirestore} from '@angular/fire/compat/firestore'
import { FileService } from '../services/file.service'


declare var $ : any;

@Component({
    selector: 'admin-recipes',
    templateUrl: './admin-recipes.component.html',
    styleUrls: ['./admin-recipes.component.css']
})

export class AdminRecipesComponent implements OnInit {
    recipeName: string;
    filename: string;

    constructor(private fileService: FileService) {}

    ngOnInit(): void {
        // $(document)
        //     .on("click", function(evt){

        //     })
    }

    fileContent: string | undefined;
    newContent = '';
    operationResult: string | undefined;

  readFile() {
    // Implementation
  }

  updateFile() {
    // Implementation
  }

  deleteFile() {
    // Implementation
  }

  createRecipe() {
    // Implement your create recipe logic here
  }

  getIngredients() {
    // Implement your get ingredients logic here
  }

  deleteRecipe() {
    // Implement your delete recipe logic here
  }

  editIngredients() {
    // Implement your edit ingredients logic here
  }

  deleteIngredient() {
    // Implement your delete ingredient logic here
  }

  editIngredientQuantity() {
    // Implement your edit ingredient quantity logic here
  }

  addIngredient() {
    // Implement your add ingredient logic here
  }

}

