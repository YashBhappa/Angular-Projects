import { Component, OnInit, Input } from '@angular/core';
import { SynthesisCriteria } from 'src/app/shared/models/synthesis-criteria.model';

@Component({
  selector: 'app-synthesis-flights',
  templateUrl: './synthesis-flights.component.html',
  styleUrls: ['./synthesis-flights.component.css']
})
export class SynthesisFlightsComponent implements OnInit {
  @Input() nbFlights: number;
  @Input() synthesisCriteria: SynthesisCriteria;
  constructor() { }

  ngOnInit(): void {
  }

}
