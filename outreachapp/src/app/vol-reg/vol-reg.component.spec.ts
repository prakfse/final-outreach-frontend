import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolRegComponent } from './vol-reg.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('VolRegComponent', () => {
  let component: VolRegComponent;
  let fixture: ComponentFixture<VolRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, ReactiveFormsModule, MatTableModule, MatDatepickerModule
        , MatNativeDateModule, HttpClientModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, MatDialogModule],
      declarations: [VolRegComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should register voluteer', () => {
    expect(component).toBeTruthy();
  });
});
