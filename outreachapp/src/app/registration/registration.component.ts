import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '../shared/event.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { MessageComponent } from '../message/message.component';

class VolRegistration {
  regTo: any;
  eventId: any;
  regStatus: string;
  sourceType: string;
  transMod: string;
  boardingPtDet: string;
  droppingPtDet: string;

  travelHr: number;
  actualVolHr: number;
  participationStatus: string;
  isRegUser: boolean;
}


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
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
  tMod: string;  
  boardingPtDet: string;
  droppingPtDet: string;
  startDt: Date;
  endDt: Date;
  visibleDt: Date;
  isFavorite: string;

  isDisabled: boolean;

  eventId: string;
  eventData: any;

  transMode = ["None", "Fixed", "Floating"]

  message: string;
  redirectTo: string;
  currentPage: string;
  messageType: string;

  userDet: any;

  logUser: any;

  registerEvent: FormGroup;

  constructor(private eventService: EventService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    public dialog: MatDialog) {
    this.activatedRoute.params.subscribe(params => {
      this.eventId = params.eid
    });
  }

  ngOnInit() {
    this.isDisabled = true;
    console.log('Hi registration')
    this.initialize();
    if (sessionStorage.getItem('uData')) {
      this.userDet = JSON.parse(sessionStorage.getItem('uData'));
      this.logUser = this.userDet.empId;
    }
    else {
      console.log('Session is cleared')
      this.router.navigate(['/signin']);
    }

    this.LoadEventDataToForm();
  }

  initialize() {
    this.registerEvent = this.formBuilder.group({
      transMod: ['', [Validators.required]],
      boardingPtDet: ['', [Validators.required]],
      droppingPtDet: ['', [Validators.required]]
    })
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
        this.tMod = this.eventData.transMod;
        this.boardingPtDet = this.eventData.boardingPtDet;
        this.droppingPtDet = this.eventData.droppingPtDet;
        this.startDt = this.eventData.startDt;
        this.endDt = this.eventData.endDt;
        this.visibleDt = this.eventData.visibleDt;
        this.isFavorite = (this.eventData.isFavorite == true ? "Yes" : "No");

      },
      err => { }
    );
  }

  onSelect(pValue) {
    console.log(pValue)
    if (pValue != 'Floating') {
      this.registerEvent.get('boardingPtDet').setValue(this.boardingPtDet);
      this.registerEvent.get('droppingPtDet').setValue(this.droppingPtDet);
    }
    else {
      this.registerEvent.get('boardingPtDet').setValue('');
      this.registerEvent.get('droppingPtDet').setValue('');

    }
  }
  registerUser() {
    // return new Promise((resolve, reject) => {
    let data = this.registerEvent.value
    var volReg = new VolRegistration();
    volReg.eventId = this.eventId;
    volReg.regTo = this.logUser;
    volReg.regStatus = "Confirmed";
    volReg.sourceType = "Single";
    volReg.travelHr = 0;
    volReg.actualVolHr = 0;
    volReg.participationStatus = "No Show";
    volReg.isRegUser = true;
    volReg.transMod = data.transMod;
    volReg.boardingPtDet = data.boardingPtDet;
    volReg.droppingPtDet = data.droppingPtDet;
    console.log(JSON.stringify(volReg));
    // return;
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

  resetForm() {
    this.initialize();
  }

  cancel() {
    this.router.navigate(['/volreg'])
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

}
