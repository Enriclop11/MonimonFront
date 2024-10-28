import { Component, OnInit } from '@angular/core';
import { ApiMonitasService } from '../api-monitas.service';
import { FormsModule } from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {ChangePasswordDialogComponent} from '../change-password-dialog/change-password-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, NgIf, NgForOf],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  token: any = "";
  userInfo: any = {};

  showChangePasswordForm: boolean = false;
  newPassword: string = '';
  confirmNewPassword: string = '';
  selectedCards: any = [];

  constructor(private readonly apiMonitasService: ApiMonitasService, private dialog: MatDialog) {}

  ngOnInit() {
    if (!localStorage.getItem('token')) {
      window.location.href = '/login';
    } else {
      this.token = localStorage.getItem('token');
    }

    this.getUserInfo();
  }

  toggleChangePassword(): void {
    this.dialog.open(ChangePasswordDialogComponent, {
      data: { token: this.token }
    });
  }

  getUserInfo() {
    this.apiMonitasService.getMyUser(this.token).subscribe({
      next: (data) => {
        this.userInfo = data;
        console.log(this.userInfo);

        this.selectedCards = [this.userInfo.photoCardSelected];
        console.log(this.selectedCards);

      },
      error: (error) => {
        console.log('Error getting user info');
      }
    });
  }

  logout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  myCards() {
    window.location.href = '/photocards/' + this.userInfo.username;
  }
}
