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
    profitability; // Variable to store the result
    reorderPoint;
    safetyStock;
    optimalorderQuantity;
    orderFreq;
    cogsResult;


    constructor(private wasmService: WasmService, private storage: AngularFireStorage) {
    }
    // Replace these arrays with your actual data
    // calculate for all the dishes and get arrays of each point
    dishNames = [];
    foodCosts = [];
    orderingFrequency = [2, 3, 1, 4, 2];
    reorderAlert = [false, true, false, true, false];  // Replace with actual boolean values
    runningLowReminder = [true, false, true, false, true];  // Replace with actual boolean values
    // reorderPoint = [30, 25, 35, 20, 40];
    //get data from the storage in Firebase:
    // this.getDataFromFirebaseStorage('path/to/your/data');
  
    // Variables to store chart instances
    foodCostsChart: any;
    orderingFrequencyChart: any;
    reorderAlertChart: any;
    runningLowReminderChart: any;
    // reorderPointChart: any;
  
    async ngOnInit() {
      const prods = await this.wasmService.createProductQuantityMap();
      this.foodCosts = this.wasmService.productSales;
      this.dishNames = this.wasmService.productNames;
      this.foodCostsChart = this.createBarChart('foodCostsChart', 'Food Costs', this.foodCosts, 'blue');
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

    async calculateProfitMargin() {  
      // this.profitabilityResult = 86;
      // console.log(this.dishName);
      (await this.wasmService.calculateIngredientDirectCostfromData(this.dishName.replace(/\s+/g, '-'))).subscribe(
        (result) => {
          console.log("Why yes" + this.profitability);
          this.profitability = this.wasmService.cogs;
        },
        (error) => {
          console.error('Error calculating profitability:', error);
          // Handle errors as needed
        }
      );
    }

    async calculateCOGS(){
      if(this.wasmService.cogs != 0){
        this.cogsResult = (this.wasmService.cogs/this.wasmService.dishPrice);
      }else{
        (await this.wasmService.calculateIngredientDirectCostfromData(this.dishName.replace(/\s+/g, '-'))).subscribe(
          (result) => {
            console.log("Why yes" + this.cogsResult);
            this.cogsResult = result;
          },
          (error) => {
            console.error('Error calculating profitability:', error);
            // Handle errors as needed
          }
        );
      }
    }

    async calculateOptimalOrderQuantity() {  
      //get the sales quantity for all dishes with this ingredient which = sales -> sales.csv filtered to find dishes with certain ingredients
      //get the amount of that ingredient in that dish -> ingredientAmtQuant.txt
      //orderCost = purchasing cost of that ingredient -> ask Santosh about this
      // % of sq footage of restaurant dedicated to storage * rental rate
      if(this.wasmService.cogs != 0){
        this.cogsResult = (this.wasmService.cogs/this.wasmService.dishPrice);
      }else{
        await this.wasmService.calculateIngredientOptimalOrderQuantity(this.ingredient);
        this.optimalorderQuantity = this.wasmService.optOrderQuant;
      }
    }
  
    // Method to handle button click
    onCalculateProfitMarginClick() {
      this.calculateProfitMargin();
    }

    deleteDish() {
      // Call your API endpoint with this.dishName, etc.
      // Handle the response
    }

    async calculateOrderingFreq(){
      if(this.wasmService.orderFreq != 0){
      }else{
        await this.wasmService.calculateOrderingFreq(this.ingredient);
        this.orderFreq = this.wasmService.orderFreq;
      }
    }

    async calculateReorderPoint(){
      if(this.wasmService.reorderPoint != 0){
      }else{
        await this.wasmService.calculateIngredientReorderPoint(this.ingredient);
        this.reorderPoint = this.wasmService.reorderPoint;
      }
    }

    calculateSafetyStock(){

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

