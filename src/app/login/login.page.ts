import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage} from '@ionic/storage';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private token = ''

  constructor(private router: Router,private toaster: ToastController, private storage: Storage) { }

  ngOnInit() {
    this.storage.get('token').then(val => {
      this.token = val
    })
  }

  logForm()
  {
    this.storage.set('token',this.token)
    this.toaster.create({
      message: 'Enregistré',
      duration: 2000
    }).then(toast => {
      toast.present()
    })

    this.router.navigate(['home']);
  }

}
