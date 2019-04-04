import { Component, OnInit, ViewChild } from '@angular/core';
import { EventService } from '../shared/event.service';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { MessageComponent } from '../message/message.component';


class EventDet {
  _id: any;
  benName: string;
  baseLocation: string;
  address: string;
  projectName: string;
  eventCat: string;
  eventTitle: string;
  startDt: Date;
  endDt: Date;
  regStatus: string;
}


class VolRegistration {
  regTo: any;
  eventId: any;
  regStatus: string;
  sourceType: string;

  travelHr: number;
  actualVolHr: number;
  participationStatus: string;
  isRegUser: boolean;
}

@Component({
  selector: 'app-vol-reg',
  templateUrl: './vol-reg.component.html',
  styleUrls: ['./vol-reg.component.css']
})

export class VolRegComponent implements OnInit {

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

  userDet: any;

  eventDetail: any = [];

  logUser: any;

  isEventRegister: boolean;

  displayedColumns: string[] = ['benName', 'project', 'duration', 'action'];


  ngOnInit() {
    if (sessionStorage.getItem('uData')) {
      this.userDet = JSON.parse(sessionStorage.getItem('uData'));
      this.logUser = this.userDet.empId;
      this.isEventRegister = true;
      this.getEventList();
    }
    else {
      console.log('Session is cleared')
      this.router.navigate(['/signin']);
    }
  }
  getEventList() {
    return this.eventService.getEventsForReg()
      .subscribe((eventDet: any[]) => {

        eventDet.forEach(e => {
          var eDet = new EventDet();
          eDet._id = e._id;
          eDet.benName = e.benName;
          eDet.baseLocation = e.baseLocation;
          eDet.address = e.address;
          eDet.projectName = e.projectName;
          eDet.eventCat = e.eventCat;
          eDet.eventTitle = e.eventTitle;
          eDet.startDt = e.startDt;
          eDet.endDt = e.endDt;
          eDet.regStatus = "Not Registered";
          var curUser = e.rUsers.find(u => u.empId == this.logUser)
          if (curUser) {
            var rStatus = e.vReg.find(r => r.regTo = curUser._id && r.eventId == e._id);
            console.log(JSON.stringify(rStatus));
            eDet.regStatus = rStatus.regStatus;
          }
          this.eventDetail.push(eDet);
        })

        this.eventData = new MatTableDataSource();
        this.eventData.data = this.eventDetail;
        this.eventData.paginator = this.paginator;
        this.eventData.sort = this.sort;
        // console.log( JSON.stringify( this.eventDetail));
      });
  }

  applyFilter(filterValue: string) {
    this.eventData.filter = filterValue.trim().toLowerCase();
  }

  register(eventID) {
    console.log(eventID);
    this.router.navigate(['/registration/' + eventID]);;
  }

  registerUser(eventID) {
    return new Promise((resolve, reject) => {
      var volReg = new VolRegistration();
      volReg.eventId = eventID;
      volReg.regTo = this.logUser;
      volReg.regStatus = "Confirmed";
      volReg.sourceType = "Single";
      volReg.travelHr = 0;
      volReg.actualVolHr = 0;
      volReg.participationStatus = "No Show";
      volReg.isRegUser = true;
      this.eventService.registerEvent(volReg).subscribe(
        res => {
          this.message = "Event registration has been completed successfully !!!";
          this.currentPage = "Event Registeration Status"
          this.redirectTo = "/uservolreglist";
          this.messageType = "S";
          //this.getEventList();
          this.openDialog();
        },
        err => {
          this.message = err.error.join('</br>');
          this.currentPage = "Event Registeration Status"
          this.redirectTo = "/uservolreglist";
          this.messageType = "E";
          this.openDialog();
        })
    }
    )
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

  UnregisterUser(eventID) {
    console.log('UnRegister ID: ' + eventID);
    var vReg = {
      eventId: eventID,
      updatedBy: this.logUser,
      regTo: this.logUser
    };
    //  console.log(JSON.stringify(vReg));

    this.eventService.unRegisterUser(vReg).subscribe(
      res => {
        this.message = "Event Unregistration has been completed successfully !!!";
        this.currentPage = "Event Registeration Status"
        this.redirectTo = "/uservolreglist";
        this.messageType = "S";
        this.openDialog();
      },
      err => {
        this.message = err.error.join('</br>');
        this.currentPage = "Event Unregisteration Status"
        this.redirectTo = "/uservolreglist";
        this.messageType = "E";
        this.openDialog();
      }
    )
  };


}
