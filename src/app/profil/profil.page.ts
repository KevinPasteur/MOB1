import { Component, OnInit } from '@angular/core';
import { DataProvider } from '../providers/data';
import { Router, NavigationExtras } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {

  private token = ''
  constructor(private router: Router,private storage: Storage ,private data: DataProvider){ }
  ngOnInit(){
    this.data.checkUser(); 
  }

  logout()
  {
    this.storage.remove('token')
    this.router.navigate(['login']);
  }

}
