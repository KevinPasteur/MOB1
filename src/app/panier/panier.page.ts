import { Component, OnInit } from '@angular/core';
import { DataProvider } from '../providers/data';
import { Storage} from '@ionic/storage';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.page.html',
  styleUrls: ['./panier.page.scss'],
})
export class PanierPage implements OnInit {

  constructor(private data: DataProvider,private storage: Storage) { }
  divs = []
  vegFound = []
  basket = []
  listOfVegs = []
  placeForm: FormGroup;
  ngOnInit() {
    this.data.loadFromAPI().then((vegs)=>{
      this.listOfVegs = vegs
    })
  }

  addVegetableToBasket(id)
  {
    this.data.find(id).then((val)=>{
      this.vegFound = val
      this.basket.push(val)
      
    })

    this.storage.set('basket', this.basket).then(()=>{
      
      this.divs.push(this.vegFound)
     
    })
    console.log(this.placeForm.get('selection'));
    this.listOfVegs.splice(id-1, 1);

  }

  removeVeg(veg){
    console.log(veg)
  }

  RemoveVegetableFromBasket(): void {
    this.divs.unshift();
  }

  


}
