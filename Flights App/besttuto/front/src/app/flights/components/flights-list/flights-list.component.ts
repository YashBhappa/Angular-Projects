import { Component, OnInit, ViewChild, Input, TemplateRef, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Flight } from 'src/app/shared/models/flight.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FlightsService } from '../../services/flights.service';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-flights-list',
  templateUrl: './flights-list.component.html',
  styleUrls: ['./flights-list.component.css']
})
export class FlightsListComponent implements OnInit {
  flightsIds: number[] = [];

  @Input()
  flights = new MatTableDataSource<Flight>();

  selectedFlights = new MatTableDataSource<Flight>();

  flightsTemp = new MatTableDataSource<Flight>();      

  displayBackButton = false;

  title: string;

  @Output() bookmarkTitle = new EventEmitter<string>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) matSort: MatSort;

  displayedColumns: string[] = ['companyName',
    'flightType',
    'travelType',
    'departureDate',
    'departureTime',
    'arrivalDate',
    'arrivalTime',
    'backDate',
    'backTime',
    'departureLocation',
    'arrivalLocation',
    'select'];

  constructor(private readonly flightsService: FlightsService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.flights.paginator = this.paginator;
    this.flights.sort = this.matSort;
    for (const flight of this.flights.data) {
      this.flightsIds.push(flight.idFlight);
    }
    this.flightsService.flightsIds = this.flightsIds;
    this.flightsTemp = this.flights;
  }

  getSelectedFlights() {
    this.selectedFlights.paginator = this.paginator;
    this.flights = this.selectedFlights;
    this.displayBackButton = true;
  }

  addRow(row?: Flight) {
    if (!this.ifRowExist(row)) {
      this.selectedFlights.data.push(row);
    }
  }

  ifRowExist(row?: Flight): boolean | undefined {
    for (let i = 0; i < this.selectedFlights.data.length; ++i) {
      if (this.selectedFlights.data[i].idFlight === row.idFlight) {
        this.selectedFlights.data.splice(i, 1);
        return true;
      }
    }
  }

  backToResultList() {
    this.flightsTemp.paginator = this.paginator;
    this.flights = this.flightsTemp;
    this.displayBackButton = false;
  }

  openDialogWithRef(ref: TemplateRef<any>) {
    this.dialog.open(ref);
  }

  addBookmark() {
    this.bookmarkTitle.emit(this.title);
  }

  getFlight(idFlight: number) {
    this.flightsService.getFlightDetails(idFlight);
  }
 
}  
