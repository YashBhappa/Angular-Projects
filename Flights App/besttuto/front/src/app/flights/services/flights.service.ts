import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Flight } from 'src/app/shared/models/flight.model';
import { HttpClient } from '@angular/common/http';
import { FlightCriteria } from 'src/app/shared/models/flight-criteria.model';
import { Bookmark } from 'src/app/shared/models/bookmark.model';
import { Router } from '@angular/router';
import { SynthesisCriteria } from 'src/app/shared/models/synthesis-criteria.model';
import { SynthesisCompany } from 'src/app/shared/models/synthesis-company.model';
import { SynthesisTrip } from 'src/app/shared/models/synthesis-trip.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {
  flightsIds: number[] = [];
  flightCriteria: FlightCriteria;
  flightDetails: Flight;
  readonly API_URL = environment.apiUrl;

  constructor(private readonly http: HttpClient, private readonly router: Router) { }

  getFlightList(): Observable<Flight[]> {
    return this.http.get<Flight[]>(this.API_URL);
  }

  searchFlights(flightCriteria: FlightCriteria): Observable<Flight[]> {
    return this.http.post<Flight[]>(this.API_URL, flightCriteria);
  }

  addBookmark(bookmark: Bookmark): Observable<Bookmark> {
    return this.http.post<Bookmark>(this.API_URL + '/bookmarks', bookmark);
  }

  getBookmarkList(): Observable<Bookmark[]> {
    return this.http.get<Bookmark[]>(this.API_URL + '/bookmarks');
  }

  getBookmark(idBookmark: number): Observable<Bookmark> {
    return this.http.get<Bookmark>(`${this.API_URL}/bookmarks/${idBookmark}`);
  }

  deleteBookmark(idBookmark: number) {
    return this.http.delete<Bookmark>(`${this.API_URL}/bookmarks/${idBookmark}`);
  }

  deleteAllBookmark() {
    return this.http.delete<Bookmark>(`${this.API_URL}/bookmarks`);
  }

  getNumberFlights(synthesisCriteria: SynthesisCriteria): Observable<number> {
    return this.http.post<number>(this.API_URL + '/numberFlights', synthesisCriteria);
  }

  synthesisCompanyFlights(synthesisCriteria: SynthesisCriteria): Observable<SynthesisCompany[]> {
    return this.http.post<SynthesisCompany[]>(this.API_URL + '/syntheseCompanyFlights', synthesisCriteria);
  }

  synthesisTripFlights(synthesisCriteria: SynthesisCriteria): Observable<SynthesisTrip[]> {
    return this.http.post<SynthesisTrip[]>(this.API_URL + '/syntheseTripFlights', synthesisCriteria);
  }

  viewBookmark(idBookmark: number): void {
    this.getBookmark(idBookmark).subscribe(bookmark => {
      this.flightCriteria = bookmark.flightCriteria;
      this.router.navigate(['/myFlightApp/flights']);
    })
  }

  getFlight(idFlight: number): Observable<Flight> {
    return this.http.get<Flight>(`${this.API_URL}/${idFlight}`);
  }

  getFlightDetails(idFlight: number): void {
    this.getFlight(idFlight).subscribe(flightResult => {
      this.flightDetails = flightResult;
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(['myFlightApp/details']));
    });
  }

}
