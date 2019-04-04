import { TestBed } from '@angular/core/testing';

import { RpteventService } from './rptevent.service';

import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatAutocompleteModule, MatTableModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('RpteventService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule, FormsModule, ReactiveFormsModule, MatTableModule, MatDatepickerModule
      , MatNativeDateModule, HttpClientModule, MatAutocompleteModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, MatDialogModule],
  }));

  it('should be created', () => {
    const service: RpteventService = TestBed.get(RpteventService);
    expect(service).toBeTruthy();
  });
});
