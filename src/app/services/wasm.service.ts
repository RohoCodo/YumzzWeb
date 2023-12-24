// wasm.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, of } from 'rxjs';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { database } from 'firebase-functions/v1/firestore';


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
  name: string,
  ingredientQuantAmts: IngredientQuantAmt[];
}

@Injectable({
  providedIn: 'root',
})

export class WasmService {
  private isModuleInitialized: boolean = false;
  private cogCalcModule: any; // Add a property to store the loaded WebAssembly module
  recipeData: RecipeData[] = [];
  dishIngredientQuantAmts: DishsIngredientQuantAmts;
  ingredientQuantAmtData: IngredientQuantAmt[] = [];
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

  // Define functions to interact with your WebAssembly module
  public runAnalysis(data: any): any {
    //get the data frpom Firebase Storage and dispaly the outputs here.
    // Example: Call a function from the WebAssembly module
    // return this.cogCalcModule.yourAnalysisFunction(data);
  }

  private getIngredientDataFromServer(dishName: string): string {
    // Replace 'path/to/your/ingredients.txt' with the actual path in your Firebase Storage
    // get the ingredients txt returned here

    const filePath = 'assets/ingredients.txt'; // Adjust the path accordingly
    let fileContent: string = '';

    this.http.get(filePath, { responseType: 'text' }).subscribe(
      (content) => {
        fileContent = content;
        console.log("getting file content:");
        console.log(fileContent);
        return content;
      },
      (error) => {
        console.error('Error fetching file:', error);
      }
    );
  
    return null;
    // const filePath = this.getIngredientsFileURL; // Replace with the actual file path
    // const call = this.fns.httpsCallable('getRecipesTextFile');
    // const data$ = call({}); 
    // console.log(data$);
    // data$.subscribe(
    // (downloadURL: string) => {
    //   console.log(`File download URL: ${downloadURL}`);
    //   // Handle the download URL as needed
    //   return downloadURL;
    // },
    // (error) => {
    //   console.error('Error getting file from storage:', error);
    // }
    // );
    // this.http.get
    // return this.http.get(this.getIngredientsFileURL);
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


  private async getQuantAmtDataFromServer(dishName: string) {
    // Replace 'path/to/your/ingredients.txt' with the actual path in your Firebase Storage
    const filePath = 'assets/ingredientsQuantAmt.txt'; // Adjust the path accordingly
    let fileContent: string = '';

    this.http.get(filePath, { responseType: 'text' }).subscribe(
      (content) => {
        fileContent = content;
        //console.log(fileContent);
        return content;
      },
      (error) => {
        console.error('Error fetching file:', error);
      }
    );
    
    return null;
    // const filePath = this.getQuantsAmtsFileURL; // Replace with the actual file path

    // const call = this.fns.httpsCallable('getPurchasingTextFile');
    // const data$ = call({}); 
    // console.log(data$);
    //   data$.subscribe(
    //   (downloadURL: string) => {
    //     console.log(`File download URL: ${downloadURL}`);
    //     // Handle the download URL as needed
    //     return downloadURL;
    //   },
    //   (error) => {
    //     console.error('Error getting file from storage:', error);
    //   }
    // );
    
  }

  private async getSalesDataFromServer(dishName: string) {
    // Replace 'path/to/your/ingredients.txt' with the actual path in your Firebase Storage
    const filePath = 'assets/sales.csv'; // Adjust the path accordingly
    let fileContent: string = '';

    this.http.get(filePath, { responseType: 'text' }).subscribe(
      (content) => {
        fileContent = content;
        //console.log(fileContent);
        return fileContent;
      },
      (error) => {
        console.error('Error fetching file:', error);
      }
    );
    return null;
    // const filePath = this.getSalesFileURL; // Replace with the actual file path
    //   this.getFileFromStorage(filePath).subscribe(
    //   (downloadURL: string) => {
    //     console.log(`File download URL: ${downloadURL}`);
    //     // Handle the download URL as needed
    //     return downloadURL;
    //   },
    //   (error) => {
    //     console.error('Error getting file from storage:', error);
    //   }
    // );
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
    return this.cogCalcModule.calculateOptimalOrderQuantity(orderCost, sales, storingCost);
  }

  calculateSafetyStock(maxLeadTime: number, averageLeadTime: number, averageSales: number): number {
    return this.cogCalcModule.calculateSafetyStock(maxLeadTime, averageLeadTime, averageSales);
  }

  calculateReorderPoint(safetyStock: number, averageConsumption: number, leadTime: number): number {
    return this.cogCalcModule.calculateReorderPoint(safetyStock, averageConsumption, leadTime);
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
    console.log("string");
    console.log(ingredientsTxtData); // there is nothing in this string
    console.log("lines");
    console.log(lines);

    lines.forEach(line => {
      const values = line.split(',');

      const name = values[0];
      const dishPrice = parseFloat(values[1]);
      console.log("get name and price")
      console.log(name);
      console.log(dishPrice);

      for (let i = 2; i < values.length; i += 2) {
        const ingredientName = values[i];
        const ingredientQuantity = parseFloat(values[i + 1]);

        ingredients.push({ name: ingredientName, quantity: ingredientQuantity });
      }
      
      this.recipeData.push({ name, dishPrice, ingredients });
    });

    return this.recipeData;
  }

  private parseIngredientsQuantAmtTxtData(ingredientsQuantAmtTxtData: string){
    const lines = ingredientsQuantAmtTxtData.split('\n');

    lines.forEach(line => {
      const values = line.split(',');

      const ingredientName = values[0];
      const quantity = parseFloat(values[1]);
      const price = parseFloat(values[2]);

      this.ingredientQuantAmtData.push({ name: ingredientName, quantity, price });
    });
    return this.ingredientQuantAmtData
  }

  private calculateSingleIngredientDirectCost(ingredAmt: number, ingredPrice: number, ingredQuant: number): number {
    // Implement your cost calculation logic here
    // Example: return ingredAmt * ingredPrice / ingredQuant;
    return (ingredAmt * (ingredQuant / ingredPrice));
  }

  calculateIngredientDirectCostfromData(dishName: string): Observable<number> {
    // trying to make promise work
    const ingredientData = this.getIngredientDataFromServer(dishName);
  
    // This line will "stall" the execution until the promise is resolved

    // end of trial
    
    // Simulating data retrieval (replace with your actual data retrieval logic)
    //let ingredientData = this.getIngredientDataFromServer(dishName);
    const quantAmtRequest = this.getQuantAmtDataFromServer(dishName);

    let dishInfo = this.parseIngredientsTxtData(ingredientData);
    let purchasingInfo;
    // this.parseIngredientsQuantAmtTxtData(quantAmtRequest);

    // ingredientData.then((result) => {
    //   dishInfo = result;
    //   //dishInfo = this.parseIngredientsTxtData(result); 
    //   console.log(dishInfo);
    //   console.log("after logged value");
    // })
    // dishInfo = await ingredientData;
    // console.log(dishInfo);
    // console.log("dish info logged");

    quantAmtRequest.then((result) => {
      purchasingInfo = this.parseIngredientsQuantAmtTxtData(result);
    })

    let costs = 0;

    const ingredients = this.combineArrays(purchasingInfo,dishInfo);

    for (const ingredient of ingredients) {
      const ingredAmt = ingredient.amount;
      const ingredQuant = ingredient.quantity;
      const ingredPrice = ingredient.price;

      const cost = this.calculateSingleIngredientDirectCost(ingredAmt, ingredPrice, ingredQuant);
      costs += cost;
    }

    console.log(costs);

    return of(costs);
  }

  combineArrays(arr1: any[], arr2: any[]): any[] {
    if (!arr1) {
      // Handle the case where arr1 is undefined or null
      alert("arr1 dont exist");
      return [];
    }
  
    return arr1.map((ingredient1) => {
      const matchingIngredient = arr2.find((ingredient2) => ingredient2.name === ingredient1.name);
  
      if (matchingIngredient) {
        // Combine properties from both arrays
        return {
          name: ingredient1.name,
          quantity: ingredient1.quantity,
          price: ingredient1.price, // You can choose to combine prices differently if needed
          amount: matchingIngredient.price,
        };
      } else {
        // If no matching ingredient is found in the second array
        return ingredient1;
      }
    });
  };

  // private calculateIngredientDirectCost(dishName: string): Observable<number> {
  //   // Make HTTP requests to get ingredient data from text files
  //   //need to change this
  //   return this.calculateIngredientDirectCostFromData(dishName);
  // }

  calculateOrderingFrequency(demandRate: number, orderingCost: number, holdingCost: number): number {
    return this.cogCalcModule.calculateOrderingFrequency(demandRate, orderingCost, holdingCost);
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
