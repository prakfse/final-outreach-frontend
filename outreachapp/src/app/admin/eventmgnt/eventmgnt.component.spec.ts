import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule, MatPaginator, MatSort, MatDialogModule } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { EventmgntComponent } from './eventmgnt.component';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, ViewChild } from '@angular/core';
import { EventService } from 'src/app/shared/event.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';



describe('EventmgntComponent', () => {
  let component: EventmgntComponent;
  let fixture: ComponentFixture<EventmgntComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatTableModule,
        HttpClientModule, RouterTestingModule, MatDialogModule],
      declarations: [EventmgntComponent],
      providers: [EventService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventmgntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create event management', () => {
    expect(component).toBeTruthy();
  });
});
