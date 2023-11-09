import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Flight } from 'src/app/shared/models/flight.model';
import { FlightCriteria } from 'src/app/shared/models/flight-criteria.model';
import { FlightsService } from 'src/app/flights/services/flights.service';
import { Bookmark } from 'src/app/shared/models/bookmark.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-flights-page',
  templateUrl: './flights-page.component.html',
  styleUrls: ['./flights-page.component.css']
})
export class FlightsPageComponent implements OnInit {
  show = false;
  loading = false;
  nbFlights: number;
  flightsData = new MatTableDataSource<Flight>();
  isHiddenSearch = false;
  flightCriteria: FlightCriteria;
  horizontalPosition: MatSnackBarHorizontalPosition ='center';
  verticalPosition: MatSnackBarVerticalPosition= 'top';
  title = 'headers.home.label';
  icon = 'search';
  constructor(private readonly flightsService: FlightsService, private readonly sharedService: SharedService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
  hideSearchForm() {
    this.isHiddenSearch = !this.isHiddenSearch;
  }
  searchFlights(flightCriteria: FlightCriteria) {
    this.flightCriteria = flightCriteria;
    this.isHiddenSearch = true;
    this.loading = true;
    this.flightsService.searchFlights(flightCriteria)
      .subscribe(flightsList => {
        this.nbFlights = flightsList.length;
        this.flightsData.data = flightsList;
        this.loading = false;
        if (this.nbFlights === 0) {
          this.show = false;
          this.isHiddenSearch = false;
        }
        else {
          this.sharedService.haveResult = true;
          this.show = true;
        }
      })
  }
  addBookmark(title: string) {
    const bookmark: Bookmark = new Bookmark();
    bookmark.title = title;
    bookmark.addingDate = new Date();
    bookmark.nbFlights = this.nbFlights;
    bookmark.flightCriteria = this.flightCriteria;
    this.flightsService.addBookmark(bookmark).subscribe(data => {
      this._snackBar.open('Bookmark added successfully !', null, {
        duration: 3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        panelClass: ['blue-snackbar']
      });
    });
  }
}
