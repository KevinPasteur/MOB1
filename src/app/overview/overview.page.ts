import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { DataProvider } from '../providers/data';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.page.html',
  styleUrls: ['./overview.page.scss'],
})
export class OverviewPage implements OnInit {

  id:any
  overviewArray = []
  newStock = [] 
  constructor(private data: DataProvider,private router: Router,private route: ActivatedRoute, private http: HttpClient,private toaster: ToastController) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.overviewArray = this.router.getCurrentNavigation().extras.state.array
      }
    });
   }

  ngOnInit() {

  
   
   this.overviewArray
   

  }

  updateStock(){

    this.overviewArray.forEach((element) => {
      let newStockFormat = {
        id: element.id,
        quantity: element.quantity
      }
      this.newStock.push(newStockFormat)
      console.log(this.newStock)
      this.data.updateStock(this.newStock)
    })
  }

  goToStock(){
    this.router.navigate(['/stock']);
  }
}
