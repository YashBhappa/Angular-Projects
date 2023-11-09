import { Component, OnInit } from '@angular/core';
import { SynthesisCriteria } from 'src/app/shared/models/synthesis-criteria.model';
import { FlightsService } from 'src/app/flights/services/flights.service';
import { SynthesisCompany } from 'src/app/shared/models/synthesis-company.model';
import { SynthesisTrip } from 'src/app/shared/models/synthesis-trip.model';

@Component({
  selector: 'app-synthesis',
  templateUrl: './synthesis.component.html',
  styleUrls: ['./synthesis.component.css']
})
export class SynthesisComponent implements OnInit {
  nbFlights: number;
  synthesisCriteria: SynthesisCriteria;
  show = false;
  loading = false;
  synthesisCompanies: SynthesisCompany[] = []
  synthesisTrips: SynthesisTrip[] = []
  icon = 'pie_chart';
  title = 'headers.synthesis.label';
  constructor(private readonly flightsService: FlightsService) { }

  ngOnInit(): void {
  }

  doSynthesis(synthesisCriteria: SynthesisCriteria) {
    this.loading = true;
    this.synthesisCriteria = synthesisCriteria;
    this.flightsService.getNumberFlights(synthesisCriteria).subscribe(nbFlights => {
      this.nbFlights = nbFlights;
      this.loading = false;
      if (this.nbFlights === 0) {
        this.show = false;
      }
      else {
        this.show = true;
      }
    })
    this.flightsService.synthesisCompanyFlights(synthesisCriteria).subscribe(synthesisCompanies => {
      this.synthesisCompanies = synthesisCompanies;
    })
    this.flightsService.synthesisTripFlights(synthesisCriteria).subscribe(synthesisTrips => {
      this.synthesisTrips = synthesisTrips;
    })
  }

}
