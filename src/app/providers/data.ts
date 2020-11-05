import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Storage} from '@ionic/storage';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable()
export class DataProvider {

    private apiurl: string = 'http://127.0.0.1:8000/api'
    public stock = []
    public user = []
    public info = []
    public balance:any = [];

    private token =''
    
    constructor(private router: Router,private http: HttpClient,private storage: Storage,private toaster: ToastController){}

    public loadFromAPI(): Promise<any>
    {
      return new Promise<any>((resolve,reject) => {
        this.http.get(this.apiurl+'/products').subscribe(
          response => {
            this.stock = response["data"];
            resolve(this.stock)
          },
          err => {
            console.log('API failed with code '+ err.status)
            console.log(this.apiurl+'/products')
          }
        )
      })
    }

  public checkUser(): Promise<any>
    {
       return new Promise<any>((resolve,reject) => {
        this.http.get(this.apiurl+'/me')
        .subscribe( response => {
          this.user = response["data"]
          resolve(this.user)
          },
          err => {
            this.toaster.create({
              message: 'Votre token est invalide. Veuillez réessayer !',
              duration: 4000,
              color: 'danger'
            }).then(toast => {toast.present()})
            this.storage.remove('token');
          }
        )
      })
     
    }

    public find(id){
      return new Promise<any>((resolve, reject) => {
        
        this.stock.forEach((ved) =>{
          
          if (ved.id == id) resolve(ved)
        })
        reject('Vedj # ' + id + ' not found')
      })
    }

    public getUserBalance(): Promise<any> {
      return new Promise<any> ( (resolve, reject) => {
        this.http.get(this.apiurl+"/me/balance").subscribe(
          response => {
            this.balance = response;
            resolve(this.balance);
          },
          err => {
            this.toaster.create({
              message: 'Votre token est invalide. Veuillez réessayer !',
              duration: 4000,
              color: 'danger'
            }).then(toast => {toast.present()})
            this.storage.remove('token');
          }
        );
      })
    }

}