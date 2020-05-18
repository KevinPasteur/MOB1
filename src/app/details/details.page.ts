import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
 value;

  constructor(private route: ActivatedRoute) {}
 
  ngOnInit() {
    this.value = this.route.params.subscribe(params => {
      console.log(this.value);
   });
  }
  ngOnDestroy() {
    this.value.unsubscribe();
  }

}
