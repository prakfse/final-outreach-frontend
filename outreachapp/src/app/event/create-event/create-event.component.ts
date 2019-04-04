import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from 'src/app/shared/event.service';
import { Project } from 'src/app/models/project';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { MessageComponent } from 'src/app/message/message.component';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

  transMode = ["None", "Fixed", "Floating"]
  createEvent: FormGroup;
  responseMessage: string;
  userDet: any;

  baseLocations: any = [];
  councils: any = [];

  projectDet: any;
  eventCategory: any;
  selectedEventCat: any;
  selectedProject: string;

  message: string;
  redirectTo: string;
  currentPage: string;
  messageType: string;

  fromStDate: Date;
  fromEndDate: Date;
  toStartDate: Date;
  visDate: Date;

  isLoading = false;

  // council1 : FormGroup;


  constructor(private formBuilder: FormBuilder,
    private eventService: EventService,
    private router: Router,
    public dialog: MatDialog) { }

  councilfilteredOptions: Observable<string[]>;
  baseLocfilteredOptions: Observable<string[]>;

  ngOnInit() {
    if (sessionStorage.getItem('uData')) {
      this.userDet = JSON.parse(sessionStorage.getItem('uData'));
    }
    this.fromStDate = new Date();
    this.toStartDate = new Date();
    this.visDate = new Date();
    this.getProjects();
    this.getCouncils();
    this.getBaseLocations();

    this.initialize();

  }
  initialize() {
    this.createEvent = this.formBuilder.group({
      benName: ['', [Validators.required]],
      baseLocation: ['', [Validators.required]],
      council: ['', [Validators.required]],
      address: ['', [Validators.required]],
      pocID: ['', [Validators.required]],
      pocDet: ['', [Validators.required]],
      project: ['', [Validators.required]],
      eventCat: ['', [Validators.required]],
      eventTitle: ['', [Validators.required]],
      eventDesc: ['', [Validators.required]],
      numberOfVol: ['', [Validators.required]],
      transMod: ['', [Validators.required]],
      boardingPtDet: ['', [Validators.required]],
      droppingPtDet: ['', [Validators.required]],
      startDt: ['', [Validators.required]],
      endDt: ['', [Validators.required]],
      visibleDt: ['', [Validators.required]],
      isFavorite: false
    });

    this.councilfilteredOptions = this.createEvent.get('council1').valueChanges.pipe(
      startWith(""),
      map(val => this.filterCouncil(val))
    );


    this.baseLocfilteredOptions = this.createEvent.get('baseLocation1').valueChanges.pipe(
      startWith(""),
      map(val => this.filterBaseLocation(val))
    );


  }

  private filterCouncil(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.councils.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }


  private filterBaseLocation(value: string): string[] {

    const filterValue = value.toLowerCase();

    return this.baseLocations.filter(option => option.toLowerCase().indexOf(filterValue) === 0);

  }



  addEvent() {
    if (this.createEvent.valid) {
      let data = this.createEvent.value;

      data.createdBy = this.userDet.empId;
      data.updatedBy = this.userDet.empId;
      console.log(JSON.stringify(data));

      this.eventService.addEvent(data).subscribe(
        () => {
          this.message = "Event has been successfully created .";
          this.currentPage = "Event Creation Message"
          this.redirectTo = "/eventlist";
          this.messageType = "S";
          this.openDialog();
          //this.router.navigate(['userlist']);
        },
        () => {
          this.message = "Something went wrong. Please condact admin.";
          this.currentPage = "Event Creation Message"
          this.redirectTo = "/createevent";
          this.messageType = "E";
          this.openDialog();
        }
      )
    };
  }
  getProjects() {
    this.eventService.getProjects().subscribe((projectData: Project[]) => {
      this.projectDet = projectData;
      console.log(JSON.stringify(this.projectDet));
    });
  }


  getCouncils() {
    this.eventService.getCouncils().subscribe((data: any[]) => {
      this.councils = data;
      console.log(JSON.stringify(this.councils));
    });

  }

  getBaseLocations() {
    this.eventService.getBaseLocations().subscribe((data) => {
      this.baseLocations = data;
      console.log(JSON.stringify(this.baseLocations));
    });

  }

  onSelect(projectID) {
    console.log('projectID: ' + projectID);
    this.eventCategory = this.projectDet
      .find(item => item._id == projectID).eventCat;
  }

  resetForm() {
    this.initialize();
  }

  bulkEventCreation() {
    this.router.navigate(['/createbulkevent']);
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
    dialogRef.afterClosed().subscribe();
  }

  setEndDate(fName, pValue) {
    console.log(pValue);
    if (fName == 'sDate') {
      this.toStartDate = pValue;
      this.visDate = pValue;
    }
    else {
      this.fromStDate = null;
      this.fromEndDate = pValue;
    }
  }

  cancel() {
    if (this.userDet.role == 'Normal') {
      this.router.navigate(['/volreg']);
    }
    else {
      this.router.navigate(['/eventlist']);
    }
  }
}

