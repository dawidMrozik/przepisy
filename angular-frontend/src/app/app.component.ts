import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import * as M from 'materialize-css';
import { Router } from '@angular/router';
import { UserDetails } from './models/user-details.interface';
import { UserDetailsService } from './services/user-details.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLogged: Boolean;
  userEmail: String;
  userId: number;
  userDetailsId: number;
  loadNav: boolean = false;
  userDetails: UserDetails;

  constructor(private authService: AuthService, private router: Router, private userDetailsService: UserDetailsService) {}

  ngOnInit() {
    M.AutoInit();
    this.checkIfLogged();
    if(this.isLogged) this.getUserData();
    this.loadNav = true;
  }

  ngAfterContentChecked() {
    this.checkIfLogged();
  }
  
  checkIfLogged() {
    if(this.authService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  getUserData() {
    this.authService.getUser()
     .subscribe(
       (response: Response) => {
         this.userEmail = response['User'].email;
         this.userId = response['User'].id;
         this.userDetailsId = response['User'].detail_id;
       },
       (error) => console.log(error),
       () => {
        this.userDetailsService.getUserDetails(this.userDetailsId)
        .subscribe(
          (response: Response) => {
            this.userDetails = response['Detail']
          }
        ),
        (error) => console.log(error),
        () => {
          
        }
       }
     )
  }
}
