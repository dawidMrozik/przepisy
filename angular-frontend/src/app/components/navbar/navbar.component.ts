import { Component, OnInit, Input } from '@angular/core';
import * as M from 'materialize-css';
import { UserDetailsService } from 'src/app/services/user-details.service';
import { UserDetails } from 'src/app/models/user-details.interface';
import { getLocaleDateTimeFormat, getLocaleDateFormat, FormatWidth } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() isLogged;
  @Input() userDetailsId;
  @Input() userDetails: UserDetails;
  editedUserDetails: UserDetails;
  editingUserDetails: boolean = false;
  editAgeValue: number;
  editCaloriesValue: number;
  editProteinValue: number;
  editCarbsValue: number;
  editFatValue: number;
  editHeightValue: number;
  editWeightValue: number;

  constructor(private userDetailsService: UserDetailsService) {}

  ngOnInit() {
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.sidenav');
      var instances = M.Sidenav.init(elems);
    });
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
    this.editingUserDetails = true;
    M.updateTextFields();
  }

  onCancel() {
    this.editingUserDetails = false;
  }

  onSave() {
    this.userDetailsService.updateDetails(this.userDetails.id, this.editCaloriesValue, this.editWeightValue, this.editHeightValue, this.editAgeValue, this.editCarbsValue, this.editProteinValue, this.editFatValue)
      .subscribe(
        (response: Response) => {
          this.editedUserDetails = response['Detail'];
          alert("Informacje zaktualizowane");
        },
        (error) => console.log(error),
        () => {
          this.userDetails = this.editedUserDetails;
          this.editingUserDetails = false;
        }
      )
  }
}
