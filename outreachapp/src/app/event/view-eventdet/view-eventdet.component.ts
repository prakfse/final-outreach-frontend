import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/shared/event.service';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';


class regUser {
  empId: string;
  userName: string;
  email: string;
  regStatus: string;
  regDt: Date;
  transMod: string;
  boardingPtDet: string;
  droppingPtDet: string;
  travelHr: number;
  actualVolHr: number;
  participationStatus: string;
  isRegUser: string;
}

@Component({
  selector: 'app-view-eventdet',
  templateUrl: './view-eventdet.component.html',
  styleUrls: ['./view-eventdet.component.css']
})
export class ViewEventdetComponent implements OnInit {

  eventId: string;
  eventData: any;


  benName: string;
  baseLocation: string;
  council: string;
  address: string;
  pocID: string;
  pocDet: string;
  project: string;
  eventCat: string;
  eventTitle: string;
  eventDesc: string;
  numberOfVol: number;
  transMod: string;
  boardingPtDet: string;
  droppingPtDet: string;
  startDt: Date;
  endDt: Date;
  visibleDt: Date;

  isFavorite: string;

  regUsers: any = [];


  displayedColumns: string[] = ['userName', 'email', 'regDt',
    'regStatus', 'boardingPtDet'];


  userData: MatTableDataSource<any>;

  constructor(private eventService: EventService,
    private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      this.eventId = params.id
    });
  }

  ngOnInit() {
    this.LoadEventDataToForm();
  }

  initialize() {

  }

  LoadEventDataToForm() {
    console.log(this.eventId);
    this.eventService.getEvent(this.eventId).subscribe(
      res => {
        this.eventData = res[0];
        this.benName = this.eventData.benName;
        this.baseLocation = this.eventData.baseLocation;
        this.council = this.eventData.council;
        this.address = this.eventData.address;
        this.pocID = this.eventData.pocID;
        this.pocDet = this.eventData.pocDet;
        this.project = this.eventData.projectName;
        this.eventCat = this.eventData.eventCat;
        this.eventTitle = this.eventData.eventTitle;
        this.eventDesc = this.eventData.eventDesc;
        this.numberOfVol = this.eventData.numberOfVol;
        this.transMod = this.eventData.transMod;
        this.boardingPtDet = this.eventData.boardingPtDet;
        this.droppingPtDet = this.eventData.droppingPtDet;
        this.startDt = this.eventData.startDt;
        this.endDt = this.eventData.endDt;
        this.visibleDt = this.eventData.visibleDt;
        this.isFavorite = (this.eventData.isFavorite == true ? "Yes" : "No");

        var users = this.eventData.rUsers;
        users.forEach(u => {
          var clsregUser = new regUser();
          clsregUser.empId = u.empId;
          clsregUser.userName = u.displayName;
          clsregUser.email = u.email;
          var rDet = this.eventData.vReg.find(r => r.regTo == u._id);
          if (rDet) {
            clsregUser.regDt = rDet.regDt;
            clsregUser.regStatus = rDet.regStatus;
            clsregUser.transMod = rDet.transMod;
            clsregUser.boardingPtDet = rDet.boardingPtDet;
            clsregUser.droppingPtDet = rDet.droppingPtDet;
            clsregUser.participationStatus = rDet.participationStatus;
            clsregUser.travelHr = rDet.travelHr;
            clsregUser.actualVolHr = rDet.actualVolHr
            clsregUser.isRegUser = (rDet.isRegUser ? "Registered User" : "Unregistered User");
          }
          this.regUsers.push(clsregUser);
        });
        this.userData = new MatTableDataSource();
        this.userData.data = this.regUsers;
        // this.userData.paginator = this.paginator;
        // this.userData.sort = this.sort;
        console.log(JSON.stringify(this.regUsers));
      },
      err => { }
    );
  }
}
