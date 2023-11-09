import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { PasswordStrengthValidator } from 'src/app/shared/Validators/password-strength.validator';
import { MustMatch } from 'src/app/shared/Validators/must-match.validator';
import { AuthentificationService } from '../services/authentification.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MyErrorStateMatcher } from 'src/app/shared/Validators/my-error-state-matcher';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  resetToken: string;
  loading = false;
  invalid = false;
  userNotExist = false;
  matcher = new MyErrorStateMatcher();
  password = new FormControl('', [
    Validators.required, Validators.minLength(8), PasswordStrengthValidator
  ]);

  confpassword = new FormControl('', [
    Validators.required
  ]);
  get resetControls() { return this.resetForm.controls; }
  constructor(private router: Router, private _activatedRoute: ActivatedRoute, private formBuilder: FormBuilder,
    private authService: AuthentificationService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.resetForm = this.formBuilder.group({
      password: this.password,
      confpassword: this.confpassword
    }, {
      validator: MustMatch('password', 'confpassword')
    });
    this._activatedRoute.queryParams.pipe(map(params => params['token'])).subscribe(token => this.resetToken = token);
  }

  reset() {
    this.loading = true;
    this.authService.resetPassword(
      {
        token: this.resetToken,
        newPassword: this.resetControls.password.value
      }
    ).subscribe(
      (res) => {
        this.loading = false;
        if (res === "Reset Success") {
          this._snackBar.open('Password reset successfully !', null, {
            duration: 3000,
            panelClass: ['blue-snackbar']
          });
          this.router.navigate(['/authentification/login']);
        }
        else if (res === "Invalid token") {
          this.invalid = true;
          return;
        }
        else if (res === "User not exist") {
          this.userNotExist = true;
          return;
        }
      });

    /*     this._activatedRoute.queryParams.subscribe(
          params => console.log('queryParams', params['token'])
        ); */
  }

}
