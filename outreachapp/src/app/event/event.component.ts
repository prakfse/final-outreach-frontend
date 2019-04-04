import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  createEvent: FormGroup;
  projectDet: any;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initialize();

  }

  initialize() {
    this.createEvent = this.formBuilder.group({
      benName: ['', [Validators.required]],
      baselocation: ['', [Validators.required]],
      council: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]],
      address: ['', [Validators.required]],
      pocID: ['', [Validators.required]],
      pocDet: ['', [Validators.required]],
      project: ['', [Validators.required]],
      eventCat: ['', [Validators.required]],
      eventTitle: ['', [Validators.required]],
      eventDesc: ['', [Validators.required]],
      numberOfVol: ['', [Validators.required]],
      transMod: ['', [Validators.required]],
      startDt: ['', [Validators.required]],
      endDt: ['', [Validators.required]],
      visibleDt: ['', [Validators.required]],
      boardingPtDet: ['', [Validators.required]],
      droppingPtDet: ['', [Validators.required]],
      isFavorite: ['']
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.createEvent.controls[controlName].hasError(errorName);
  }
}
