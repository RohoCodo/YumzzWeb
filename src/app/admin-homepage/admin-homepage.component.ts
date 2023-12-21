import {Component, OnInit} from '@angular/core'
import {FormControl, FormGroup} from '@angular/forms'
import {AngularFirestore} from '@angular/fire/compat/firestore'
import Chart from 'chart.js/auto'
import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/compat/storage';
import { storage } from 'firebase-admin';



declare var $ : any;
@Component({
    selector: 'app-admin-homepage',
    templateUrl: './admin-homepage.component.html',
    styleUrls: ['./admin-homepage.component.css']
  })
  export class AdminHomePageComponent implements OnInit {
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

