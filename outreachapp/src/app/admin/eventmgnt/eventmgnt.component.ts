import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogConfig } from '@angular/material';

import { Router } from '@angular/router';
import { EventService } from 'src/app/shared/event.service';
import { MessageComponent } from 'src/app/message/message.component';

@Component({
  selector: 'app-eventmgnt',
  templateUrl: './eventmgnt.component.html',
  styleUrls: ['./eventmgnt.component.css']
})
export class EventmgntComponent implements OnInit {

  displayedColumns: string[] = ['select', 'benName', 'council', 'project', 'eventCat', 'eventStatus'];

  selection = new SelectionModel<Event>(true, []);

  message: string;
  redirectTo: string;
  currentPage: string;
  messageType: string;


  constructor(private eventService: EventService,
    private router: Router,
    public dialog: MatDialog) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<Event>;

  ngOnInit() {
    this.getEventList();
  }

  getEventList() {
    return this.eventService.getPendingEvents()
      .subscribe((eventDet: Event[]) => {
        this.dataSource = new MatTableDataSource();
        this.dataSource.data = eventDet;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  updateBulkEvent(eveStatus: string) {
    var selectedEventIds = this.selection.selected;
    var uID = localStorage.getItem("userID");
    console.log(JSON.stringify(selectedEventIds));
    this.eventService.updateBulkEventStatus(eveStatus, uID, selectedEventIds)
      .subscribe(() => {
        this.message = "Selected Events are " + eveStatus + " successfully !!!";
        this.currentPage = "Event Approval Status"
        this.redirectTo = "/eventlist";
        this.messageType = "S";
        this.openDialog();

      })
  }


  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(MessageComponent, {
      width: '500px',
      data: {
        message: this.message, redirectTo: this.redirectTo,
        currentPage: this.currentPage, messageType: this.messageType
      }
    });
    dialogRef.afterClosed().subscribe(
    );
  }


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }


}
