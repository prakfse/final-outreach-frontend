import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import * as XLSX from 'xlsx';
import { RpteventService } from 'src/app/shared/rptevent.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

type AOA = any[][];

class EventStatus {
  A: string;
  B: string;
  C: string;
  D: string;
  E: string;
  F: string;
  G: string;
  H: string;
  I: string;
  J: string;
  K: string;
}

@Component({
  selector: 'app-rpt-event-reg-status',
  templateUrl: './rpt-event-reg-status.component.html',
  styleUrls: ['./rpt-event-reg-status.component.css']
})
export class RptEventRegStatusComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  eventRegStatus: string[] = ['Waiting List', 'UnRegistered', 'Confirmed'];
  pStatus: string[] = ['No Show', 'Show'];

  eventData: MatTableDataSource<any>;

  data: any;

  fileName: string = 'EventRegStatus.xlsx';


  rptEventStatus: FormGroup;

  sheetHeader: string[] = ['Event ID', 'Benificary Details', 'Council', 'Project',
    'Event Category', 'Event Date', 'Emp ID', 'Emp Name',
    'Reg. Status', 'Participation Status'];


  displayedColumns: string[] = ['benName', 'eventTitle', 'empName'];

  constructor(private rptEventService: RpteventService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initialize();

    this.getRptEventDetails();
  }

  initialize() {
    this.rptEventStatus = this.formBuilder.group({
      eventRegStatus: [''],
      partStatus: [''],
      startDt: [''],
      endDt: ['']
    });
  }



  private getRptEventDetails() {
    return this.rptEventService.getRptEventInfo()
      .subscribe((eventDet: any[]) => {
        this.eventData = new MatTableDataSource();
        this.eventData.data = eventDet;
        this.eventData.paginator = this.paginator;
        this.eventData.sort = this.sort;
        this.data = eventDet;
      });
  }

  applyFilter() {
    var eventRegStatus = this.rptEventStatus.get('eventRegStatus').value;
    if (eventRegStatus == 'Waiting List')
      eventRegStatus = 'WL';
    var partStatus = this.rptEventStatus.get('partStatus').value;
    var startDt = new Date(this.rptEventStatus.get('startDt').value).getTime();
    var endDt = new Date(this.rptEventStatus.get('endDt').value).getTime();
    var filteredData = this.data;

    console.log(eventRegStatus + ' -- ' + partStatus + ' -- ' + startDt + ' -- ' + endDt);
    console.log(JSON.stringify(filteredData));
    if (eventRegStatus.trim().length > 0 && partStatus.trim().length > 0 &&
      startDt > 0 && endDt > 0) {
      filteredData = this.data.filter(eDat =>
        new Date(eDat.startDt).getTime() >= startDt &&
        new Date(eDat.endDt).getTime() <= endDt &&
        eDat.regStatus.trim().toLowerCase().indexOf(eventRegStatus.trim().toLowerCase()) > -1 &&
        eDat.participationStatus.indexOf(partStatus) > -1
      );
    }
    else if (eventRegStatus.trim().length == 0 && partStatus.trim().length > 0 &&
      startDt > 0 && endDt > 0) {
      filteredData = this.data.filter(eDat =>
        new Date(eDat.startDt).getTime() >= startDt &&
        new Date(eDat.endDt).getTime() <= endDt &&
        eDat.participationStatus.indexOf(partStatus) > -1
      );
    }
    else if (eventRegStatus.trim().length > 0 && partStatus.trim().length == 0 &&
      startDt > 0 && endDt > 0) {
      filteredData = this.data.filter(eDat =>
        new Date(eDat.startDt).getTime() >= startDt &&
        new Date(eDat.endDt).getTime() <= endDt &&
        eDat.regStatus.indexOf(eventRegStatus) > -1
      );
    }
    else if (startDt > 0 && endDt > 0) {
      filteredData = this.data.filter(eDat =>
        new Date(eDat.startDt).getTime() >= startDt &&
        new Date(eDat.endDt).getTime() <= endDt
      );
    }
    else if (partStatus.trim().length > 0 &&
      eventRegStatus.trim().length > 0) {
      filteredData = this.data.filter(eDat =>
        eDat.participationStatus.indexOf(partStatus) > -1 &&
        eDat.regStatus.indexOf(eventRegStatus) > -1

      );
    }
    else if (eventRegStatus.trim().length > 0) {
      filteredData = this.data.filter(eDat =>
        eDat.regStatus.indexOf(eventRegStatus) > -1
      );
    }
    else if (partStatus.trim().length > 0) {

      filteredData = this.data.filter(eDat =>
        eDat.participationStatus.indexOf(partStatus) > -1
      );
    }
    else {

    }


    this.eventData.data = filteredData;
  }


  export(): void {
    /* generate worksheet */

    // Covert to JSON format data

    var expData: any = [];

    var clsEStatus = new EventStatus();
    clsEStatus.A = this.sheetHeader[0];
    clsEStatus.B = this.sheetHeader[1]
    clsEStatus.C = this.sheetHeader[2]
    clsEStatus.D = this.sheetHeader[3]
    clsEStatus.E = this.sheetHeader[4]
    clsEStatus.F = this.sheetHeader[5]
    clsEStatus.G = this.sheetHeader[6]
    clsEStatus.H = this.sheetHeader[7]
    clsEStatus.I = this.sheetHeader[8]
    clsEStatus.J = this.sheetHeader[9]
    clsEStatus.K = this.sheetHeader[10]
    expData.push(clsEStatus);

    ['Event ID', 'Benificary Details', 'Base Location', 'Project',
      'Event Category', 'Event Start Date', 'Event End Date', 'Emp ID', 'Emp Name',
      'Reg. Status', 'Participation Status'];

    this.eventData.data.forEach(e => {
      var clsEStatus = new EventStatus();
      clsEStatus.A = e._id;
      clsEStatus.B = e.benName;
      clsEStatus.C = e.baseLocation;
      clsEStatus.D = e.projectName;
      clsEStatus.E = e.eventCat;
      clsEStatus.F = e.startDt;
      clsEStatus.G = e.endDt;
      clsEStatus.H = e.empId;
      clsEStatus.I = e.empName;
      clsEStatus.J = e.regStatus;
      clsEStatus.K = e.participationStatus;

      expData.push(clsEStatus);
    })
    //console.log(JSON.stringify(expData));

    //var jsonData = JSON.parse( this.data);
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(expData);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }



  clearFilter() {
    this.initialize();
    this.eventData.data = this.data;
  }

}
