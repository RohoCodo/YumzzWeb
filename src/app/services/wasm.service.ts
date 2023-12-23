// wasm.service.ts
import { Injectable } from '@angular/core';

declare const Module: any;

@Injectable({
  providedIn: 'root',
})
export class WasmService {
  private isModuleInitialized: boolean = false;
  private cogCalcModule: any; // Add a property to store the loaded WebAssembly module


  constructor() {
    this.initModule();
  }

  private initModule(): void {
    // if (!this.isModuleInitialized) {
    //   Module.onRuntimeInitialized = () => {
    //     // Initialization logic, if needed
    // };

    //   // Load the WebAssembly module
    // const script = document.createElement('script');
    // script.src = 'assets/COGScalc.js'; // Update with the correct path
    // document.body.appendChild(script);
    // this.isModuleInitialized = true;
    // }
  }

  // Define functions to interact with your WebAssembly module
  public runAnalysis(data: any): any {
    //get the data frpom Firebase Storage and dispaly the outputs here.
    // Example: Call a function from the WebAssembly module
    return Module.yourAnalysisFunction(data);
  }

//   runProfitMarginCalculator(foodCosts: number[]): number[] {
//     if (!this.isModuleInitialized) {
//       console.error('WebAssembly module not initialized.');
//       return [];
//     }

//     // Call the exported function from the WebAssembly module
//     // Adjust the function name and parameters based on your C++ code
//     const result = Module._calculateProfitMargin(foodCosts);

//     // Convert the result to an array (adjust as needed)
//     const resultArray = new Float64Array(result);

//     return Array.from(resultArray);
//   }

//   fetchDishCostsFromStorage(dishName: string): Promise<number[]> {
//     // Replace 'path/to/your/ingredients.txt' with the actual path in your Firebase Storage
//     const filePath = `path/to/your/ingredients.txt`;

//     // Get a reference to the file in Firebase Storage
//     const ref = this.storage.ref(filePath);

//     // Get the download URL of the file
//     return ref.getDownloadURL().toPromise().then(url => {
//       // Fetch the text file content using Angular's HttpClient
//       return this.http.get(url, { responseType: 'text' }).toPromise();
//     }).then((fileContent: string) => {
//       // Process the file content to get the dish costs for the specified dishName
//       const row = this.findRowWithFirstElement(fileContent, dishName);
//       const line = this.getLineByRowNumber(fileContent, row);
//       const dishCosts = this.getDishCostsFromLine(line);

//       return dishCosts;
//     });
//   }

  // Method to read dish costs from a text file
  async getDishCostsFromFile(filePath: string, dishName: string): Promise<number | undefined> {
    return new Promise<number | undefined>((resolve, reject) => {
      try {
        // Read the contents of the text file
        // const fileContents = this.readTextFile(filePath);

        // Parse the contents and find the dish cost
        // const row = this.findRowWithFirstElement(fileContents, dishName);
        // const line = this.getLineByRowNumber(fileContents, row);
        // const dPrice = this.extractDishPriceFromLine(line);

        // Resolve with the dish cost (parsed as a number)
        // resolve(parseFloat(dPrice));
      } catch (error) {
        reject(error);
      }
    });
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
    return Module.findRowWithFirstElement(fileContents, element);
  }

  // Helper method to get a specific line by row number in a text file
  private getLineByRowNumber(fileContents: string, rowNumber: number): string {
    // Implementation logic for getting the line
    return Module.getLineByRowNumber(fileContents, rowNumber);
  }
  
  calculateOptimalOrderQuantity(orderCost: number, sales: number, storingCost: number): number {
    return Module.calculateOptimalOrderQuantity(orderCost, sales, storingCost);
  }

  calculateSafetyStock(maxLeadTime: number, averageLeadTime: number, averageSales: number): number {
    return Module.calculateSafetyStock(maxLeadTime, averageLeadTime, averageSales);
  }

  calculateReorderPoint(safetyStock: number, averageConsumption: number, leadTime: number): number {
    return Module.calculateReorderPoint(safetyStock, averageConsumption, leadTime);
  }

  calculateProfitMargin(fileName: string, dishPrice: number, dishName: string, more: boolean): Promise<number> {
    return new Promise((resolve, reject) => {
      if (!this.isModuleInitialized) {
        reject('WebAssembly module not initialized.');
        return;
      }
      // Use Module to call the calculateProfitMargin function
      Module.calculateProfitMargin(this.getDishCostsFromFile(fileName, dishName), dishPrice, dishName, more, (result: number) => {
        resolve(result);
      });
    });
  }

  calculateIngredientDirectCost(ingredAmt: number, ingredCost: number, ingredQuant: number): number {
    return Module.calculateIngredientDirectCost(ingredAmt, ingredCost, ingredQuant);
  }

  calculateOrderingFrequency(demandRate: number, orderingCost: number, holdingCost: number): number {
    return Module.calculateOrderingFrequency(demandRate, orderingCost, holdingCost);
  }

  dishExistsInFile(fileContent: string, targetWords: string): boolean {
    return Module.dishExistsInFile(fileContent, targetWords);
  }

  // Helper method to extract dish price from a CSV-like line
  private extractDishPriceFromLine(line: string): string {
    // Implementation logic for extracting dish price
    // ...

    // Replace this with your actual implementation
    return ''; // Example: returning an empty string
  }

  
}
