import { Component, OnInit } from '@angular/core';
import { Flight } from 'src/app/shared/models/flight.model';
import { FlightsService } from 'src/app/flights/services/flights.service';
import { CabinDetail } from 'src/app/shared/models/cabin-detail.model';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-flights-details',
  templateUrl: './flights-details.component.html',
  styleUrls: ['./flights-details.component.css']
})
export class FlightsDetailsComponent implements OnInit {
  navigationExtras: NavigationExtras;
  flightDetails: Flight;
  cabinDetails: Set<CabinDetail>;
  idFlight: number;
  constructor(private readonly flightsService: FlightsService,private readonly router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.idFlight=this.flightsService.flightDetails.idFlight;
    this.flightDetails = this.flightsService.flightDetails;
    this.cabinDetails = this.flightsService.flightDetails.cabinDetails;

    this.navigationExtras = {
      state: {
        InflightServices: this.flightDetails.inflightInfos
      },
      relativeTo: this.route
    };
  }

  viewInflightServices() {
    this.router.navigate(['services'], this.navigationExtras);
  }

}
