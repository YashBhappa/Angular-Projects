import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { FormGroup, FormControl } from '@angular/forms';
import { SharedService } from '../../services/shared.service';
import { FlightCriteria } from '../../models/flight-criteria.model';
import { isNullOrUndefined } from 'util';
import { FlightsService } from 'src/app/flights/services/flights.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {
  companies = [];
  trips = [];
  flightTypes = [];
  showConnection = true;
  showBack = true;
  searchFlightForm: FormGroup;
  @Output() onSearch = new EventEmitter<FlightCriteria>();

  timeTheme: NgxMaterialTimepickerTheme = {
    container: {
      bodyBackgroundColor: '#3f51b5',
      buttonColor: '#fff'
    },
    dial: {
      dialBackgroundColor: '#B2CDD7',
      dialEditableBackgroundColor: '#000000',
    },
    clockFace: {
      clockFaceBackgroundColor: '#F1F1F1',
      clockHandColor: '#3f51b5',
      clockFaceTimeInactiveColor: '#000000'
    }
  }
  constructor(private readonly sharedService: SharedService, private readonly flightsService: FlightsService) { }

  ngOnInit(): void {
    if (this.sharedService.creationDone === false) {
      this.sharedService.createSearchCriteresForm();
      this.sharedService.initDropDownLists();
      this.sharedService.creationDone = true;
    }
    this.searchFlightForm = this.sharedService.searchCriteresForm;
    this.companies = this.sharedService.companies;
    this.trips = this.sharedService.trips;
    this.flightTypes = this.sharedService.flightTypes;
    if (this.sharedService.haveResult) {
      this.searchFlight();
    }
    if (!isNullOrUndefined(this.flightsService.flightCriteria)) {
      this.onSearch.emit(this.flightsService.flightCriteria);
      this.flightsService.flightCriteria = null;
    }
  }
  resetForm(form: FormGroup) {
    form.reset();
  }

  searchFlight() {
    const searchFlightValues = this.searchFlightForm.value;
    if (isNullOrUndefined(searchFlightValues.flightType) || searchFlightValues.flightType === '') {
      searchFlightValues.flightType = null;
    }
    if (isNullOrUndefined(searchFlightValues.company) || searchFlightValues.company === '') {
      searchFlightValues.company = null;
    }
    if (isNullOrUndefined(searchFlightValues.travelType) || searchFlightValues.travelType === '') {
      searchFlightValues.travelType = null;
    }
    this.onSearch.emit(searchFlightValues);
  }

  selectedFlightType(value) {
    if (value === 'DIRECT') {
      this.showConnection = false;
    }
    else {
      this.showConnection = true;
    }
  }
  selectedTripType(value) {
    if (value === 'ONEWAYTICKET') {
      this.showBack = false;
    }
    else {
      this.showBack = true;
    }
  }
}
