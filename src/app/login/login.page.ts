import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage} from '@ionic/storage';
import { Router, NavigationExtras } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { DataProvider } from '../providers/data';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private token: String;
  nom = '';
  prenom = '';
  tel = '';
  tokenform = '';
  private response = '';

  
  // API path
  base_path = 'http://localhost:8000/api';

  constructor(private router: Router,private toaster: ToastController, private storage: Storage, private http: HttpClient, private data: DataProvider) { }


  ngOnInit() {

      this.storage.get('token').then(val => {
        console.log(val)
        if (val != null)this.router.navigate(['profil']);
      })
    }

  logForm()
  {
    this.storage.set('token', this.tokenform).then(()=>{
      this.data.checkUser().then((val)=>{
      if(val != null)this.router.navigate(['home']);
      })
       
    })
    
    
    
  }
    

  SignForm()
  {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    let options = {
      headers: headers
    }

    let data = {
            "firstname": this.prenom,
            "lastname": this.nom,
            "phonenumber": this.tel
    }

     this.http.post(this.base_path+'/user/apply', data, options)
    .subscribe(
      data => {this.toaster.create({
        message: 'Inscription validée ! Vous avez reçu un mail avec votre token',
        duration: 4000,
        color: 'success'
      }).then(toast => {toast.present()})
      },
      err => this.toaster.create({
        message: 'Veuillez vérifier le formulaire',
        duration: 2000,
        color: 'danger'
      }).then(toast => {toast.present()}),
    )
    
    ;

  
  }
}
