import {Component, OnInit} from '@angular/core';
import {ApiMonitasService} from '../../service/api-monitas.service';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {ChangePasswordDialogComponent} from '../../settings/change-password-dialog/change-password-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {ToolbarComponent} from '../../settings/toolbar/toolbar.component';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../environments/environment';

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
    private readonly dialog: MatDialog,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit() {
    if (!localStorage.getItem('token')) {
      window.location.href = '/login';
    } else {
      this.token = localStorage.getItem('token');
    }

    this.route.data.subscribe((data) => {
      this.userInfo = data['userData'];
      if (this.userInfo.photoCardSelected) {
        this.selectedCards = this.userInfo.photoCardSelected;
      }
    });

    const urlParams = new URLSearchParams(window.location.search);
    const discordCode = urlParams.get('code');

    if (discordCode) {
      const state = urlParams.get('state');
      if (state === sessionStorage.getItem('discord_oauth_state')) {
        console.log('Linking Discord with code:', discordCode);
        this.apiMonitasService.linkDiscord(this.token, discordCode, environment.discordRedirectUri).subscribe({
          next: (data) => {
            this.getUserInfo();
            window.history.replaceState({}, document.title, window.location.pathname);
          },
          error: (error) => {
            console.log('Error linking Discord');
          }
        });
      } else {
        console.log('Invalid Discord state');
      }
    }
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

  flipCard(card: any) {
    card.flipped = !card.flipped;
  }

  linkDiscord() {
    //https://discord.com/oauth2/authorize?response_type=code&client_id=157730590492196864&scope=identify%20guilds.join&state=15773059ghq9183habn&redirect_uri=https%3A%2F%2Fnicememe.website&prompt=consent&integration_type=0
    const clientId = environment.discordClientId;
    const redirectUri = environment.discordRedirectUri;
    const state = Math.random().toString(36).substring(2, 15);

    sessionStorage.setItem('discord_oauth_state', state);

    window.location.href = `https://discord.com/oauth2/authorize?response_type=code&client_id=${clientId}&scope=identify%20guilds.join&state=${state}&redirect_uri=${encodeURIComponent(redirectUri)}&prompt=consent&integration_type=0`;
  }

  unlinkDiscord() {
    this.apiMonitasService.unlinkDiscord(this.token).subscribe({
      next: (data) => {
        this.getUserInfo();
      },
      error: (error) => {
        console.log('Error unlinking Discord');
      }
    });
  }
}
