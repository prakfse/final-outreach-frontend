import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { UserService } from 'src/app/shared/user.service';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private userService: UserService) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  userData: any;
  users: User[];
  userColumns: string[] = ['firstName', 'lastName', 'displayName', 'email', 'action'];

  ngOnInit() {
    // this.getUserList();
  }

  getUserList() {
    return this.userService.getUserList()
      .subscribe((userDet: User[]) => {
        console.log(userDet);
        this.userData = new MatTableDataSource();
        this.userData.data = userDet;
        this.userData.paginator = this.paginator;
        this.userData.sort = this.sort;
      });
  }

}
