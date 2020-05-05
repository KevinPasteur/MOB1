import { Component } from '@angular/core';
import { DataProvider } from '../providers/data';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  public welcomeMessage : string = 'Hello le monde';
  public name;
  public datas = new DataProvider;

  constructor() {
  }
  
}

