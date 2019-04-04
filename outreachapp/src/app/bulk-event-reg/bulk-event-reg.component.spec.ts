import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkEventRegComponent } from './bulk-event-reg.component';

import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatTableDataSource, MatTableModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('BulkEventRegComponent', () => {
  let component: BulkEventRegComponent;
  let fixture: ComponentFixture<BulkEventRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BulkEventRegComponent],
      imports: [RouterTestingModule, FormsModule, ReactiveFormsModule, MatTableModule, MatDatepickerModule
        , MatNativeDateModule, HttpClientModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, MatDialogModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkEventRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
