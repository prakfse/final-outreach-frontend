import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatTableDataSource, MatTableModule, MatPaginatorModule, MatSort, MatFormFieldModule } from '@angular/material';
import { CreateBulkEventComponent } from './create-bulk-event.component';

describe('CreateBulkEventComponent', () => {
  let component: CreateBulkEventComponent;
  let fixture: ComponentFixture<CreateBulkEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatTableModule, HttpClientModule, MatFormFieldModule, MatPaginatorModule],
      declarations: [CreateBulkEventComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBulkEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create bulk event', () => {
    expect(component).toBeTruthy();
  });
});
