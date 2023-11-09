import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SynthesisCompany } from 'src/app/shared/models/synthesis-company.model';
import { CompanyName } from 'src/app/shared/util/enums/company-name.enum';
import { TranslateService } from '@ngx-translate/core';
import { trigger, transition, animate, keyframes, style } from '@angular/animations';
import { Label } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-synthesis-company',
  templateUrl: './synthesis-company.component.html',
  styleUrls: ['./synthesis-company.component.css'],
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
      ]
  ),
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
export class SynthesisCompanyComponent implements OnInit, OnChanges {
  @Input()
  synthesisCompanies: SynthesisCompany[] = [];
  totalFlights = 0;
  pieChartType = 'pie' as ChartType;
  pieChartLabels: Label[] = [];
  pieChartData: number[] = [];
  colors = [];
  constructor(private readonly translateService: TranslateService) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.pieChartLabels = [];
    this.pieChartData = [];
    this.totalFlights = 0;
    this.synthesisCompanies.forEach(row => {
      this.totalFlights = this.totalFlights + row.nbFlights;
    });
    this.synthesisCompanies.forEach(row => {
      this.pieChartLabels.push(this.translateService.instant('searchFlightForm.company.' + row.companyName));
      this.pieChartData.push(+((row.nbFlights / this.totalFlights) * 100).toFixed(2));
    });
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
