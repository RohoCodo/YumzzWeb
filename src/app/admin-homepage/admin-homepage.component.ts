import {Component, OnInit} from '@angular/core'
import {FormControl, FormGroup} from '@angular/forms'
import {AngularFirestore} from '@angular/fire/compat/firestore'
import Chart from 'chart.js/auto'
import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/compat/storage';
import { storage } from 'firebase-admin';
import { WasmService } from '../services/wasm.service';
import { FoodWastePageComponent } from '../foodwaste-page/foodwaste.component';
import { ConstantPool } from '@angular/compiler';
import { Observable } from 'rxjs';


interface Ingredient {
  name: string;
  quantity: number;
}

interface RecipeData {
  recipeName: string;
  dishPrice: number;
  ingredients: Ingredient[];
}

interface IngredientQuantAmt {
  name: string;
  quantity: number;
  price: number;
}


declare var $ : any;
@Component({
    selector: 'admin-homepage',
    templateUrl: './admin-homepage.component.html',
    styleUrls: ['./admin-homepage.component.css']
  })
  export class AdminHomePageComponent implements OnInit {

    dishName: string = '';
    ingredient: string = '';
    ingredientsTxtData: string = ''; // Text of Text file gotten from firebase
    ingredientsQuantAmtTxtData: string = ''; // Text of Text file gotten from firebase
    recipeData: RecipeData[] = [];
    ingredientQuantAmtData: IngredientQuantAmt[] = [];
    profitabilityResult; // Variable to store the result
    reorderPointResult;
    safetyStockResult;
    optimalorderQuantity;
    cogsResult;


    constructor(private wasmService: WasmService, private storage: AngularFireStorage) {
    }
    // Replace these arrays with your actual data
    dishNames = ["Dish1", "Dish2", "Dish3", "Dish4", "Dish5"];
    foodCosts = [10, 15, 12, 8, 20];
    orderingFrequency = [2, 3, 1, 4, 2];
    reorderAlert = [false, true, false, true, false];  // Replace with actual boolean values
    runningLowReminder = [true, false, true, false, true];  // Replace with actual boolean values
    reorderPoint = [30, 25, 35, 20, 40];
    //get data from the storage in Firebase:
    // this.getDataFromFirebaseStorage('path/to/your/data');
  
    // Variables to store chart instances
    foodCostsChart: any;
    orderingFrequencyChart: any;
    reorderAlertChart: any;
    runningLowReminderChart: any;
    reorderPointChart: any;
  
    ngOnInit() {
      const filePath = 'gs://virtual-menu-59b9e.appspot.com/Restaurant/Kathmandu-Cuisine/Recipes/ingredients.txt'; // Replace with the actual file path
      this.getFileFromStorage(filePath).subscribe(
      (downloadURL: string) => {
        console.log(`File download URL: ${downloadURL}`);
        // Handle the download URL as needed
      },
      (error) => {
        console.error('Error getting file from storage:', error);
      }
    );
      // Create chart instances with your data

        // Example: Use the WasmService to run your C++ analysis
      
      // const result = this.wasmService.runAnalysis(this.foodCostsChart);
      // console.log('Analysis Result:', result);
      
      // this.foodCostsChart = this.createBarChart('foodCostsChart', 'Food Costs', this.foodCosts, 'blue');
      // this.orderingFrequencyChart = this.createBarChart('orderingFrequencyChart', 'Ordering Frequency', this.orderingFrequency, 'green');
      // this.reorderAlertChart = this.createBarChart('reorderAlertChart', 'Reorder Alert', this.reorderAlert.map(alert => alert ? 1 : 0), 'red');
      // this.runningLowReminderChart = this.createBarChart('runningLowReminderChart', 'Running Low Reminder', this.runningLowReminder.map(reminder => reminder ? 1 : 0), 'orange');
      // this.reorderPointChart = this.createBarChart('reorderPointChart', 'Reorder Point', this.reorderPoint, 'purple');
    }
  
    // Function to create a bar chart
    createBarChart(canvasId: string, label: string, data: number[], color: string) {
        const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
      return new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.dishNames,
          datasets: [{
            label: label,
            data: data,
            backgroundColor: color,
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
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

    calculateProfitMargin() {  
      this.profitabilityResult = 86;
      // console.log(this.dishName);
      // this.wasmService.calculateIngredientDirectCostfromData(this.dishName.replace(/\s+/g, '-')).subscribe(
      //   (result) => {
      //     this.profitabilityResult = result;
      //   },
      //   (error) => {
      //     console.error('Error calculating profitability:', error);
      //     // Handle errors as needed
      //   }
      // );
    }

    calculateCOGS(){
      this.cogsResult = 2.99;
    }

    calculateOptimalOrderQuantity() {  
      console.log(this.dishName);
      this.optimalorderQuantity = 0;
      // this,this.wasmService.calculateOptimalOrderQuantity()
      // this.wasmService.calculateIngredientDirectCostfromData(this.dishName.replace(/\s+/g, '-')).subscribe(
      //   (result) => {
      //     this.optimalorderQuantity = result;
      //   },
      //   (error) => {
      //     console.error('Error calculating profitability:', error);
      //     // Handle errors as needed
      //   }
      // );
    }
  
    // Method to handle button click
    onCalculateProfitMarginClick() {
      this.calculateProfitMargin();
    }

    deleteDish() {
      // Call your API endpoint with this.dishName, etc.
      // Handle the response
    }

    calculateSafetyStock(){
      
    }

    calculateReorderPoint(){

    }
    
    // float calculateIngredientDirectCost(double ingredAmt, double ingredCost, double ingredQuant) {
    //   return (ingredAmt * (ingredQuant / ingredCost));
    // }
    
    // // Optimal order frequency = √(2 x Demand rate x Ordering cost / Holding cost)
    // float calculateOrderingFrequency(double demandRate, double orderingCost, double holdingCost){
    //   return sqrt((2 * demandRate * orderingCost)/holdingCost);
    // }

    // getDataFromFirebaseStorage(path: string): void {
    //   // Use AngularFireStorage to get the download URL
    //   const ref = this.storage.ref(path);
    //   ref.getDownloadURL().subscribe(url => {
    //     // Now 'url' contains the download URL of your data
    //     // You can use this URL to fetch your data, e.g., using Angular's HttpClient
    //     // Once you have the data, you can update your charts
    //     console.log('Download URL:', url);
  
    //     // Call a function to fetch data from the URL and update your charts
    //     // e.g., this.fetchDataAndUpdateCharts(url);
    //   });
    // }
  }

