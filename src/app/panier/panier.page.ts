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
  vegFound = []
  basket = []
  listOfVegs = []
  countButtonList = []
  totalprice: number = 0
  price:number = 0
  newBasket = []
  countPrice:number=0;

  placeForm: FormGroup;
  ngOnInit() {
    this.data.loadFromAPI().then((vegs)=>{
     
      for (let i = 0; i < vegs.length; i++) {
        let newCount = {
          id: vegs[i]['id'],
          name: vegs[i]['name'],
          count: 1,
          picture: vegs[i]['picture'],
          stock: vegs[i]['stock'],
          price: vegs[i]['price'],
          unit: vegs[i]['unit'],
          quantitySelected: 1
        }
        this.listOfVegs.push(newCount);
      }
      this.storage.get('total').then(val=>{this.totalprice = val})

      this.storage.get('basket').then(val => {
        if(val != ""){
          this.newBasket = val
          this.newBasket.forEach((element1) => {
            this.listOfVegs.forEach((element2,index2) => {
              if(element1.name == element2.name){
                console.log(element1)
                console.log(element2)
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

        let newPushInBasket = {
          id: val.id,
          name: val.name,
          count: 1,
          picture: val.picture,
          stock: val.stock,
          price: val.price,
          quantitySelected: 1
        }
        this.newBasket.push(newPushInBasket);
        console.log(this.newBasket)


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

    this.newBasket.forEach((element,index)=> {
       if(element.name == veg['name']){
        this.newBasket.splice(index, 1)
      } 
    })

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

  setQuantity(quantity,veg)
  {
    if(quantity > 0 && veg.stock >= quantity){
      this.newBasket.forEach((element) =>{
        if(element.name == veg.name){
          element.quantitySelected = quantity
        }
      })
      this.getTotalPrice()
    }
  }

  removeAllVegsFromList()
  { 
    this.basket.splice(0, this.basket.length);
    this.newBasket.splice(0, this.newBasket.length);
    this.data.loadFromAPI().then((vegs)=>{
      this.listOfVegs = vegs
    })
    this.countButtonList.forEach((element) =>{element.count = 1})
    this.storage.remove('basket')
    this.totalprice = 0
    this.storage.set('total', this.totalprice)
  }

  getTotalPrice(){
    this.countPrice = 0;
    this.newBasket.forEach((element) =>{
      this.countPrice += element.quantitySelected * element.price;
    })
    console.log(this.newBasket)
    this.totalprice = this.countPrice
  }

 

  


  

  
}
