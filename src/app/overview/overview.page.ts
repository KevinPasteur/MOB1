import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { DataProvider } from '../providers/data';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.page.html',
  styleUrls: ['./overview.page.scss'],
})
export class OverviewPage implements OnInit {

  id:any
  overviewArray = []
  constructor(private data: DataProvider,private router: Router,private route: ActivatedRoute, private http: HttpClient,private toaster: ToastController) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.overviewArray.push(params)
      console.log(this.overviewArray)
      this.overviewArray.forEach((element) =>{
        console.log(element[0])
      })

      this.listOfVegs.forEach((element,index) => {
          if(element.name == this.vegFound['name']){
            this.listOfVegs.splice(index, 1);
          }
        })

    });

  }

  updateStock(){
    this.data.updateStock()
  }

  goToStock(){
    this.router.navigate(['/stock']);
  }
}
