import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataProvider } from '../providers/data';
import { Storage} from '@ionic/storage';
import {PanierPage} from '../panier/panier.page'
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
 data: any;

 private panier: any;
  constructor(private route: ActivatedRoute, private router: Router, private datas: DataProvider,private storage: Storage,private toaster: ToastController) {

    this.panier = new PanierPage(datas,storage);
    
      this.route.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) {
          this.data = this.router.getCurrentNavigation().extras.state.legume;
        }
      });
  }
 
  ngOnInit() {
    
    
  };

  ngOnDestroy() {}

  addVegetableToBasket(id){
    this.panier.addVegetableToBasket(id);
    this.toaster.create({
      message: 'Salut',
      duration: 4000,
      color: 'danger'
    }).then(toast => {toast.present()})
  }

}
