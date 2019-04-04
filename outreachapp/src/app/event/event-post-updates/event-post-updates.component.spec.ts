import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPostUpdatesComponent } from './event-post-updates.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatTableDataSource, MatTableModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


describe('EventPostUpdatesComponent', () => {
  let component: EventPostUpdatesComponent;
  let fixture: ComponentFixture<EventPostUpdatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, ReactiveFormsModule, MatTableModule, MatDatepickerModule
        , MatNativeDateModule, HttpClientModule],
      declarations: [EventPostUpdatesComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventPostUpdatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should do post updates', () => {
    expect(component).toBeTruthy();
  });
});
