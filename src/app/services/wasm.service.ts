// wasm.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, of } from 'rxjs';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { database } from 'firebase-functions/v1/firestore';
import { match } from 'assert';
import * as Papa from 'papaparse';



declare const Module: any;

interface Ingredient {
  name: string;
  quantity: number;
}

interface RecipeData {
  name: string;
  dishPrice: number;
  ingredients: Ingredient[];
}

interface IngredientQuantAmt {
  name: string;
  quantity: number;
  price: number;
}

interface DishsIngredientQuantAmts{
  name: string;
  ingredientQuantAmts: IngredientQuantAmt[];
}

interface ProductIngredSales{
  productName: string;
  ingredAmt: number;
  productSales: string;
}

@Injectable({
  providedIn: 'root',
})

export class WasmService {
  private isModuleInitialized: boolean = false;
  private cogCalcModule: any; // Add a property to store the loaded WebAssembly module
  recipeData: RecipeData[] = [];
  productNames: number [] = [];
  productSales: number [] = [];
  dishes: string [] = [];
  cogs: number = 0;
  dishPrice: GLfloat = 0;
  optOrderQuant: number = 0;
  orderFreq: number = 0;
  reorderPoint: number = 0;
  ingredients: string [];
  delIngredients: string [];
  dishIngredientQuantAmts: DishsIngredientQuantAmts;
  ingredientQuantAmtData: IngredientQuantAmt[] = [];
  ingredProdSales: ProductIngredSales[] = [];
  number$: Observable<number>;
  getIngredientsFileURL = "https://us-central1-virtual-menu-59b9e.cloudfunctions.net/getRecipesTextFile";
  getSalesFileURL = "https://us-central1-virtual-menu-59b9e.cloudfunctions.net/getSalesFile";
  getQuantsAmtsFileURL = "https://us-central1-virtual-menu-59b9e.cloudfunctions.net/getPurchasingTextFile";




  constructor(private http: HttpClient, private storage: AngularFireStorage, private fns: AngularFireFunctions) {
    this.initModule();
  }

  private initModule(): void {
    if (!this.isModuleInitialized) {
      const script = document.createElement('script');
      script.src = 'assets/COGScalc.js';
  
      script.onload = () => {
        // The script has been fully loaded, and you can now access the WebAssembly module
        console.log('Module:', Module);  // Add this line for debugging
        this.cogCalcModule = Module;
  
        // Initialization logic, if needed
  
        this.isModuleInitialized = true;
      };
  
      document.body.appendChild(script);
    }
  }

  async createProductQuantityMap() {
    const salesResponse = await this.http.get('assets/sales.csv', { responseType: 'text' }).toPromise(); 

    await Papa.parse(salesResponse, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        result.data.forEach((row: any) => {
          const product = row.Product;
          const quantity = parseInt(row.Quantity, 10);

          if (product && !isNaN(quantity)) {
            // Add or update the quantity for the product in the map
            this.productNames.push(product);
            this.productSales.push(quantity);
          }
        });
      }
    });
  }

  getFileFromStorage(filePath: string): Observable<any> {
    if(this.checkFileExists(filePath)){
      const storageRef = this.storage.ref(filePath);
      return storageRef.getDownloadURL();
    }
  }

  checkFileExists(filename: string): boolean {
    const storageRef = this.storage.ref(filename);

    storageRef.getDownloadURL().subscribe(
      (url: string) => {
        console.log(`File ${filename} exists. URL: ${url}`);
        return true;
      },
      (error: any) => {
        if (error.code === 'storage/object-not-found') {
          console.log(`File ${filename} does not exist.`);
        } else {
          console.error('Error checking file existence:', error);
        }
        return false;
      }
    );
    return false;
  }

