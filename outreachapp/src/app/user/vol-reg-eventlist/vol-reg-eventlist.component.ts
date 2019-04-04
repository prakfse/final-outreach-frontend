import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { EventService } from 'src/app/shared/event.service';

@Component({
  selector: 'app-vol-reg-eventlist',
  templateUrl: './vol-reg-eventlist.component.html',
  styleUrls: ['./vol-reg-eventlist.component.css']
})
export class VolRegEventlistComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private eventService: EventService) { }

  eventData: MatTableDataSource<Event>;

  logUser: any;

  displayedColumns: string[] = ['benName', 'project', 'duration', 'details'];

  ngOnInit() {
    this.getEventList();
  }

  getEventList() {
    this.logUser = localStorage.getItem('userID');
    return this.eventService.getEventListByUser(this.logUser)
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

}
