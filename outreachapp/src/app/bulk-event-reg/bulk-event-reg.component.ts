import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import * as XLSX from 'xlsx';
import { EventService } from 'src/app/shared/event.service';
import { MessageComponent } from '../message/message.component';
type AOA = any[][];


class bulkVolReg {
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
}

class volreg {
  eventId: any;
  regTo: string;
  regStatus: string;
  userName: string;
  email: string;
  buName: string;
  boardingPtDet: string;
  droppingPtDet: string;
  transMod: string;
  soureType: string;
  travelHr: number;
  actualVolHr: number;
  participationStatus: string;
  isRegUser: boolean;
}

@Component({
  selector: 'app-bulk-event-reg',
  templateUrl: './bulk-event-reg.component.html',
  styleUrls: ['./bulk-event-reg.component.css']
})
export class BulkEventRegComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  eventData: MatTableDataSource<Event>;

  volRegs: any = [];

  message: string;
  redirectTo: string;
  currentPage: string;
  messageType: string;

  disabled: boolean;

  sheetHeader: string[] = ['Event ID', 'Benificary Details', 'Council', 'Project',
    'Event Category', 'Event Title', 'Emp ID', 'Emp Name',
    'Email', 'BU Name',
    'Transport Mode', 'Boarding point', 'Dropping point'];


  displayedColumns: string[] = ['benName', 'council', 'project', 'eventCat', 'numberOfVol'];

  fileName: string = 'BulkEventDetails.xlsx';

  // data: AOA = [ [,], [,] ];
  data: any;

  uploadMessgae: string;

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
        console.log('Bulk User Creation');
      });
  }

  export(): void {
    /* generate worksheet */

    // Covert to JSON format data

    var expData: any = [];

    var clsVolRegDet = new bulkVolReg();
    clsVolRegDet.A = this.sheetHeader[0];
    clsVolRegDet.B = this.sheetHeader[1]
    clsVolRegDet.C = this.sheetHeader[2]
    clsVolRegDet.D = this.sheetHeader[3]
    clsVolRegDet.E = this.sheetHeader[4]
    clsVolRegDet.F = this.sheetHeader[5]
    clsVolRegDet.G = this.sheetHeader[6]
    clsVolRegDet.H = this.sheetHeader[7]
    clsVolRegDet.I = this.sheetHeader[8]
    clsVolRegDet.J = this.sheetHeader[9]
    clsVolRegDet.K = this.sheetHeader[10]
    clsVolRegDet.L = this.sheetHeader[11]
    clsVolRegDet.M = this.sheetHeader[12]
    expData.push(clsVolRegDet);

    this.data.forEach(e => {
      var clsVolRegDet = new bulkVolReg();
      clsVolRegDet.A = e._id;
      clsVolRegDet.B = e.benName + ";" + e.baseLocation;
      clsVolRegDet.C = e.council;
      clsVolRegDet.D = e.projectName;
      clsVolRegDet.E = e.eventCat;
      clsVolRegDet.F = e.eventTitle;
      clsVolRegDet.G = "";
      clsVolRegDet.H = "";
      clsVolRegDet.I = "";
      clsVolRegDet.J = "";
      clsVolRegDet.K = "";
      clsVolRegDet.L = "";
      clsVolRegDet.M = "";
      expData.push(clsVolRegDet);
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
          vreg.userName = e[7];
          vreg.email = e[8];
          vreg.buName = e[9];
          vreg.transMod = e[10];
          vreg.boardingPtDet = e[11];
          vreg.droppingPtDet = e[12];
          vreg.regStatus = "Confirmed";
          vreg.soureType = "Bulk";
          vreg.travelHr = 0;
          vreg.actualVolHr = 0;
          vreg.participationStatus = "No Show";
          vreg.isRegUser = true;
          this.volRegs.push(vreg);
        }
        else
          blnSkipHeader = false;
      })

      console.log(JSON.stringify(this.volRegs));
      //this.datas = <AOA>(XLSX.utils.sheet_to_json(ws));
      //console.log(JSON.stringify(this.data));
    };
    reader.readAsBinaryString(target.files[0]);
  }
  bulkEventsReg() {
    this.uploadMessgae = "Your request is processing inprogess. Please wait ...";
    this.volRegs.forEach(e => {
      e.createdBy = localStorage.getItem("userID");
      e.createdDt = Date.now();
      e.soureType = "Bulk";
      e.updatedBy = localStorage.getItem("userID");
      e.updatedDt = Date.now();
    });

    this.eventService.bulkUserReg(this.volRegs)
      .subscribe(() => {

        this.uploadMessgae = "";
        this.message = "All the listed events are updated successfully !!!";
        this.currentPage = "Bulk Event Upload Status"
        this.redirectTo = "/eventlist";
        this.messageType = "S";
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
    dialogRef.afterClosed().subscribe(
    );
  }

}

