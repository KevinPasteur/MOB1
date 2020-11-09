import { Component, OnInit } from '@angular/core';
import { DataProvider } from '../providers/data';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.page.html',
  styleUrls: ['./stock.page.scss'],
})
export class StockPage implements OnInit {

  constructor(private data: DataProvider) { }
  stock = []
  legumePrint = []
  legumeSelect = 0

  ngOnInit() {
    this.data.loadFromAPI().then((vegs)=>{
      this.stock = vegs
      this.vegToPrint = vegs[this.legumeSelect]

      console.log(this.vegToPrint)
    })
  }

  nextVeg(){
    legumeSelect++
    this.vegToPrint = this.stock[this.legumeSelect]
  }

  prevVeg(){
    legumeSelect--
    this.vegToPrint = this.stock[this.legumeSelect]
  }

}
