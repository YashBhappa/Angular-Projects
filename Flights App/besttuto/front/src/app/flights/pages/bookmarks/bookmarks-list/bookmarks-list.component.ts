import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Bookmark } from 'src/app/shared/models/bookmark.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FlightsService } from 'src/app/flights/services/flights.service';
import { MatDialog } from '@angular/material/dialog';
import { trigger, transition, query, style, animate } from '@angular/animations';

@Component({
  selector: 'app-bookmarks-list',
  templateUrl: './bookmarks-list.component.html',
  styleUrls: ['./bookmarks-list.component.css'],
  animations: [  
    trigger("listAnimation", [
      transition("* => *", [
        // each time the binding value changes
        query(
          ":leave",
          [
            style({transform: 'translateX(0)', opacity: 1}),
            animate('1000ms', style({transform: 'translateX(100%)', opacity: 0}))
          ],
          { optional: true }
        )
      ])
    ])
  ]
})
export class BookmarksListComponent implements OnInit {
  loading = false;
  bookmarks = new MatTableDataSource<Bookmark>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) matSort: MatSort;
  displayedColumns: string[] = [
    'idBookmark',
    'title',
    'addingDate',
    'nbFlights',
    'view'];
  constructor(private readonly flightsService: FlightsService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.bookmarks.paginator = this.paginator;
    this.bookmarks.sort = this.matSort;
    this.loading = true;
    this.flightsService.getBookmarkList().subscribe(bookmarks => {
      this.bookmarks.data = bookmarks;
      this.loading = false;
    })
  }

  viewBookmark(idBookmark: number) {
    this.flightsService.viewBookmark(idBookmark);
  }

  openDialogWithRef(ref: TemplateRef<any>) {
    this.dialog.open(ref);
  }

  deleteBookmark(bookmark: Bookmark) {
    this.flightsService.deleteBookmark(bookmark.idBookmark).subscribe(data => {
      const newData = this.bookmarks.data;
      newData.splice(newData.indexOf(bookmark), 1);
      this.bookmarks.data = newData;
    }
    );
  }

  deleteAllBookmark() {
    this.flightsService.deleteAllBookmark().subscribe(data => {
      const newData = this.bookmarks.data;
      newData.splice(0,this.bookmarks.data.length);
      this.bookmarks.data = newData;
    });
  }
}
