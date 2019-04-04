import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolRegEventlistComponent } from './vol-reg-eventlist.component';

import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('VolRegEventlistComponent', () => {
  let component: VolRegEventlistComponent;
  let fixture: ComponentFixture<VolRegEventlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, ReactiveFormsModule, MatTableModule, MatDatepickerModule
        , MatNativeDateModule, HttpClientModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, MatDialogModule],
      declarations: [VolRegEventlistComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolRegEventlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should register volunteer', () => {
    expect(component).toBeTruthy();
  });
});
