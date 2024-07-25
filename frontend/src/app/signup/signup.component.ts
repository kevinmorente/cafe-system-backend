import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { FormGroup, Validators } from '@angular/forms';
import { GlobalConstants } from '../shared/gobal-constant';
import { SnackbarService } from '../services/snackbar.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {
  [x: string]: any;
  signupForm: any = FormGroup;
  responseMessage: any;

  constructor(
    private router: Router,
    private userService: UserService,
    private snackbarService: SnackbarService,
    private dialogRef: MatDialogRef<SignupComponent>,
    private ngxService: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.signupForm = this.formBuild.group({
      name: [null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
      contactNumber: [null, [Validators.required, Validators.pattern(GlobalConstants.contactNumberRegex)]],
      password: [null, [Validators.required]]
    })
  }

  handleSubmit(){
    this.ngxService.start();
    var formData = this.signupForm.value;
    var data = {
      name: formData.name,
      email: formData.email,
      contact_number: formData.contactNumber,
      password: formData.password
    }
    this.userService.signup(data).subscribe((response:any)=>{
      this.ngxService.stop();
      this.dialogRef.close();
      this.responseMessage = response?.message;
      this.snackbarService.openSnackBar(response.message, '');
      this.router.navigate(['/']);
    },(error)=>{
      this.ngxService.stop();
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    });
  }

}
