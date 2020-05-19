import { Component, OnInit } from '@angular/core';
import { DataProvider } from '../providers/data';
import { Router } from '@angular/router';

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

  showDetails(v){
    this.router.navigateByUrl('/details',{state: v});
    
  }
  
}

