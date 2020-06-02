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

  authenticated = false;
  message = '';

  constructor(private http: HttpClient,private router: Router, private data: DataProvider, private storage: Storage){}

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

  setAuthState(authenticated) {
    if(authenticated) {
      this.storage.set('my_token', 'myspecialheadertoken').then(() => {
        this.authenticated = true;
      });
    } else {
      this.storage.remove('my_token').then(() => {
        this.authenticated = false;
      });
    }
  }
 
  getSuccessful() {
    this.http.get('').subscribe(res => {
      this.message = res['results'][0].name;
    });
  }
 
  getFail() {
    this.http.get('').subscribe(
      res => {}
      ,err => {
        this.message = err.message;
      }
    );
  }

  
    
}


