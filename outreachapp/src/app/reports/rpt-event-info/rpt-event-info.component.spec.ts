import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RptEventInfoComponent } from './rpt-event-info.component';

import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatAutocompleteModule, MatTableModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('RptEventInfoComponent', () => {
  let component: RptEventInfoComponent;
  let fixture: ComponentFixture<RptEventInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RptEventInfoComponent],
      imports: [RouterTestingModule, FormsModule, MatAutocompleteModule,
        ReactiveFormsModule, MatTableModule, MatDatepickerModule
        , MatNativeDateModule, HttpClientModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, MatDialogModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RptEventInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
