import { Component, OnInit } from '@angular/core';
import { DataProvider } from '../providers/data';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.page.html',
  styleUrls: ['./panier.page.scss'],
})
export class PanierPage implements OnInit {

  constructor(private data: DataProvider) { }
  divs: number[] = [];
  vegFound = []
  ngOnInit() {
    this.data.loadFromAPI();
  }

  addVegetableToBasket(id)
  {
    this.data.find(id).then((val)=>{this.vegFound=val})
    console.log(this.vegFound)
    this.divs.push(this.divs.length)
  }

  RemoveVegetableFromBasket(): void {
    this.divs.unshift();
  }

  


}
