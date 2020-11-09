import { Component, OnInit } from '@angular/core';
import { DataProvider } from '../providers/data';
import { ToastController } from '@ionic/angular';
import { Router,NavigationExtras  } from '@angular/router';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.page.html',
  styleUrls: ['./stock.page.scss'],
})
export class StockPage implements OnInit {

  constructor(private data: DataProvider,private toaster: ToastController,private router: Router) { }
  validatorStock = []
  validateStock = []
  vegToPrint = []
  legumeSelect = 0

  ngOnInit() {

    let validatorStock = {
          id: null,
          name: null,
          quantity: null,
          unit: null,
        }
      

    this.data.loadFromAPI().then((vegs)=>{
      console.log(vegs)
      this.validatorStock = vegs
      console.log(this.validatorStock)
      this.vegToPrint = vegs[this.legumeSelect]

      console.log(this.vegToPrint)
    })
  }

  nextVeg(){ 
    if(this.legumeSelect > 0){
      this.legumeSelect--
      this.vegToPrint = this.validatorStock[this.legumeSelect]
    }
    else
    {
      this.legumeSelect = this.validatorStock.length
    }
    
  }

  prevVeg(){
    if(this.legumeSelect < this.validatorStock.length-1){
      this.legumeSelect++
      this.vegToPrint = this.validatorStock[this.legumeSelect]
    }
    else
    {
      this.legumeSelect = 0
      this.vegToPrint = this.validatorStock[0]
    } 
  }

  sendVeg(veg,quantity){
    if(!quantity){
      this.toaster.create({
        message: 'Veuillez vérifier la quantité',
        duration: 2000,
        color: 'danger'
      }).then(toast => {toast.present()})
    } else {
        this.validatorStock.forEach((element,index) => {
        if(element.name == veg.name){
          this.validatorStock.splice(index, 1);

          let validateStockFormat = {
            id: element.id,
            name: element.name,
            quantity: quantity,
            unit: element.unit,
          }
          this.validateStock.push(validateStockFormat)
          
          if(this.validatorStock.length == 0)
          {
            let navigationExtras: NavigationExtras = {
              state: {
                array: this.validateStock
              }
            };
            this.router.navigate(['overview'], navigationExtras);
          }
          else {
            this.prevVeg()
          } 
        }
      })
    }

   
  }

}
