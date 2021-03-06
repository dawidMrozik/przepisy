import { Component, OnInit, Input, OnChanges, ComponentFactoryResolver } from '@angular/core';
import * as M from 'materialize-css';
import { UserDetailsService } from 'src/app/services/user-details.service';
import { UserDetails } from 'src/app/models/user-details.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnChanges {
  @Input() isLogged;
  @Input() userDetailsId;
  @Input() userDetails: UserDetails;
  @Input() userId: number;
  editedUserDetails: UserDetails;
  editingUserDetails: boolean = false;
  editAgeValue: number;
  editCaloriesValue: number;
  editProteinValue: number;
  editCarbsValue: number;
  editFatValue: number;
  editHeightValue: number;
  editWeightValue: number;
  editCaloriesEatenValue: number;
  percents: number;
  percentsInt: number;
  userName: string;
  userEmail: string;
  tmp_detailsID: number;

  constructor(private userDetailsService: UserDetailsService, private authService: AuthService) {
  }

  ngOnInit() {
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.sidenav');
      var instances = M.Sidenav.init(elems);
    });

    if(this.isLogged) {
      this.authService.getUser()
        .subscribe(
          (response: Response) => {
            this.userName = response['User'].name;
            this.userEmail = response['User'].email;
          }
        )
    }
  }

  ngOnChanges(): void {
    if(this.userDetails) this.calculateEatenCalories();
  }

  onLogout() {
    localStorage.removeItem('token');
    location.reload();
  }

  onEdit() {
    this.editAgeValue = this.userDetails.age;
    this.editCaloriesValue = this.userDetails.calories;
    this.editProteinValue = this.userDetails.protein;
    this.editCarbsValue = this.userDetails.carbs;
    this.editFatValue = this.userDetails.fat;
    this.editHeightValue = this.userDetails.height;
    this.editWeightValue = this.userDetails.weight;
    this.editCaloriesEatenValue = this.userDetails.caloriesEaten;
    this.editingUserDetails = true;
    M.updateTextFields();
  }

  onCancel() {
    this.editingUserDetails = false;
  }

  onSave() {
    if(this.userDetails.id == 1){
      this.userDetailsService.addDetails(this.editCaloriesValue, this.editCaloriesEatenValue, this.editWeightValue, this.editHeightValue, this.editAgeValue, this.editCarbsValue, this.editProteinValue, this.editFatValue)
        .subscribe(
          (response: Response) => {
            this.tmp_detailsID = response['Detail']['id']
            this.editedUserDetails = response['Detail'];
            console.log("Nowe szczegóły dodane z ID " + this.tmp_detailsID)
          },
          (error) => console.log(error),
          () => {
            this.authService.updateDetails(this.userId, this.tmp_detailsID)
              .subscribe(
                (response: Response) => {
                  console.log("Zaktualizowano szczegóły użytkownika: " + response['User'])
                }
              ),
              (error) => console.log(error),
              () => {
                location.reload();
                this.calculateEatenCalories();
              }
          }
        )
    } else {
      this.userDetailsService.updateDetails(this.userDetails.id, this.editCaloriesValue, this.editCaloriesEatenValue, this.editWeightValue, this.editHeightValue, this.editAgeValue, this.editCarbsValue, this.editProteinValue, this.editFatValue)
      .subscribe(
        (response: Response) => {
          this.editedUserDetails = response['Detail'];
          alert("Informacje zaktualizowane");
        },
        (error) => console.log(error),
        () => {
          this.userDetails = this.editedUserDetails;
          this.calculateEatenCalories();
          this.editingUserDetails = false;
        }
      )
    }
  }

  calculateEatenCalories() {
      if(this.userDetails.caloriesEaten == 0) {
        this.percents = 0;
        this.percentsInt = 0;
      }
      else {
        this.percents = Number(((this.userDetails.caloriesEaten / this.userDetails.calories) * 100).toFixed(2));
        this.percentsInt = Math.floor(this.percents);
      }
    }
}
