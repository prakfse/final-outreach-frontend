import { TestBed } from '@angular/core/testing';

import { ProjectService } from './project.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('ProjectService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule, FormsModule, ReactiveFormsModule, MatTableModule, MatDatepickerModule
      , MatNativeDateModule, HttpClientModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, MatDialogModule],
  }));

  it('should create project service', () => {
    const service: ProjectService = TestBed.get(ProjectService);
    expect(service).toBeTruthy();
  });
});
