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
      this.storage.get('basket').then(val => {
        if(val != null){
          this.basket = val
          this.basket.forEach((element1,index1) => {
            this.listOfVegs.forEach((element2,index2) => {
              
              //console.log(element2)
              if(element1.name == element2.name){
                this.listOfVegs.splice(index2, 1);
              }
            });
          })
          
        } 
      })
    })
  }

  addVegetableToBasket(id)
  {
    if(id!= null){
      this.data.find(id).then((val)=>{
        this.vegFound = val
        this.basket.push(this.vegFound)
      })

      this.storage.set('basket', this.basket).then(()=>{
        
        this.listOfVegs.forEach((element,index) => {
          if(element.name == this.vegFound['name']){
            this.listOfVegs.splice(index, 1);
          }
        })
      })
    }
  }
  removeVegFromList(veg){

    this.basket.forEach((element,index) => {
      if(element.name == veg['name']){
        this.basket.splice(index, 1);
      }
    });
    this.listOfVegs.unshift(veg) 
  }

  removeAllVegsFromList()
  { 
    this.basket.splice(0, this.basket.length);
    this.data.loadFromAPI().then((vegs)=>{
      this.listOfVegs = vegs
    })
    this.storage.remove('basket')
  }


  

  
}
