import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEventdetComponent } from './view-eventdet.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatTableDataSource, MatTableModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('ViewEventdetComponent', () => {
  let component: ViewEventdetComponent;
  let fixture: ComponentFixture<ViewEventdetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, ReactiveFormsModule, MatTableModule, MatDatepickerModule
        , MatNativeDateModule, HttpClientModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ViewEventdetComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEventdetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should view eventdetail', () => {
    expect(component).toBeTruthy();
  });
});
