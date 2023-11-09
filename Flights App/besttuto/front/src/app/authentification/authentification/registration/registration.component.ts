import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthentificationService } from '../services/authentification.service';
import { Router } from '@angular/router';
import { MyErrorStateMatcher } from 'src/app/shared/Validators/my-error-state-matcher';
import { MustMatch } from 'src/app/shared/Validators/must-match.validator';
import { PasswordStrengthValidator } from 'src/app/shared/Validators/password-strength.validator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styles: [
  ]
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;
  u_username = false;
  u_email = false;
  loading = false;

  email = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  username = new FormControl('', [
    Validators.required,
  ]);
  password = new FormControl('', [
    Validators.required, Validators.minLength(8), PasswordStrengthValidator
  ]);
  confpassword = new FormControl('', [
    Validators.required
  ]);
  acceptTerms = new FormControl(false, [
    Validators.requiredTrue
  ]);
  matcher = new MyErrorStateMatcher();
  submitted = false;
  get registerControls() { return this.registerForm.controls; }

  constructor(private formBuilder: FormBuilder, private authService: AuthentificationService,
    private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: this.username,
      password: this.password,
      confpassword: this.confpassword,
      email: this.email,
      acceptTerms: this.acceptTerms
    }, {
      validator: MustMatch('password', 'confpassword')
    }
    );
  }

  register() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    this.authService.register(
      {
        username: this.registerControls.username.value,
        email: this.registerControls.email.value,
        password: this.registerControls.password.value,
        confpassword: this.registerControls.confpassword.value
      }
    ).subscribe(
      (res: any) => {
        this.loading = false;
        this._snackBar.open('Account created successfully !', null, {
          duration: 3000,
          panelClass: ['blue-snackbar']
        });
        this.router.navigate(['/authentification/login']);
      },
      (error) => {
        this.u_username = false;
        this.u_email = false;
        if ((error.error.message).includes('U_USERNAME')) {
          this.u_username = true;
        }
        else if ((error.error.message).includes('U_EMAIL')) {
          this.u_email = true;
        }
        this.loading = false;
      }
    )
  }


}
