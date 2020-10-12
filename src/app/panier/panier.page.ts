import { Component, OnInit } from '@angular/core';
import { DataProvider } from '../providers/data';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.page.html',
  styleUrls: ['./panier.page.scss'],
})
export class PanierPage implements OnInit {

  constructor(private data: DataProvider) { }

  ngOnInit() {
    this.data.loadFromAPI();
  }

}
