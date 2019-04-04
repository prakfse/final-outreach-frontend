import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RptEventRegStatusComponent } from './rpt-event-reg-status.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { MatTableModule, MatDialogModule } from '@angular/material';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';

describe('RptEventRegStatusComponent', () => {
  let component: RptEventRegStatusComponent;
  let fixture: ComponentFixture<RptEventRegStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatTableModule,
        HttpClientModule, RouterTestingModule, MatDialogModule, MatNativeDateModule, MatDatepickerModule, FormsModule, ReactiveFormsModule],
      declarations: [RptEventRegStatusComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RptEventRegStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