//   // Helper method to read the contents of a text file
//   private readTextFile(filePath: string): string {
//     const file = FS.readFile(filePath, { encoding: 'utf8' });
//     return file;
//   }

  // Helper method to find a row with a specified first element in a CSV-like text file
  private findRowWithFirstElement(fileContents: string, element: string): number {
    // Implementation logic for finding the row
    // ...
    return this.cogCalcModule.findRowWithFirstElement(fileContents, element);
  }

  // Helper method to get a specific line by row number in a text file
  private getLineByRowNumber(fileContents: string, rowNumber: number): string {
    // Implementation logic for getting the line
    return this.cogCalcModule.getLineByRowNumber(fileContents, rowNumber);
  }
  
  calculateOptimalOrderQuantity(orderCost: number, sales: number, storingCost: number): number {
    this.optOrderQuant = this.cogCalcModule.calculateOptimalOrderQuantity(orderCost, sales, storingCost)
    return this.optOrderQuant;
  }

  calculateSafetyStock(maxLeadTime: number, averageLeadTime: number, averageSales: number): number {
    return this.cogCalcModule.calculateSafetyStock(maxLeadTime, averageLeadTime, averageSales);
  }

  calculateReorderPoint(safetyStock: number, averageConsumption: number, leadTime: number): number {
    this.reorderPoint = this.cogCalcModule.calculateReorderPoint(safetyStock, averageConsumption, leadTime)
    return this.reorderPoint;
  }

  async getSalesData(){
    try {
      const ret = await this.http.get(this.getSalesFileURL, { responseType: 'text' });
      // console.log(of(ret));
      ret.subscribe(
        (response: any) => {
          console.log(response);
          return response;
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }

  async getPurchasingData(){
    try {
      const ret = await this.http.get(this.getQuantsAmtsFileURL, { responseType: 'text' });
      // console.log(of(ret));
      ret.subscribe(
        (response: any) => {
          console.log(response);
          return response;
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }

  async getRecipesData(){
    try {
      const ret = await this.http.get(this.getIngredientsFileURL, { responseType: 'text' });
      // console.log(of(ret));
      ret.subscribe(
        (response: any) => {
          console.log(response);
          return response;
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }

  async calculateIngredientReorderPoint(ingredName: string){
    try{
      const salesResponse = await this.http.get('assets/sales.csv', { responseType: 'text' }).toPromise();
      const ingredientsResponse = await this.http.get('assets/ingredients.txt', { responseType: 'text' }).toPromise();
      const ingredQuantAmts = await this.http.get('assets/ingredientsQuantAmt.txt', { responseType: 'text' }).toPromise();

      const dishInfo = await this.parseIngredientsTxtData(ingredientsResponse);
      const purchasingInfo = await this.parseIngredientsQuantAmtTxtData(ingredQuantAmts);
      const salesInfo = await this.parseSalesCSVData(salesResponse, ingredName, dishInfo);

      // return {productName, ingredAmt/product, productSales}[]
      // calculate order cost by multiplying ingredAmt/product by sales multiplied by the purchasing cost/purchasing amt
      const pI = purchasingInfo.find((p) => p.name == ingredName);
      let orderCost = 0;
      let prodSales = 0;
      for(const prod of salesInfo){
        orderCost += prod.ingredAmt * +prod.productSales * (pI.price/pI.quantity);
        prodSales += +prod.productSales;
      }
      this.calculateReorderPoint(50, prodSales/salesInfo.length, 10);
    }
    catch (error){
      console.error('Error calculating optimal order quantity:', error);
      throw error; // Rethrow the error for the caller to handle
    }
  }

  async deleteDish(dish: string){
    const ingredientsResponse = await this.http.get('assets/ingredients.txt', { responseType: 'text' }).toPromise();
    const dishIngreds = await this.getLineByFirstElem(ingredientsResponse, dish);
    
    const lines = ingredientsResponse.split(';');
    const ind = lines.indexOf(dishIngreds);
    // lines.filter(line => line !== dishIngreds);
    lines.splice(ind, 1);

    //upload this to the file location

  }

  async deleteIngredient(ingredient: string, dish: string){
    const ingredientsResponse = await this.http.get('assets/ingredients.txt', { responseType: 'text' }).toPromise();
    const dishIngreds = await this.findLineByFirstElem(ingredientsResponse, dish);
    console.log(dishIngreds);
    const lines = ingredientsResponse.split(';');
    console.log(lines);
    const ind = dishIngreds.indexOf(ingredient);
    dishIngreds.splice(ind, 1);
    dishIngreds.splice(ind, 1);
    lines[ind] = dishIngreds.join(',');
    console.log(lines);
  }

  async addDish(newRecipeName: string, newIngredients: string){
    let ingredientsResponse = await this.http.get('assets/ingredients.txt', { responseType: 'text' }).toPromise();
    const lines = ingredientsResponse.split(";");
    ingredientsResponse += "\n" + newRecipeName;
    ingredientsResponse += "," + newIngredients + ";";
    console.log(ingredientsResponse);
  }

  async getDishNames(){
    //get all the dish names in the ingredients.txt file
    const ingredientsResponse = await this.http.get('assets/ingredients.txt', { responseType: 'text' }).toPromise();
    // const dishInfo = await this.parseIngredientsTxtData(ingredientsResponse);
    const lines = ingredientsResponse.split(';');
    console.log(lines)
    for (const line of lines){
      const values = line.split(',');
      if(values[0].length > 2){
        const dName = values[0];
        this.dishes.push(dName);
      }
    }
  }

  async changeRecipeName(newDishName: string, oldDishName: string){
    const ingredientsResponse = await this.http.get('assets/ingredients.txt', { responseType: 'text' }).toPromise();
    const dishIngreds = await this.findLineByFirstElem(ingredientsResponse, oldDishName);
    
    dishIngreds[0] = newDishName;
    console.log(dishIngreds);
    //need to upload the file
  }

  async addIngredients(newIngredients: string, dishName: string){
    const ingredientsResponse = await this.http.get('assets/ingredients.txt', { responseType: 'text' }).toPromise();
    const dishIngreds = await this.findLineByFirstElem(ingredientsResponse, dishName);

    const ingreds = newIngredients.split(',');
    //need to check the inputs
    for(const ingred of ingreds){
      dishIngreds.push(ingred);
    }
  }

  async getIngredients(dishName: string){
    const ingredientsResponse = await this.http.get('assets/ingredients.txt', { responseType: 'text' }).toPromise();
    const dishIngreds = await this.findLineByFirstElem(ingredientsResponse, dishName);
    console.log(dishIngreds);
    let ingreds = [];
    for (let i = 2; i < dishIngreds.length; i += 2) {
      const ingred = dishIngreds[i];
      ingreds.push(ingred);
    }
    
    this.ingredients = ingreds;
  }

  async getDelIngredients(dishName: string){
    const ingredientsResponse = await this.http.get('assets/ingredients.txt', { responseType: 'text' }).toPromise();
    const dishIngreds = await this.findLineByFirstElem(ingredientsResponse, dishName);
    console.log(dishIngreds);
    let ingreds = [];
    for (let i = 2; i < dishIngreds.length; i += 2) {
      const ingred = dishIngreds[i];
      ingreds.push(ingred);
    }

    this.delIngredients = ingreds;
  }

  calculateProfitMargin(fileName: string, dishPrice: number, dishName: string, more: boolean): Promise<number> {
    return new Promise((resolve, reject) => {
      if (!this.isModuleInitialized) {
        reject('WebAssembly module not initialized.');
        return;
      }
      // Use Module to call the calculateProfitMargin function
      this.cogCalcModule.calculateProfitMargin(dishPrice, this.calculateIngredientDirectCostfromData(dishName), (result: number) => {
        resolve(result);
      });
    });
  }

  private parseIngredientsTxtData(ingredientsTxtData: string){
    const lines = ingredientsTxtData.split(';');
    const ingredients: Ingredient[] = [];

    lines.forEach(line => {
      const values = line.split(',');
      if(values.length > 1 && values[0].length > 2){

        const name = values[0];
        const dishPrice = parseFloat(values[1]);

        for (let i = 2; i < values.length; i += 2) {
          const ingredientName = values[i];
          const ingredientQuantity = parseFloat(values[i + 1]);

          ingredients.push({ name: ingredientName, quantity: ingredientQuantity });
        }
        
        this.recipeData.push({ name, dishPrice, ingredients });
      }
    });

    return this.recipeData;
  }

  private parseIngredientsQuantAmtTxtData(ingredientsQuantAmtTxtData: string){
    const lines = ingredientsQuantAmtTxtData.split('\n');

    lines.forEach(line => {
      const values = line.split(',');
      if(values.length > 1 && values[0].length > 2){
        const ingredientName = values[0];
        const quantity = parseFloat(values[1]);
        const price = parseFloat(values[2]);

        this.ingredientQuantAmtData.push({ name: ingredientName, quantity, price });
      }
    });
    return this.ingredientQuantAmtData
  }

  private async parseSalesCSVData(salesCSV: string, ingredName: string, dishInfo: RecipeData[]){
    // this.cogCalcModule.search_dish_sales_by_name(dishName, 'assets/ingredients.txt');
    // Remove null bytes
    const cleanedContent = salesCSV.replace(/\0/g, '');

    // Create a stringstream from cleaned content starting from row 4
    const contentLines = cleanedContent.split('\n').slice(3);
    const matchingRecipes = dishInfo.filter((recipe) => recipe.ingredients.some((ingredient) => ingredient.name === ingredName));
    
    //go through each matching Recipe and find the line with the corresponding sales data
    for(const recipe of matchingRecipes){
      const line = this.findLineByFirstElement(cleanedContent, recipe.name);
      const [firstColumn, ...otherColumns] = line.split(',');
      if (firstColumn.trim().length > 0) {
        const prodSales = otherColumns[0];
        this.ingredProdSales.push({productName: prodSales, ingredAmt: recipe.ingredients.find((i) => i.name = ingredName).quantity, productSales: prodSales});
      }
    }
    // return {productName, ingredAmt/product, productSales}
    return this.ingredProdSales;
  }

  findLineByFirstElement(csvContent: string, targetElement: string): string | null {
    // Split the CSV content into lines
    const lines = csvContent.split(';\n');
  
    // Iterate through the lines
    for (const line of lines) {
      // Split the line into columns based on the CSV delimiter (e.g., comma)
      const columns = line.split(',');
  
      // Check if the first column matches the target element
      if (columns.length > 0 && columns[0].trim() === targetElement) {
        return line; // Return the entire line
      }
    }
  }

  findLineByFirstElem(txtContent: string, targetElement: string): string [] | null {
    // Split the CSV content into lines
    const lines = txtContent.split(';\n');
  
    // Iterate through the lines
    for (const line of lines) {
      // Split the line into columns based on the CSV delimiter (e.g., comma)
      const ingreds = line.split(',');
      const i = ingreds[0];

      if (i.trim() == targetElement.trim()) {
        return ingreds;
      }
    }
  }

  getLineByFirstElem(txtContent: string, targetElement: string): string | null {
    // Split the CSV content into lines
    const lines = txtContent.split(';\n');
  
    // Iterate through the lines
    for (const line of lines) {
      // Split the line into columns based on the CSV delimiter (e.g., comma)
      const ingreds = line.split(',');
      const i = ingreds[0];

      if (i.trim() == targetElement.trim()) {
        return line;
      }
    }
  }


  private calculateSingleIngredientDirectCost(ingredAmt: number, ingredPrice: number, ingredQuant: number): number {
    // Implement your cost calculation logic here
    // Example: return ingredAmt * ingredPrice / ingredQuant;
    return (ingredAmt * (ingredQuant / ingredPrice));
  }

  async calculateIngredientOptimalOrderQuantity(ingredName){
    try{
      const salesResponse = await this.http.get('assets/sales.csv', { responseType: 'text' }).toPromise();
      const ingredientsResponse = await this.http.get('assets/ingredients.txt', { responseType: 'text' }).toPromise();
      const ingredQuantAmts = await this.http.get('assets/ingredientsQuantAmt.txt', { responseType: 'text' }).toPromise();

      const dishInfo = await this.parseIngredientsTxtData(ingredientsResponse);
      const purchasingInfo = await this.parseIngredientsQuantAmtTxtData(ingredQuantAmts);
      const salesInfo = await this.parseSalesCSVData(salesResponse, ingredName, dishInfo);

    // return {productName, ingredAmt/product, productSales}[]
    // calculate order cost by multiplying ingredAmt/product by sales multiplied by the purchasing cost/purchasing amt
    const pI = purchasingInfo.find((p) => p.name == ingredName);
    let orderCost = 0;
    let prodSales = 0;
    for(const prod of salesInfo){
      orderCost += prod.ingredAmt * +prod.productSales * (pI.price/pI.quantity);
      prodSales += +prod.productSales;
    }
    this.calculateOptimalOrderQuantity(orderCost, prodSales, 10);
    }
    catch (error){
      console.error('Error calculating optimal order quantity:', error);
      throw error; // Rethrow the error for the caller to handle
    }
  }

  async calculateOrderingFreq(ingredName){
    try{
      const salesResponse = await this.http.get('assets/sales.csv', { responseType: 'text' }).toPromise();
      const ingredientsResponse = await this.http.get('assets/ingredients.txt', { responseType: 'text' }).toPromise();
      const ingredQuantAmts = await this.http.get('assets/ingredientsQuantAmt.txt', { responseType: 'text' }).toPromise();

      const dishInfo = await this.parseIngredientsTxtData(ingredientsResponse);
      const purchasingInfo = await this.parseIngredientsQuantAmtTxtData(ingredQuantAmts);
      const salesInfo = await this.parseSalesCSVData(salesResponse, ingredName, dishInfo);

      // return {productName, ingredAmt/product, productSales}[]
      // calculate order cost by multiplying ingredAmt/product by sales multiplied by the purchasing cost/purchasing amt
      const pI = purchasingInfo.find((p) => p.name == ingredName);
      let orderCost = 0;
      let prodSales = 0;
      for(const prod of salesInfo){
        orderCost += prod.ingredAmt * +prod.productSales * (pI.price/pI.quantity);
        prodSales += +prod.productSales;
      }
      this.calculateOrderingFrequency(prodSales,orderCost, 10);
    }
    catch (error){
      console.error('Error calculating optimal order quantity:', error);
      throw error; // Rethrow the error for the caller to handle
    }
  }

  async calculateIngredientDirectCostfromData(dishName: string): Promise<Observable<number>> {
    //unwrap promise before sending it
    // trying to make promise work
    // console.log("calculating");
    try{
      const ingredientsResponse = await this.http.get('assets/ingredients.txt', { responseType: 'text' }).toPromise();
      const dishInfo = await this.parseIngredientsTxtData(ingredientsResponse);
      const dishIn = dishInfo.find((recipe) => recipe.name === dishName);
      console.log(dishIn);
      this.dishPrice = dishIn.dishPrice;

      // Fetch ingredientsQuantAmt.txt
      const purchasingInfoResponse = await this.http.get('assets/ingredientsQuantAmt.txt', { responseType: 'text' }).toPromise();
      const purchasingInfo = await this.parseIngredientsQuantAmtTxtData(purchasingInfoResponse);

      let costs = 0;
      let ingredient: Ingredient;
      for(ingredient of dishIn.ingredients){
        const ingredQA = purchasingInfo.find((ingredQuantAmt) => ingredQuantAmt.name == ingredient.name);
        console.log(ingredQA); 
        const ingredAmt = ingredient.quantity;
        const ingredQuant = ingredQA.quantity;
        const ingredPrice = ingredQA.price; 

        const cost = await this.calculateSingleIngredientDirectCost(ingredAmt, ingredPrice, ingredQuant);
        costs += cost;
      }
      this.cogs = costs;
      return of(costs);
    } 
    catch (error) {
      console.error('Error calculating cost:', error);
      throw error; // Rethrow the error for the caller to handle
    }
  }

  calculateOrderingFrequency(demandRate: number, orderingCost: number, holdingCost: number): number {
    this.orderFreq = this.cogCalcModule.calculateOrderingFrequency(demandRate, orderingCost, holdingCost)
    return this.orderFreq;
  }

  dishExistsInFile(fileContent: string, targetWords: string): boolean {
    return this.cogCalcModule.dishExistsInFile(fileContent, targetWords);
  }

  // Helper method to extract dish price from a CSV-like line
  // private extractDishPriceFromLine(line: string): string {
  //   // Implementation logic for extracting dish price
  //   // ...
  //   // Replace this with your actual implementation
  //   return ''; // Example: returning an empty string
  // }

  
}
