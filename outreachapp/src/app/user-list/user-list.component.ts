import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource, MatDialogConfig, MatDialog } from '@angular/material';
import { UserService } from 'src/app/shared/user.service';
import { User } from 'src/app/models/user';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private userService: UserService,
    private router: Router,
    public dialog: MatDialog) { }

  message: string;
  redirectTo: string;
  currentPage: string;
  messageType: string;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  userData: MatTableDataSource<User>;


  displayedColumns: string[] = ['firstName', 'lastName', 'displayName', 'email', 'action'];

  ngOnInit() {
    this.getUserList();
  }

  getUserList() {
    return this.userService.getUserList()
      .subscribe((userDet: User[]) => {
        this.userData = new MatTableDataSource();
        this.userData.data = userDet;
        this.userData.paginator = this.paginator;
        this.userData.sort = this.sort;
      });
  }

  applyFilter(filterValue: string) {
    this.userData.filter = filterValue.trim().toLowerCase();
  }


  editUser(userId: string) {
    console.log('User ID: ' + userId);

    this.router.navigate(['userprofile/' + userId]);
  }

  deleteUser(userId: string) {
    return new Promise(() => {
      this.userService.deleteUserDet(userId).subscribe(
        () => {
          this.message = "User has been deleted successfully.";
          this.currentPage = "User Delete Status"
          this.redirectTo = "/userlist";
          this.messageType = "S";

          this.openDialog();
          this.getUserList();
        },
        () => { console.log('Error in User delete: ' + userId); }
      );
    });
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