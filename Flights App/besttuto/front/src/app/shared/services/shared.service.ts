import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { CompanyName } from '../util/enums/company-name.enum';
import { TravelType } from '../util/enums/travel-type.enum';
import { FlightType } from '../util/enums/flight-type.enum';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  companies = [];
  trips = [];
  flightTypes = [];
  haveResult = false;
  creationDone = false;
  syntheseCreationDone =false;
  selectedLanguage = new Subject<string>();
  constractType = new Subject<string>();
  private _searchCriteresForm: FormGroup;
  private _synthesisForm: FormGroup;
  public get synthesisForm(): FormGroup {
    return this._synthesisForm;
  }
  public set synthesisForm(value: FormGroup) {
    this._synthesisForm = value;
  }
  constructor() { }

  public get searchCriteresForm(): FormGroup {
    return this._searchCriteresForm;
  }
  public set searchCriteresForm(value: FormGroup) {
    this._searchCriteresForm = value;
  }

  createSearchCriteresForm() {
    this._searchCriteresForm = new FormGroup({
      company: new FormControl(''),
      flightType: new FormControl(''),
      travelType: new FormControl(''),
      departureLocation: new FormControl(''),
      arrivalLocation: new FormControl(''),
      departureDateMin: new FormControl(''),
      arrivalDateMin: new FormControl(''),
      backDateMin: new FormControl(''),
      departureTimeMin: new FormControl(''),
      arrivalTimeMin: new FormControl(''),
      backTimeMin: new FormControl(''),
      flightDurationMin: new FormControl(''),
      connectionDurationMin: new FormControl(''),
      departureDateMax: new FormControl(''),
      arrivalDateMax: new FormControl(''),
      backDateMax: new FormControl(''),
      departureTimeMax: new FormControl(''),
      arrivalTimeMax: new FormControl(''),
      backTimeMax: new FormControl(''),
      flightDurationMax: new FormControl(''),
      connectionDurationMax: new FormControl(''),
      aircraftType: new FormControl(''),
      fareMin: new FormControl(''),
      fareMax: new FormControl('')
    });
  }

  createSynthesisCriteriaForm() {
    this._synthesisForm = new FormGroup({
      departureDateMin: new FormControl(''),
      departureDateMax: new FormControl('')
    });
  }

  initDropDownLists() {
    const companyKeys = Object.keys(CompanyName);
    this.companies = companyKeys.slice(companyKeys.length / 2);

    const tripKeys = Object.keys(TravelType);
    this.trips = tripKeys.slice(tripKeys.length / 2);

    const flightTypesKeys = Object.keys(FlightType);
    this.flightTypes = flightTypesKeys.slice(flightTypesKeys.length / 2);
  }

}
