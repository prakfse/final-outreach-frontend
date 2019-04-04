import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogConfig } from '@angular/material';
import { EventService } from '../shared/event.service';
import { Router } from '@angular/router';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  message: string;
  redirectTo: string;
  currentPage: string;
  messageType: string;

  constructor(private eventService: EventService,
    private router: Router,
    public dialog: MatDialog) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  eventData: MatTableDataSource<Event>;


  displayedColumns: string[] = ['benName', 'projectName', 'startDt', 'eventStatus', 'action'];


  ngOnInit() {
    this.getEventList();
  }

  getEventList() {
    return this.eventService.getEvents()
      .subscribe((eventDet: Event[]) => {
        this.eventData = new MatTableDataSource();
        this.eventData.data = eventDet;
        this.eventData.paginator = this.paginator;
        this.eventData.sort = this.sort;
      });
  }

  applyFilter(filterValue: string) {
    this.eventData.filter = filterValue.trim().toLowerCase();
  }

  onChecked(val) {
    if (val)
      this.applyFilter('true');
    else
      this.getEventList();
  }

  editEvent(eventId: string) {
    this.router.navigate(['editevent/' + eventId]);
  }

  deleteEvent(eventId: string) {
    this.eventService.deleteEventDet(eventId).subscribe(
      res => {
        this.message = "Event has been deleted successfully !!!";
        this.currentPage = "Event Deleted Status"
        this.redirectTo = "/eventlist";
        this.messageType = "S";
        this.getEventList();
        this.openDialog();
      },
      err => { console.log('Error in User delete: ' + eventId); }
    );
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

  viewEvent(eventId: string) {
    this.router.navigate(['vieweventdet/' + eventId]);
  }
}
