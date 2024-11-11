import { Routes } from '@angular/router';
import {PhotocardsComponent} from './user/photocards/photocards.component';
import {IndexComponent} from './index/index.component';
import {LeaderboardComponent} from './user/leaderboard/leaderboard.component';
import {LoginComponent} from './user/login/login.component';
import {ProfileComponent} from './user/profile/profile.component';
import {CombatComponent} from './overlay/combat/combat.component';

export const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'photocards/:user', component: PhotocardsComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'overlay/combat', component: CombatComponent }
];
