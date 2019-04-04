import { Component, OnInit, ViewChild } from '@angular/core';

import * as XLSX from 'xlsx';
import { MatSort, MatPaginator, MatTableDataSource, MatDialogConfig, MatDialog } from '@angular/material';
import { UserService } from 'src/app/shared/user.service';
import { EventService } from 'src/app/shared/event.service';
import { Project } from 'src/app/models/project';
import { MessageComponent } from 'src/app/message/message.component';

type AOA = any[][];

class eventDet {
	benName: string;
	baseLocation: string;
	council: string;
	address: string;
	pocID: string;
	pocDet: string;
	project: any;
	eventCat: string;
	eventTitle: string;
	eventDesc: string;
	numberOfVol: number;
	transMod: string;
	boardingPtDet: string;
	droppingPtDet: string;
	startDt: Date;
	endDt: Date;
	visibleDt: Date;
	isFavorite: boolean;
	createdBy: string;
	createdDt: Date;
	updatedBy: string;
	updatedDt: Date;
	createdVia: string;
	eventStatus: string;
	regUsers: any;
	isFavotite: boolean;	
}

class projectDet {
	projectName: string;
	eventCat: any = [];
}


@Component({
	selector: 'app-create-bulk-event',
	templateUrl: './create-bulk-event.component.html',
	styleUrls: ['./create-bulk-event.component.css']
})

export class CreateBulkEventComponent implements OnInit {

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	eventData: MatTableDataSource<Event>;

	eventList: any = [];
	data: AOA = [[,], [,]];
	wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
	fileName: string = 'BulkEventDetails.xlsx';

	dbProjects: any = [];

	mProjectID: any;

	Message: string;

	newProjects: projectDet[];

	uploadMessgae: string;

	message: string;
	redirectTo: string;
	currentPage: string;
	messageType: string;


	disabled: boolean;

	displayedColumns: string[] = ['benName', 'council', 'project', 'eventCat', 'numberOfVol', 'action'];

	constructor(private eventService: EventService,
		private userService: UserService,
		public dialog: MatDialog) { }

	ngOnInit() {
		this.disabled = true;
		console.log('You are in Bulk event creation page');
		if (this.userService.isLoggedIn()) {
			this.getProjects();
		}
	}

	bulkEventUpload() {
		this.uploadMessgae = "Event details are uploading is inprogess. Please wait ...";
		this.eventService.addBulkEvents(this.eventList)
			.subscribe(() => {
				this.uploadMessgae = "";
				this.message = "All the listed events are updated successfully !!!";
				this.currentPage = "Bulk Event Upload Status"
				this.redirectTo = "/eventlist";
				this.messageType = "S";
				this.openDialog();
			})
		//console.log('Event List : ' + JSON.stringify( this.eventList));
	}

	getProjects() {
		this.eventService.getProjects().subscribe((projectData: Project[]) => {
			this.dbProjects = projectData;
		});
	}


	onFileChange(evt: any) {
		/* wire up file reader */
		const target: DataTransfer = <DataTransfer>(evt.target);
		if (target.files.length !== 1) throw new Error('Cannot use multiple files');

		this.eventList = [];
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
					var clsEvent = new eventDet();
					// var benVal = e[0];
					// var benDet = benVal.split(";");
					// if (benDet.length > 0)
					clsEvent.benName = e[0];
					clsEvent.baseLocation = e[1];
					clsEvent.council = e[2];
					clsEvent.project = e[3];
					clsEvent.eventCat = e[4];
					clsEvent.eventTitle = e[5];
					clsEvent.eventDesc = e[6];
					clsEvent.startDt = new Date(e[7] + " " + e[8]);
					clsEvent.endDt = new Date(e[7] + " " + e[9]);
					clsEvent.numberOfVol = e[10];
					clsEvent.pocID = e[11];
					clsEvent.pocDet = e[11];
					clsEvent.transMod = e[12];
					clsEvent.boardingPtDet = e[13];
					clsEvent.droppingPtDet = e[14];
					clsEvent.regUsers = null;
					clsEvent.isFavotite = false;
					clsEvent.createdVia = "Bulk";
					clsEvent.createdBy = localStorage.getItem("userID");
					clsEvent.updatedBy = localStorage.getItem("userID");
					clsEvent.eventStatus = "Pending";
					
					this.eventList.push(clsEvent);
				}
				else
					blnSkipHeader = false;
			}
			)

			this.eventData = new MatTableDataSource();
			this.eventData.data = this.eventList;
			this.eventData.paginator = this.paginator;
			this.eventData.sort = this.sort;

			// get Unique project details from eventList


			console.log(JSON.stringify(this.eventList));
			//this.datas = <AOA>(XLSX.utils.sheet_to_json(ws));
			//console.log(JSON.stringify(this.data));
		};
		reader.readAsBinaryString(target.files[0]);
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




	applyFilter(filterValue: string) {
		this.eventData.filter = filterValue.trim().toLowerCase();
	}


}
