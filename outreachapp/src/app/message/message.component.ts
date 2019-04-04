import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MessagePopupData } from '../models/message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  message: string;
  redirectTo: string;
  pageName: string;
  messageType: string;

  constructor(public dialogRef: MatDialogRef<MessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MessagePopupData) {
    this.message = data.message;
    this.redirectTo = data.redirectTo;
    this.pageName = data.currentPage;
    this.messageType = data.messageType;
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

}
