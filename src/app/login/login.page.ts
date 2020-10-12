import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage} from '@ionic/storage';
import { Router, NavigationExtras, ChildActivationStart } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { DataProvider } from '../providers/data';

import { AuthGuardService } from '../services/auth-guard.service';

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

  constructor(private router: Router,private toaster: ToastController, private storage: Storage, private http: HttpClient, private data: DataProvider, private auth: AuthGuardService) { 
    
    this.storage.get('token').then(val => {
    if (val != null)this.router.navigate(['profil']);
  })

}    

  logForm()
  {
    this.storage.set('token', this.tokenform).then(()=>{
      this.data.checkUser().then((val)=>{
      if(val != null)
        {
          this.auth.authenticated = true
          this.router.navigate(['profil']);
        }
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

    let erreur = "";

    let data = {
            "firstname": this.prenom,
            "lastname": this.nom,
            "phonenumber": this.tel
    }

     this.http.post(this.base_path+'/user/apply', data, options)
    .subscribe(
      data => {this.toaster.create({
        message: 'Inscription validée ! Vous allez recevoir un message avec votre token',
        duration: 4000,
        color: 'success'
      }).then(toast => {toast.present()})
      },
      err => {
        if(this.prenom == "" || this.nom == "") erreur = "Prenom ou Nom invalide"
        else erreur = err.error
        this.toaster.create({  
          message: erreur,
          duration: 2000,
          color: 'danger'
      }).then(toast => {toast.present()})
      }
      
    )
    
    ;

  
  }
}
