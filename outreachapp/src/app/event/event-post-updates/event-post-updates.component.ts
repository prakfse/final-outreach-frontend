import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialogConfig, MatDialog } from '@angular/material';
import * as XLSX from 'xlsx';
import { EventService } from 'src/app/shared/event.service';
import { MessageComponent } from 'src/app/message/message.component';
type AOA = any[][];


class EventDataDet {
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
}

class volreg {
  eventId: any;
  regTo: string;
  regStatus: string;
  soureType: string;
  travelHr: number;
  actualVolHr: number;
  participationStatus: string;
  isRegUser: boolean;
  name: string;
  email: string;
  buName: string;
}

@Component({
  selector: 'app-event-post-updates',
  templateUrl: './event-post-updates.component.html',
  styleUrls: ['./event-post-updates.component.css']
})
export class EventPostUpdatesComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  eventData: MatTableDataSource<Event>;

  volRegs: any = [];

  sheetHeader: string[] = ['Event ID', 'Benificary Details', 'Council', 'Project',
    'Event Category', 'Event Title', 'Emp ID', 'Emp Name', 'Email',
    'BU Name', 'Travel Hours',
    'Overall Hours', 'Participation Status [Yes/No]', 'is Register User[Yes/No]'];


  displayedColumns: string[] = ['benName', 'council', 'project', 'eventCat', 'numberOfVol'];

  fileName: string = 'BulkEventDetails.xlsx';

  // data: AOA = [ [,], [,] ];
  data: any;

  disabled: boolean;

  message: string;
  redirectTo: string;
  currentPage: string;
  messageType: string;

  Message: string;

  constructor(private eventService: EventService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.disabled = true;
    this.getEventList();

  }

  getEventList() {
    return this.eventService.getEventsForReg()
      .subscribe((eventDet: Event[]) => {
        this.eventData = new MatTableDataSource();
        this.eventData.data = eventDet;
        this.eventData.paginator = this.paginator;
        this.eventData.sort = this.sort;
        this.data = eventDet;
      });
  }

  export(): void {
    /* generate worksheet */

    // Covert to JSON format data

    var expData: any = [];

    // sheetHeader: string[] = ['Event ID', 'Benificary Details', 'Council', 'Project',
    // 'Event Category', 'Event Title', 'Emp ID', 'Emp Name', 'Email',
    // 'BU Name', 'Travel Hours',
    // 'Overall Hours', 'Participation Status', 'is Register User' ];

    var clsEventDet = new EventDataDet();
    clsEventDet.A = this.sheetHeader[0];
    clsEventDet.B = this.sheetHeader[1]
    clsEventDet.C = this.sheetHeader[2]
    clsEventDet.D = this.sheetHeader[3]
    clsEventDet.E = this.sheetHeader[4]
    clsEventDet.F = this.sheetHeader[5]
    clsEventDet.G = this.sheetHeader[6]
    clsEventDet.H = this.sheetHeader[7]
    clsEventDet.I = this.sheetHeader[8]
    clsEventDet.J = this.sheetHeader[9]
    clsEventDet.K = this.sheetHeader[10]
    clsEventDet.L = this.sheetHeader[11]
    clsEventDet.M = this.sheetHeader[12]
    clsEventDet.N = this.sheetHeader[13]
    expData.push(clsEventDet);

    this.data.forEach(e => {
      var arrUser = e.rUsers;
      if (arrUser.length > 0) {
        for (var i = 0; i < arrUser.length; i++) {
          var clsEventDet = new EventDataDet();
          clsEventDet.A = e._id;
          clsEventDet.B = e.benName + ";" + e.baseLocation;
          clsEventDet.C = e.council;
          clsEventDet.D = e.projectName;
          clsEventDet.E = e.eventCat;
          clsEventDet.F = e.eventTitle;
          clsEventDet.G = arrUser[i].empId;
          clsEventDet.H = arrUser[i].displayName;
          clsEventDet.I = arrUser[i].email;
          clsEventDet.J = arrUser[i].buName;
          clsEventDet.K = "";
          clsEventDet.L = "";
          clsEventDet.M = "";
          clsEventDet.N = "";
          expData.push(clsEventDet);
        }
      }
      else {
        var clsEventDet = new EventDataDet();
        clsEventDet.A = e._id;
        clsEventDet.B = e.benName + ";" + e.baseLocation;
        clsEventDet.C = e.council;
        clsEventDet.D = e.projectName;
        clsEventDet.E = e.eventCat;
        clsEventDet.F = e.eventTitle;
        clsEventDet.G = "";
        clsEventDet.H = "";
        clsEventDet.I = "";
        clsEventDet.J = "";
        clsEventDet.K = "";
        clsEventDet.L = "";
        clsEventDet.M = "";
        clsEventDet.N = "";
        expData.push(clsEventDet);
      }
    });
    //console.log(JSON.stringify(expData));

    //var jsonData = JSON.parse( this.data);
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(expData);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

  applyFilter(filterValue: string) {
    this.eventData.filter = filterValue.trim().toLowerCase();
  }



  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');

    this.disabled = false;

    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));

      var blnSkipHeader = true;

      this.data.forEach((e) => {
        if (!blnSkipHeader) {
          var vreg = new volreg();
          vreg.eventId = e[0];
          vreg.regTo = e[6];
          vreg.name = e[7];
          vreg.email = e[8];
          vreg.buName = e[9];
          vreg.regStatus = "Confirmed";
          vreg.soureType = "Single";
          vreg.travelHr = e[10];
          vreg.actualVolHr = e[11];
          vreg.participationStatus = (e[12] == "Yes" ? "Show" : "No Show");
          vreg.isRegUser = (e[13] == "Yes");
          this.volRegs.push(vreg);
        }
        else
          blnSkipHeader = false;
      })

      this.Message = "Post Update Events details are successfully loaded. Please hit 'Load Data' button";
      //this.datas = <AOA>(XLSX.utils.sheet_to_json(ws));
      //console.log(JSON.stringify(this.data));
    };
    reader.readAsBinaryString(target.files[0]);
  }


  bulkPostEventUpdates() {
    this.volRegs.forEach(e => {
      e.updatedBy = localStorage.getItem("userID");
      e.updatedDt = Date.now();
    });
    console.clear();
    console.log(JSON.stringify(this.volRegs));

    this.eventService.postEventsBulkUpdate(this.volRegs)
      .subscribe(
        // this.Message = "Post Event updates are successfully loaded !!!";
        res => {
          this.message = "Post Event updates are successfully loaded !!!";
          this.currentPage = "Post Event Update Status"
          this.redirectTo = "/eventlist";
          this.messageType = "S";
          this.openDialog();
          //this.router.navigate(['userlist']);
        },
        err => {
          this.message = "Something went wrong. Please condact admin.";
          this.currentPage = "Event Creation Message"
          this.redirectTo = "/createevent";
          this.messageType = "E";
          this.openDialog();
        })
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(MessageComponent, {
      width: '500px',
      data: {
        message: this.message, redirectTo: this.redirectTo,
        currentPage: this.currentPage, messageType: this.messageType
      }
    });
    dialogRef.afterClosed().subscribe();
  }
}