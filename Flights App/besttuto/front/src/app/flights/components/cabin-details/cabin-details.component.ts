import { Component, OnInit, Input } from '@angular/core';
import { Flight } from 'src/app/shared/models/flight.model';
import { CabinDetail } from 'src/app/shared/models/cabin-detail.model';

@Component({
  selector: 'app-cabin-details',
  templateUrl: './cabin-details.component.html',
  styleUrls: ['./cabin-details.component.css']
})
export class CabinDetailsComponent implements OnInit {

  @Input()
  cabinDetails: Set<CabinDetail>;

  constructor() { }

  ngOnInit(): void {
  }

}
