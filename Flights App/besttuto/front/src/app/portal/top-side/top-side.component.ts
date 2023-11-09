import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-top-side',
  templateUrl: './top-side.component.html',
  styleUrls: ['./top-side.component.css']
})
export class TopSideComponent implements OnInit {
  @Input() title: string;
  @Input() icon: string;
  constructor() { }

  ngOnInit(): void {
  }

}
