import {Component, OnInit} from '@angular/core'
import {FormControl, FormGroup} from '@angular/forms'
import {AngularFirestore} from '@angular/fire/compat/firestore'
import Chart from 'chart.js/auto'
import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/compat/storage';
import { storage } from 'firebase-admin';
import { WasmService } from '../services/wasm.service';
import { FoodWastePageComponent } from '../foodwaste-page/foodwaste.component';




declare var $ : any;
@Component({
    selector: 'admin-homepage',
    templateUrl: './admin-homepage.component.html',
    styleUrls: ['./admin-homepage.component.css']
  })
  export class AdminHomePageComponent implements OnInit {

    userInputDishName: string = '';

    constructor(private wasmService: WasmService) {}
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
      // Create chart instances with your data

        // Example: Use the WasmService to run your C++ analysis
      
      const result = this.wasmService.runAnalysis(this.foodCostsChart);
      console.log('Analysis Result:', result);
      
      this.foodCostsChart = this.createBarChart('foodCostsChart', 'Food Costs', this.foodCosts, 'blue');
      this.orderingFrequencyChart = this.createBarChart('orderingFrequencyChart', 'Ordering Frequency', this.orderingFrequency, 'green');
      this.reorderAlertChart = this.createBarChart('reorderAlertChart', 'Reorder Alert', this.reorderAlert.map(alert => alert ? 1 : 0), 'red');
      this.runningLowReminderChart = this.createBarChart('runningLowReminderChart', 'Running Low Reminder', this.runningLowReminder.map(reminder => reminder ? 1 : 0), 'orange');
      this.reorderPointChart = this.createBarChart('reorderPointChart', 'Reorder Point', this.reorderPoint, 'purple');
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

    async calculateProfitMargin() {
      try {
        // Retrieve dishName from user input
        const dishName = this.userInputDishName;
  
        // Check if the dishName is not empty
        if (!dishName) {
          console.error('Dish name is required.');
          return;
        }
  
        // You may need to fetch dishCosts and dishPrice from Firebase Storage here
        // Example: const dishCosts = await this.getDataFromFirebaseStorage('path/to/dishCosts');
        //          const dishPrice = await this.getDataFromFirebaseStorage('path/to/dishPrice');
  
        // Sample data for testing
        const dishCosts = { Dish1: 5, Dish2: 10, Dish3: 8, Dish4: 15, Dish5: 12 };
        const dishPrice = 20;
        const more = true;
  
        // Calculate profit margin
        // const profitMargin = await this.wasmService.calculateProfitMargin(dishCosts, dishPrice, dishName, more);
  
        // Log the result or update your UI as needed
        // console.log('Profit Margin:', profitMargin);
      } catch (error) {
        console.error(error);
      }
    }
  
    // Method to handle button click
    onCalculateProfitMarginClick() {
      this.calculateProfitMargin();
    }

    // runProfitMarginCalculator() {
    //   // Example: Use the WasmService to run your C++ profit margin calculator
    //   const result = this.wasmService.calculateProfitMargin();
      
    //   // profitMarginCommand(this.foodCostsChart);
    //   console.log('Profit Margin:', result);
    // }

    // float calculateOptimalOrderQuantity(double orderCost, int sales, double storingCost){
    //   return sqrt((2 * orderCost * sales)/storingCost);
    // }
    
    // float calculateSafetyStock(int maxLeadTime, int averageLeadTime, int averageSales){
    //   return (maxLeadTime - averageLeadTime) * averageSales;
    // }
    
    // float calculateReorderPoint(int safetyStock, int averageConsumption, int leadTime){
    //   return (safetyStock + (averageConsumption * leadTime));
    // }
    
    // float calculateProfitMargin(float sellingPrice, float costOfGoodsSold) {
    //   return ((sellingPrice - costOfGoodsSold) / sellingPrice) * 100;
    // }
    
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

