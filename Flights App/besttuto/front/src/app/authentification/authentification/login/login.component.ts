import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthentificationService } from '../services/authentification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ],
  encapsulation: ViewEncapsulation.None 
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  invalid = false;
  username = new FormControl('', [
    Validators.required
  ]);

  password = new FormControl('', [
    Validators.required
  ]);

  get loginControls() { return this.loginForm.controls; }


  constructor(private authService: AuthentificationService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: this.username,
      password: this.password
    });
  }

  login() {
    this.submitted = true;
    this.loading = true;
    this.authService.login(
      {
        username: this.loginControls.username.value,
        password: this.loginControls.password.value
      }
    ).subscribe(success => {
      this.loading = false;  
      if (success) {
        this.router.navigate(['/myFlightApp/flights']);
      }
      else {
        this.invalid = true;
        return;
      }
    });
  }
  register(){
    this.router.navigate(['/authentification/register']);
  }

  cancel() {
    this.loginForm.reset();
  }

  resetPassword() {
    this.router.navigate(['/authentification/forgot-password']);
  }
}
