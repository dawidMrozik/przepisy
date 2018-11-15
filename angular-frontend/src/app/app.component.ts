import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLogged: Boolean;
  userEmail: String;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.getUserData();
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
       }
     )
  }

  onLogout() {
    localStorage.removeItem('token');
  }
}
