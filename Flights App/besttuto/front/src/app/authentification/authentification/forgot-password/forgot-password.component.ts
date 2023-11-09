import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthentificationService } from '../services/authentification.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  fpassForm: FormGroup;
  userNotExist = false;
  loading = false;
  email = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  get fpassControls() { return this.fpassForm.controls; }

  constructor(private authService: AuthentificationService, private router: Router,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.fpassForm = new FormGroup({
      email: this.email
    });
  }

  sendEmail() {
    this.loading = true;
    this.authService.forgotPassword(this.fpassControls.email.value).subscribe(
      (res: any) => {
        this.loading = false;
        if(res==="Email sent"){
          this._snackBar.open('Email sent successfully !', null, {
            duration: 3000,
            panelClass: ['blue-snackbar']
          });
          this.router.navigate(['/authentification/login']);
        }
        else if(res==="User not found"){
          this.userNotExist=true;
          return;
         }
      },
      (error) => {
        this.loading = false;
        return;
      }
    )
  }

  login() {
    this.router.navigate(['/authentification/login']);
  }

}
