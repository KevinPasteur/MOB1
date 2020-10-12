import { Component, OnInit } from '@angular/core';
import { DataProvider } from '../providers/data';
import { Router, NavigationExtras } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {


  constructor(private router: Router, private data: DataProvider){}

  ngOnInit(){
    this.data.loadFromAPI();
  }

  showDetails(legume){
    let navigationExtras: NavigationExtras = {
      state: {
        legume: legume
      }
    };
    this.router.navigate(['details'], navigationExtras);
  }

  

  
    
}


