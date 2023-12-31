import { Component, OnInit} from '@angular/core'
import {FormControl, FormGroup} from '@angular/forms'
import {AngularFirestore} from '@angular/fire/compat/firestore'
import { FileService } from '../services/file.service'
import { WasmService } from '../services/wasm.service'


declare var $ : any;

@Component({
    selector: 'admin-recipes',
    templateUrl: './admin-recipes.component.html',
    styleUrls: ['./admin-recipes.component.css']
})

export class AdminRecipesComponent implements OnInit {
    recipeName: string;
    prevRecipeName: string;
    prevDelRecipeName: string;
    newRecipeName: string;
    filename: string;
    recipeNames: string [];
    ingredNames: string [];
    delIngredNames: string [];
    selectedIngred: string;
    deleteRecipeName: string;
    editNewRecipeName: string;
    editNewIngredients: string;
    createNewIngredients: string;

    constructor(private fileService: FileService, private wasmService: WasmService) {}

    async ngOnInit(): Promise<void> {
      this.recipeNames = [];
      this.wasmService.dishes = [];
      await this.wasmService.getDishNames();
      this.recipeNames = this.wasmService.dishes
    }

    fileContent: string | undefined;
    newContent = '';
    operationResult: string | undefined;

  readFile() {
    // Implementation
  }

  updateFile(newContent: string) {
    // Implementation
    // update the text file at whatever location - cached file and server
  }

  deleteFile() {
    // Implementation
  }

  addDish(){
    this.wasmService.addDish(this.newRecipeName, this.createNewIngredients);
  }

  editRecipeName(){
    this.wasmService.changeRecipeName(this.editNewRecipeName, this.recipeName);
  }

  editRecipeIngredients(){
    this.wasmService.addIngredients(this.editNewIngredients, this.recipeName);
  }

  async getIngredients() {
    // Implement your get ingredients logic here
    // if there are no ingredients gotten OR the selected Dish is newly selected
    if(!this.wasmService.ingredients || this.prevRecipeName != this.recipeName){
      await this.wasmService.getIngredients(this.recipeName);
    }
    this.ingredNames = this.wasmService.ingredients;
    this.prevRecipeName = this.recipeName;
  }

  async getDeleteIngredients() {
    // Implement your get ingredients logic here
    // if there are no ingredients gotten OR the selected Dish is newly selected
    if(!this.wasmService.ingredients || this.prevDelRecipeName != this.deleteRecipeName){
      await this.wasmService.getDelIngredients(this.deleteRecipeName);
    }
    this.delIngredNames = this.wasmService.delIngredients;
    this.prevDelRecipeName = this.deleteRecipeName;
  }

  deleteRecipe() {
    // Implement your delete recipe logic here
    this.wasmService.deleteDish(this.deleteRecipeName);
  }

  deleteIngredient() {
    // Implement your delete ingredient logic here
    this.wasmService.deleteIngredient(this.selectedIngred, this.deleteRecipeName);
  }

  editIngredientQuantity() {
    // Implement your edit ingredient quantity logic here

  }

  addIngredient() {
    // Implement your add ingredient logic here
  }

}

