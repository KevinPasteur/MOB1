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
    public basket = []
    private token =''
    
    constructor(private router: Router,private http: HttpClient,private storage: Storage,private toaster: ToastController){}

    public loadFromAPI(): Promise<any>
    {
      return new Promise<any>((resolve,reject) => {
        this.http.get(this.apiurl+'/products').subscribe(
          response => {
            this.stock = response["data"];
          },
          err => {
            console.log('API failed with code '+ err.status)
            console.log(this.apiurl+'/products')
          }
        )
      })
    }

    public loadFromAPIMe(token): Promise<any>
    {
      let headers = new HttpHeaders({
      'Content-Type': 'application/json'
     });

      headers = headers.append('Accept','application/json');
      headers = headers.append('Authorization','Bearer '+this.token);
      
      
      let options = {
        headers: headers
      }

      return new Promise<any>((resolve,reject) => {
            this.http.get(this.apiurl+'/me', options)
            .subscribe( res => {
              this.info = res["data"]
            },
            err => {
            
            console.log('test')
          })
      })

    }

  public checkUser(): Promise<any>
    {
       return new Promise<any>((resolve,reject) => {
        this.http.get(this.apiurl+'/me')
        .subscribe( response => {
          this.user = response["data"]
          return resolve(response["data"]);
          },
          err => {
            this.toaster.create({
              message: 'Votre token est invalide. Veuillez réessayer !',
              duration: 4000,
              color: 'danger'
            }).then(toast => {toast.present()})
            this.storage.clear();
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

}