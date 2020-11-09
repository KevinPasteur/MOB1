import { Component, OnInit } from '@angular/core';
import { DataProvider } from '../providers/data';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.page.html',
  styleUrls: ['./stock.page.scss'],
})
export class StockPage implements OnInit {

  constructor(private data: DataProvider) { }
  validatorStock = []
  vegToPrint = []
  legumeSelect = 0

  ngOnInit() {
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

  

}
