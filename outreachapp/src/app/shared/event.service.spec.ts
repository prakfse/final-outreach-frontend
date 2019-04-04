import { TestBed } from '@angular/core/testing';

import { EventService } from './event.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('EventService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule, FormsModule, ReactiveFormsModule, MatTableModule, MatDatepickerModule
      , MatNativeDateModule, HttpClientModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, MatDialogModule]
  }));

  it('should create event service', () => {
    const service: EventService = TestBed.get(EventService);
    expect(service).toBeTruthy();
  });
});
