import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventService } from 'src/app/shared/event.service';
import { Project } from 'src/app/models/project';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { MessageComponent } from 'src/app/message/message.component';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {

  eventId: string;
  eventData: any;
  editEventForm: FormGroup;
  projectDet: any;
  eventCategory: any;
  selectedProject: string;
  selectedECat: string;


  message: string;
  redirectTo: string;
  currentPage: string;
  messageType: string;

  transMode: string[] = ["None", "Fixed", "Floating"];

  constructor(private formBuilder: FormBuilder,
    private eventService: EventService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog) {
    this.activatedRoute.params.subscribe(params => {
      this.eventId = params.id
    });
  }

  ngOnInit() {
    this.initialize();
    this.getProjects();
    this.LoadEventDataToForm();
    this.setProjectAndEventCatValue();
  }

  setProjectAndEventCatValue() {
    // this.selectedProject =  this.eventData.projectName;
    // this.selectedECat = this.eventData.eventCat;
    console.log(JSON.stringify(this.eventData))
    // var mProject = this.projectDet.find(e => e.projectName == this.selectedProject);
    // if(mProject){
    //   this.selectedProject = mProject._id;
    //   this.eventCategory = this.projectDet
    //   .find(item => item._id == mProject._id).eventCat;
    //   console.log(this.selectedProject + ' ==== '+ this.eventCategory)
    // //  this.editEventForm.get('eventCat').setValue(this.selectedECat);
    // } 
  }
  initialize() {
    this.editEventForm = this.formBuilder.group({
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
    })
  }
  LoadEventDataToForm() {
    this.eventService.getEvent(this.eventId).subscribe(
      res => {
        this.eventData = res[0];
        var mProject = this.projectDet.find(e => e.projectName == res[0].projectName);
        if (mProject) {
          this.selectedProject = mProject._id;

        }

        // this.selectedECat = res[0].eventCat;
        // console.log(JSON.stringify(res))   ;          
        this.editEventForm.patchValue({
          benName: this.eventData.benName,
          baseLocation: this.eventData.baseLocation,
          council: this.eventData.council,
          address: this.eventData.address,
          pocID: this.eventData.pocID,
          pocDet: this.eventData.pocDet,
          project: this.eventData.projectName,
          selectedECat: this.eventData.eventCat,
          eventTitle: this.eventData.eventTitle,
          eventDesc: this.eventData.eventDesc,
          numberOfVol: this.eventData.numberOfVol,
          transMod: this.eventData.transMod,
          boardingPtDet: this.eventData.boardingPtDet,
          droppingPtDet: this.eventData.droppingPtDet,
          startDt: this.eventData.startDt,
          endDt: this.eventData.endDt,
          visibleDt: this.eventData.visibleDt,
          isFavorite: this.eventData.isFavorite
        });

      },
      () => { }
    );
  }

  onSelect(projectID) {
    // console.log('projectID: '+projectID);
    this.eventCategory = this.projectDet
      .find(item => item._id == projectID).eventCat;
  }

  resetForm() {
    this.initialize();
  }

  getProjects() {
    return new Promise(() => {
      this.eventService.getProjects().subscribe((projectData: Project[]) => {
        this.projectDet = projectData;
      });
    })
  }

  updateEvent() {
    let formData = this.editEventForm.value;
    console.log(JSON.stringify(formData));    
    this.eventService.updateEventDet(this.eventId, formData).subscribe(
      () => {
        this.message = "Event details are updated successfully !!!";
        this.currentPage = "Edit Event Details"
        this.redirectTo = "/eventlist";
        this.messageType = "S";
        this.openDialog();
      },
      err => {
        console.log('Error in updating the event: ' + JSON.stringify(err, undefined, 2));
      }
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



}
