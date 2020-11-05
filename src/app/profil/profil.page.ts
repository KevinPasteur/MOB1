import { Component, OnInit } from '@angular/core';
import { DataProvider } from '../providers/data';
import { Router, NavigationExtras } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { SelectValueAccessor, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {

  private token = ''
  constructor(private router: Router,private storage: Storage ,private data: DataProvider, private toaster: ToastController){ }
  ngOnInit(){
    this.data.checkUser()
    this.data.getUserBalance()

  }

  logout()
  {
    this.storage.clear();

    this.toaster.create({
      message: "Vous êtes bien déconnecté !",
      color: 'success',
      duration: 2000
    }).then(toast => {
      toast.present();
    })

    this.router.navigate(['login']);
  }

}
