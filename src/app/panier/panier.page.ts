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
    if(id!= null){
      this.data.find(id).then((val)=>{
        this.vegFound = val
        this.basket.push(val)
      })

      


      this.storage.set('basket', this.basket).then(()=>{
        
        this.listOfVegs.forEach((element,index) => {
          if(element.name == this.vegFound.name){
            this.listOfVegs.splice(index, 1);
          }
        });
        
        console.log(this.listOfVegs.indexOf)
        this.divs.push(this.vegFound)
      
      })

      

    }
  }
  removeVegFromList(veg){

    this.divs.forEach((element,index) => {
      if(element.name == veg.name){
        this.divs.splice(index, 1);
      }
    });
    this.listOfVegs.unshift(veg) 
  }


  

  
}
