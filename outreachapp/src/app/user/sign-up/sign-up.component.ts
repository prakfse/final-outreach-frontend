import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { MessageComponent } from 'src/app/message/message.component';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup;
  responseMessage: string;
  isSuccess: boolean;

  message: string;
  redirectTo: string;
  currentPage: string;
  messageType: string;
  isLoggedUser: boolean = false;
  userDet: any;


  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.initialize();
    if (sessionStorage.getItem('uData')) {
      this.isLoggedUser = true;
      this.userDet = JSON.parse(sessionStorage.getItem('uData'));
    }
  }

  initialize() {
    this.signupForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      empId: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]],
      email: ['', Validators.compose([Validators.required, Validators.email,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      confirmPassword: ['', [Validators.required]],
      displayName: ['', [Validators.required]],
      buName: ['', [Validators.required]]
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.signupForm.controls[controlName].hasError(errorName);
  }

  addUser() {
    if (this.signupForm.valid) {
      let data = this.signupForm.value;
      console.log(JSON.stringify(data));
      this.userService.addUser(data).subscribe(
        () => {
          this.message = "Registration has been successfully completed.";
          this.currentPage = "Signup Page"
          this.redirectTo = "/volreg";
          this.messageType = "S";
          this.openDialog();
        },
        () => {
          this.message = "Something went wrong. Please condact admin.";
          this.currentPage = "Signup Page"
          this.redirectTo = "/signin";
          this.messageType = "E";
          this.openDialog();
        }
      )
    };
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
  resetForm() {
    this.initialize();
  }

  cancel() {
    if (this.userDet != null) {
      if (this.userDet.role == 'Normal') {
        this.router.navigate(['/volreg']);
      }
      else {
        this.router.navigate(['/eventlist']);
      }
    }
    else
      this.router.navigate(['/signin']);
  }

}
