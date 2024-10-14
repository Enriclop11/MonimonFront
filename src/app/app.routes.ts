import { Routes } from '@angular/router';
import {PhotocardsComponent} from './photocards/photocards.component';
import {IndexComponent} from './index/index.component';
import {LeaderboardComponent} from './leaderboard/leaderboard.component';

export const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'photocards/:user', component: PhotocardsComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
];
