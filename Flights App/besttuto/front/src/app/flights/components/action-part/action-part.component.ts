import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FlightsService } from '../../services/flights.service';

@Component({
  selector: 'app-action-part',
  templateUrl: './action-part.component.html',
  styleUrls: ['./action-part.component.css']
})
export class ActionPartComponent implements OnInit {
  hideNext = false;
  hidePrevious = false;
  @Input()
  idFlight: number;
  flightsIds: number[] = [];
  currentIndex = 0;
  constructor(private readonly router: Router, private readonly flightsService: FlightsService) { }

  ngOnInit(): void {
    this.flightsIds = this.flightsService.flightsIds;
    this.currentIndex = this.flightsIds.indexOf(this.idFlight);
  }

  backToList() {
    this.router.navigate(['/myFlightApp/flights']);
  }

  previousPage() {
    if (this.currentIndex <= 0) {
      this.hidePrevious = true;
    }
    else if (this.currentIndex > 0) {
      this.hidePrevious = false;
      this.currentIndex = this.currentIndex - 1;
      this.flightsService.getFlightDetails(this.flightsIds[this.currentIndex]);
    }
  }

  nextPage() {
    if (this.currentIndex >= this.flightsIds.length - 1) {
      this.hideNext = true;
    }
    else if (this.currentIndex < this.flightsIds.length - 1) {
      this.hideNext = false;
      this.currentIndex = this.currentIndex + 1;
      this.flightsService.getFlightDetails(this.flightsIds[this.currentIndex]);
    }
  }
}
