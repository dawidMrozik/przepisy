import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserDetailsService } from 'src/app/services/user-details.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService, private userDetailsService: UserDetailsService, private router: Router) { }

  ngOnInit() {
  }

  onSignup(form: NgForm) {
    this.authService.signup(form.value.name, form.value.email, form.value.password, 1)
    .subscribe(
      response => console.log(response),
      error => console.log(error),
      () => this.router.navigate(['/'])
    );
}

}
