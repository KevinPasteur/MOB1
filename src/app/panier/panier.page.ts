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
  countButtonList = []
  totalprice: number = 0

  placeForm: FormGroup;
  ngOnInit() {
    this.data.loadFromAPI().then((vegs)=>{
     
      for (let i = 0; i < vegs.length; i++) {
        let newCount = {
          
          name: vegs[i]['name'],
          count: 1,
          stock: vegs[i]['stock'],
          price: vegs[i]['price']
        }
        this.countButtonList.push(newCount);
      }

      this.storage.get('total').then(val=>{this.totalprice = val})

      this.listOfVegs = vegs
      this.storage.get('basket').then(val => {
        if(val != null){
          this.basket = val
          
          this.basket.forEach((element1,index1) => {
            this.listOfVegs.forEach((element2,index2) => {
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
        this.totalprice += this.vegFound['price']
        this.storage.set('total', this.totalprice)
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
        this.basket.splice(index, 1)
      } 
    });

    this.countButtonList.forEach((element) =>{
      if(element.name == veg['name']){
        this.totalprice -= element.price * element.count
        element.count = 1
        this.storage.set('total', this.totalprice)
      }
      
    })
    this.storage.set('basket', this.basket)
    this.listOfVegs.unshift(veg) 
  }

  removeAllVegsFromList()
  { 
    this.basket.splice(0, this.basket.length);
    this.data.loadFromAPI().then((vegs)=>{
      this.listOfVegs = vegs
    })
    this.countButtonList.forEach((element) =>{element.count = 1})
    this.storage.remove('basket')
    this.totalprice = 0
    this.storage.set('total', this.totalprice)
  }

  getTotalPrice(){
    this.basket.forEach(element => {
      console.log(element['price'])
      this.totalprice += element['price']
      this.storage.set('total', this.totalprice)
    });
  }

  decreaseProductCount(veg){
    if(veg.count>1){
      this.totalprice -= veg.price
      veg.count--
    }

  }

  incrementProductCount(veg){
    if(veg.count<veg.stock){
      this.totalprice += veg.price
      veg.count++
    }
  }


  

  
}
