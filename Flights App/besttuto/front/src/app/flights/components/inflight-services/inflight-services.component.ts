import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InflightInfo } from 'src/app/shared/models/inflight-info.model';

@Component({
  selector: 'app-inflight-services',
  templateUrl: './inflight-services.component.html',
  styleUrls: ['./inflight-services.component.css']
})
export class InflightServicesComponent implements OnInit {
  
  InflightServices: Set<InflightInfo>;
  clicked=false;
  constructor(private readonly router: Router) {
    this.InflightServices = this.router.getCurrentNavigation().extras.state.InflightServices;
   }

  ngOnInit(): void {
  }

  cardClicked(el: HTMLElement){
    this.clicked=!this.clicked;
    el.scrollIntoView();
  }
}
