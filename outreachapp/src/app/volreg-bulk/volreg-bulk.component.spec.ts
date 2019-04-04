import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolregBulkComponent } from './volreg-bulk.component';

describe('VolregBulkComponent', () => {
  let component: VolregBulkComponent;
  let fixture: ComponentFixture<VolregBulkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VolregBulkComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolregBulkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
