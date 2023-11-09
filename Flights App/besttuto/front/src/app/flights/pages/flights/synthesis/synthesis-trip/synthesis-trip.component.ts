import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { trigger, transition, animate, keyframes, style } from '@angular/animations';
import { TravelType } from 'src/app/shared/util/enums/travel-type.enum';
import { TranslateService } from '@ngx-translate/core';
import { SynthesisTrip } from 'src/app/shared/models/synthesis-trip.model';
import { Label } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-synthesis-trip',
  templateUrl: './synthesis-trip.component.html',
  styleUrls: ['./synthesis-trip.component.css'],
  animations: [
    trigger(
      "pieAnimation",
      [
        transition(":enter", [
          animate('3s ease', keyframes([
            style({ transform: 'scale(0) rotate(-180deg)' }),
            style({ transform: 'scale(-1) rotate(180deg)' })
          ])),
        ]
        )
      ]),
    trigger(
      "tableAnimation",
      [
        transition(":enter", [
          animate('1000ms ease-in-out', keyframes([
            style({ transform: 'translateX(-200%)' }),
            style({ transform: 'translateX(0)' })
          ]))
        ]
        )
      ])
  ]
})
export class SynthesisTripComponent implements OnInit, OnChanges {
  pieChartLabels: Label[] = [];
  pieChartData: number[] = [];
  pieChartType = 'pie' as ChartType;
  totalFlights = 0;
  colors = [];
  @Input()
  synthesisTrips: SynthesisTrip[] = [];
  constructor(private readonly translateService: TranslateService) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.pieChartLabels = [];
    this.pieChartData = [];
    this.totalFlights = 0;
    this.synthesisTrips.forEach(row => {
      this.totalFlights = this.totalFlights + row.nbFlights;
    });
    this.synthesisTrips.forEach(row => {
      this.pieChartLabels.push(this.translateService.instant('searchFlightForm.trip.' + row.travelType));
      this.pieChartData.push(+((row.nbFlights / this.totalFlights) * 100).toFixed(2));
    })
  }

  ngOnInit(): void {
    this.colors = [
      {
        backgroundColor: [
          '#3f51b5',
          '#EAF9FF',
          '#B2CDD7'
        ]
      }
    ];
  }

}
