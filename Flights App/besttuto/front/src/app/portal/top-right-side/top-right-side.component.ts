import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-top-right-side',
  templateUrl: './top-right-side.component.html',
  styleUrls: ['./top-right-side.component.css']
})
export class TopRightSideComponent implements OnInit {

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
  }

  changeContrast(constract: string) {
    this.sharedService.constractType.next(constract);
  }
  
}
