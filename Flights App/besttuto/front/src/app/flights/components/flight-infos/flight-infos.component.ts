import { Component, OnInit, Input } from '@angular/core';
import { Flight } from 'src/app/shared/models/flight.model';

@Component({
  selector: 'app-flight-infos',
  templateUrl: './flight-infos.component.html',
  styleUrls: ['./flight-infos.component.css']
})
export class FlightInfosComponent implements OnInit {

  @Input()
  flightInfos: Flight;

  constructor() { }

  ngOnInit(): void {
  }

}
