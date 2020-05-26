import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private token = ''

  constructor(private toaster: ToastController) { }

  ngOnInit() {
  }

  logForm(){
    this.toaster.create({
      message: 'Enregistré',
      duration: 2000
    }).then(toast => {
      toast.present()
    })
    console.log(this.token)
  }

}
