import { Routes } from '@angular/router';
import {PhotocardsComponent} from './photocards/photocards.component';
import {IndexComponent} from './index/index.component';
import {LeaderboardComponent} from './leaderboard/leaderboard.component';
import {LoginComponent} from './login/login.component';
import {ProfileComponent} from './profile/profile.component';

export const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'photocards/:user', component: PhotocardsComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent }
];
