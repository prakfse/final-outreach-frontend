import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title: string;
  isLoggedUser: boolean = false;
  userDet: any;

  constructor(private router: Router,
    private userService: UserService) { }


  ngOnInit() {
    this.userService.loggedUser.subscribe((userData) => {
      this.isLoggedUser = true;
      this.userDet = userData;
      sessionStorage.setItem('uData', JSON.stringify(userData));
    });
    if (sessionStorage.getItem('uData')) {
      this.isLoggedUser = true;
      this.userDet = JSON.parse(sessionStorage.getItem('uData'));
    }
  }

  logout() {
    this.userDet = null;
    this.isLoggedUser = false;
    localStorage.removeItem("userID");
    localStorage.removeItem("token");
    sessionStorage.removeItem('uData');
    this.router.navigate(['/signin']);
  }
}
