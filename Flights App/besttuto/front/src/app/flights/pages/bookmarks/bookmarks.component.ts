import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent implements OnInit {
  title = 'headers.bookmarks.label';
  icon = 'bookmark_border';
  constructor() { }

  ngOnInit(): void {
  }

}
