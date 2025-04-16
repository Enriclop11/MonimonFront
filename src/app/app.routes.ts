import { Routes } from '@angular/router';
import { PhotocardsComponent } from './user/photocards/photocards.component';
import { IndexComponent } from './index/index.component';
import { LeaderboardComponent } from './user/leaderboard/leaderboard.component';
import { LoginComponent } from './user/login/login.component';
import { ProfileComponent } from './user/profile/profile.component';
import { CombatComponent } from './overlay/combat/combat.component';
import { MarketplaceComponent } from './user/marketplace/marketplace.component';
import { LeaderboardResolverService } from './user/leaderboard/leaderboard-resolver.service';
import { PhotocardsResolverService } from './user/photocards/photocards-resolver.service';
import { MarketplaceResolverService } from './user/marketplace/marketplace-resolver.service';
import { ToolbarResolverService } from './settings/toolbar/toolbar-resolver.service';

export const routes: Routes = [
  { path: '', component: IndexComponent, resolve: { userData: ToolbarResolverService } },
  { path: 'photocards/:user', component: PhotocardsComponent, resolve: { data: PhotocardsResolverService, userData: ToolbarResolverService } },
  { path: 'leaderboard', component: LeaderboardComponent, resolve: { data: LeaderboardResolverService, userData: ToolbarResolverService } },
  { path: 'login', component: LoginComponent, resolve: { userData: ToolbarResolverService } },
  { path: 'profile', component: ProfileComponent, resolve: { userData: ToolbarResolverService } },
  { path: 'overlay/combat', component: CombatComponent, resolve: { userData: ToolbarResolverService } },
  { path: 'marketplace', component: MarketplaceComponent, resolve: { data: MarketplaceResolverService, userData: ToolbarResolverService } }
];
