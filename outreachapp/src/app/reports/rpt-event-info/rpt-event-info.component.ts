import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import * as XLSX from 'xlsx';
import { RpteventService } from 'src/app/shared/rptevent.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { EventService } from 'src/app/shared/event.service';
import { startWith, map } from 'rxjs/operators';



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
  L: string;
  M: string;
  N: string;
  O: string;
  P: string;
  Q: string;
  R: string;
  S: string;
  T: string;
}

export interface EventFilter {
  column: string;
  value: string;
}

@Component({
  selector: 'app-rpt-event-info',
  templateUrl: './rpt-event-info.component.html',
  styleUrls: ['./rpt-event-info.component.css']
})
export class RptEventInfoComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  eventData: MatTableDataSource<any>;

  fromStDate: Date;
  fromEndDate: Date;
  toStartDate: Date;

  data: any;

  fileName = "EventInfo.xlsx";

  rptEventInfo: FormGroup;
  constructor(private rptEventService: RpteventService,
    private formBuilder: FormBuilder,
    private eventService: EventService) { }

  displayedColumns: string[] = ['benName', 'eventTitle', 'empName'];

  eventFilterColumns: EventFilter[] = [
    // {value: 'benName', column: 'Benificary Name'},
    { value: 'baseLocation', column: 'Base Location' },
    { value: 'projectName', column: 'Project Name' },
    { value: 'council', column: 'Council' },
    { value: 'buName', column: 'Business Unit' },
    { value: 'eventStatus', column: 'Event Status' }
    // {value: 'endDt', column: 'End Date'}
  ];

  filteredOptions: Observable<string[]>;

  baseLocations: any = [];
  councils: any = [];
  projectDet: any = [];
  buNameDet: any = [];

  sheetHeader: string[] = ['Event ID', 'Benificary Details', 'Base Location',
    'Address', 'Council', 'Project',
    'Event Category', 'Event Title', '# of Vol',
    'Event Status', 'Event Start Date', 'Event End Date',
    'Emp Id', 'Emp Name', 'BU Name',
    'Travel Hours', 'Actual Hours', 'Reg. Date',
    'Reg. Status', 'Part. Status'];



  eventStatus: string[] = ['Approved', 'Rejected', 'Pending'];

  filterArr: any = [];
  filterObj: {}

  ngOnInit() {
    this.initialize()
    this.fromStDate = new Date();
    this.toStartDate = new Date();
    this.getProjects();
    this.getBaseLocations();
    this.getCouncils();
    this.getBUNames();
    this.getRptEventDetails();
    // this.filteredOptions = this.rptEventInfo.get('filterValue').valueChanges.pipe(
    //   startWith(""), 
    //   map(val => this.filterBaseLocation(val))
    // );

  }
  initialize() {
    this.rptEventInfo = this.formBuilder.group({
      filterName: [''],
      filterValue: [''],
      startDt: [''],
      endDt: ['']
    });
  }

  setFilterValues() {
    var selectedFilter = this.rptEventInfo.get('filterName').value;
    this.rptEventInfo.get('filterValue').setValue("");
    if (selectedFilter == 'baseLocation') {
      this.filteredOptions = this.rptEventInfo.get('filterValue').valueChanges.pipe(
        startWith(""),
        map(val => this.filterBaseLocation(val))
      );
    } else if (selectedFilter == 'projectName') {
      this.filteredOptions = this.rptEventInfo.get('filterValue').valueChanges.pipe(
        startWith(""),
        map(val => this.filterProject(val))
      );
    }
    else if (selectedFilter == 'buName') {
      this.filteredOptions = this.rptEventInfo.get('filterValue').valueChanges.pipe(
        startWith(""),
        map(val => this.filterBUName(val))
      );
    }
    else if (selectedFilter == 'council') {
      this.filteredOptions = this.rptEventInfo.get('filterValue').valueChanges.pipe(
        startWith(""),
        map(val => this.filterCouncil(val))
      );
    }
    else {
      this.filteredOptions = this.rptEventInfo.get('filterValue').valueChanges.pipe(
        startWith(""),
        map(val => this.filterEventStatus(val))
      );
    }


    // console.log('Hi Set Filter Values: ' + selectedFilter);
  }

  private filterBUName(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.buNameDet.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  getBUNames() {
    this.eventService.getBUNames().subscribe((projectData) => {
      this.buNameDet = projectData;
    })
  }

  private filterProject(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.projectDet.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  getProjects() {
    this.eventService.getProjectNames().subscribe((projectData) => {
      this.projectDet = projectData;
    })
  }

  private filterEventStatus(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.eventStatus.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  private filterCouncil(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.councils.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  getCouncils() {
    this.eventService.getCouncils().subscribe((data: any[]) => {
      this.councils = data;
      console.log(JSON.stringify(this.councils));
    });

  }
  private filterBaseLocation(value: string): string[] {
    // return this.baseLocations.filter(option => {
    //   return option.toLowerCase().match(val.toLowerCase());
    const filterValue = value.toLowerCase();
    return this.baseLocations.filter(option => option.toLowerCase().indexOf(filterValue) === 0);

  }
  getBaseLocations() {
    this.eventService.getBaseLocations().subscribe((data) => {
      this.baseLocations = data;
      //console.log(JSON.stringify(this.baseLocations));
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
        console.log('Event Information Report');
        console.log(JSON.stringify(this.data))
      });
  }

  setupFilter() {
    //   this.eventData.filterPredicate = (data, filter) => {
    //     console.log('filterObj: '  + this.filterObj['key'])
    //     if(data[this.filterObj['key']] && this.filterObj['key']) {
    //         return data[this.filterObj['key']].toLowerCase().includes(this.filterObj['value']);
    //     }
    //     return false;
    // }
    // this.eventData.filterPredicate = (d: any, filter: string) => {
    //   const textToSearch = d[column] && d[column].toLowerCase() || '';
    //   return textToSearch.indexOf(filter) !== -1;
    //  };
    //  return this.eventData.filterPredicate = (data, filter) => JSON.stringify(data).includes(filter);

  }

  // AddFilters(value: string, key: string){
  //   var filter = {
  //       value: value.trim().toLowerCase(),
  //       key: key
  //   }  
  //   var intIdx = this.filterArr.findIndex(k => k.key == key);
  //   console.log('Index: ' + intIdx)
  //   if( intIdx > -1){
  //     this.filterArr.splice(intIdx, 1);
  //   }
  //   this.filterArr.push(filter);
  //   console.log(JSON.stringify(this.filterArr));
  //   return this.eventData.filter =  this.filterArr;
  // }


  // AddFilter(){
  //   var key = this.rptEventInfo.get('filterName').value;
  //   var value = this.rptEventInfo.get('filterValue').value;

  //   this.filterObj = {
  //       value: value.trim().toLowerCase(),
  //       key: key
  //   } 
  //   // console.log( JSON.stringify( filterObj));



  //   if (this.eventData.paginator) {
  //       this.eventData.paginator.firstPage();
  //   }

  //   // return this.eventData.filterPredicate =  this.filterArr;
  // }

  //  {value: 'baseLocation', column: 'Base Location'},
  //     {value: 'projectName', column: 'Project Name'},
  //     {value: 'council', column: 'Council'},
  //     {value: 'buName', column: 'Business Unit'}
  applyFilter1(filterValue: string) {
    this.eventData.filter = filterValue.trim().toLowerCase();
  }

  applyFilter() {
    var columnName = this.rptEventInfo.get('filterName').value;
    var columnValue = this.rptEventInfo.get('filterValue').value;
    var startDt = new Date(this.rptEventInfo.get('startDt').value).getTime();
    var endDt = new Date(this.rptEventInfo.get('endDt').value).getTime();
    var filteredData = this.data;
    if (columnValue.trim().length > 0 &&
      startDt > 0 && endDt > 0) {
      if (columnName == 'baseLocation') {
        filteredData = this.data.filter(eDat =>
          new Date(eDat.startDt).getTime() >= startDt &&
          new Date(eDat.endDt).getTime() <= endDt && eDat.baseLocation.indexOf(columnValue) > -1
        );
      }
      else if (columnName == 'projectName') {
        filteredData = this.data.filter(eDat =>
          new Date(eDat.startDt).getTime() >= startDt &&
          new Date(eDat.endDt).getTime() <= endDt && eDat.projectName.indexOf(columnValue) > -1
        );
      }
      else if (columnName == 'council') {
        filteredData = this.data.filter(eDat =>
          new Date(eDat.startDt).getTime() >= startDt &&
          new Date(eDat.endDt).getTime() <= endDt && eDat.council.indexOf(columnValue) > -1
        );
      }
      else if (columnName == 'buName') {
        filteredData = this.data.filter(eDat =>
          new Date(eDat.startDt).getTime() >= startDt &&
          new Date(eDat.endDt).getTime() <= endDt && eDat.buName.indexOf(columnValue) > -1
        );
      }
      else if (columnName == 'eventStatus') {
        filteredData = this.data.filter(eDat =>
          new Date(eDat.startDt).getTime() >= startDt &&
          new Date(eDat.endDt).getTime() <= endDt && eDat.eventStatus.indexOf(columnValue) > -1
        );
      }
    }
    else if (columnValue.trim().length == 0 &&
      startDt > 0 && endDt > 0) {
      filteredData = this.data.filter(eDat =>
        new Date(eDat.startDt).getTime() >= startDt &&
        new Date(eDat.endDt).getTime() <= endDt
      );
    }
    else if (columnValue.trim().length > 0) {
      if (columnName == 'baseLocation') {
        filteredData = this.data.filter(eDat =>
          eDat.baseLocation.indexOf(columnValue) > -1
        );
      }
      else if (columnName == 'projectName') {
        filteredData = this.data.filter(eDat =>
          eDat.projectName.indexOf(columnValue) > -1
        );
      }
      else if (columnName == 'council') {
        filteredData = this.data.filter(eDat =>
          eDat.council.indexOf(columnValue) > -1
        );
      }
      else if (columnName == 'buName') {
        filteredData = this.data.filter(eDat =>
          eDat.buName.indexOf(columnValue) > -1
        );
      }
      else if (columnName == 'eventStatus') {
        filteredData = this.data.filter(eDat =>
          eDat.eventStatus.indexOf(columnValue) > -1
        );
      }
    }

    this.eventData.data = filteredData;
    //  console.log(JSON.stringify(filteredData));
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
    clsEStatus.L = this.sheetHeader[11]
    clsEStatus.M = this.sheetHeader[12]
    clsEStatus.N = this.sheetHeader[13]
    clsEStatus.O = this.sheetHeader[14]
    clsEStatus.P = this.sheetHeader[15]
    clsEStatus.Q = this.sheetHeader[16]
    clsEStatus.R = this.sheetHeader[17]
    clsEStatus.S = this.sheetHeader[18]
    clsEStatus.T = this.sheetHeader[18]
    expData.push(clsEStatus);

    this.eventData.data.forEach(e => {
      var clsEStatus = new EventStatus();
      clsEStatus.A = e._id;
      clsEStatus.B = e.benName;
      clsEStatus.C = e.baseLocation;
      clsEStatus.D = e.address;
      clsEStatus.E = e.council;
      clsEStatus.F = e.projectName;
      clsEStatus.G = e.eventCat;
      clsEStatus.H = e.eventTitle;
      clsEStatus.I = e.numberOfVol;
      clsEStatus.J = e.eventStatus;
      clsEStatus.K = e.startDt;
      clsEStatus.L = e.endDt;
      clsEStatus.M = e.empId;
      clsEStatus.N = e.empName;
      clsEStatus.O = e.buName;
      clsEStatus.P = e.travelHr;
      clsEStatus.Q = e.actualVolHr;
      clsEStatus.R = e.regDt;
      clsEStatus.S = e.regStatus;
      clsEStatus.T = e.participationStatus;

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
