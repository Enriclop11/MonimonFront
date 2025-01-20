import { Component, OnInit } from '@angular/core';
import { ApiMonitasService } from '../../service/api-monitas.service';
import { FormsModule } from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {ChangePasswordDialogComponent} from '../../settings/change-password-dialog/change-password-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {ToolbarComponent} from '../../settings/toolbar/toolbar.component';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, NgIf, NgForOf, ToolbarComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  token: any = "";
  userInfo: any = {};
  selectedCards: any = [];

  constructor(
    private readonly apiMonitasService: ApiMonitasService,
    private dialog: MatDialog,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit() {
    if (!localStorage.getItem('token')) {
      window.location.href = '/login';
    } else {
      this.token = localStorage.getItem('token');
    }

    this.route.data.subscribe((data) => {
      this.userInfo = data['profileData'];
      if (this.userInfo.photoCardSelected) {
        this.selectedCards = this.userInfo.photoCardSelected;
      }
    });
  }

  toggleChangePassword(): void {
    this.dialog.open(ChangePasswordDialogComponent, {
      data: { token: this.token }
    });
  }

  logout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  myCards() {
    window.location.href = '/photocards/' + this.userInfo.username;
  }

  deselectCard(card: any) {
    this.apiMonitasService.setSelectedCard(this.token, card.id).subscribe({
      next: (data) => {
        this.getUserInfo();
      },
      error: (error) => {
        console.log('Error deselecting card');
      }
    });
  }

  getUserInfo() {
    this.apiMonitasService.getMyUser(this.token).subscribe({
      next: (data) => {
        if (data) {
          this.userInfo = data;
          if (this.userInfo.photoCardSelected) {
            this.selectedCards = this.userInfo.photoCardSelected;
          }
        }
      },
      error: (error) => {
        console.log('Error getting user info');
      }
    });
  }

}
