import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})


export class SigninComponent implements OnInit {

  signinForm: FormGroup;
  isSuccess: boolean;
  responseMessage: string;

  hide = true;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
    // if(this.userService.isLoggedIn())
    //   this.router.navigate(['/userlist']);
  }

  onSubmit() {
    if (this.signinForm.valid) {
      let data = this.signinForm.value;
      var userData;
      console.log('Click Submit button:  ' + JSON.stringify(data));
      this.userService.login(data).subscribe(
        res => {
          console.log('Success');
          this.userService.setToken(res['token']);
          this.userService.getUserProfile().subscribe(data => {
            userData = data['user'];
            // localStorage.setItem("userID", userData.empId);
            localStorage.setItem("userID", userData.empId);
            if (userData.role == 'PMO' || userData.role == 'Admin')
              this.router.navigate(['/eventlist']);
            // else if (userData.role == 'Admin')
            //   this.router.navigate(['/eventlist']);
            else
              this.router.navigate(['/volreg']);
          });
        },
        err => {
          console.log(JSON.stringify(err))
          this.responseMessage = err.error.message;
        })
    }
  }

  redirectedTo() {
    this.router.navigate(['/signup']);

  }
}
