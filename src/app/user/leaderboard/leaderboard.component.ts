import {Component, OnInit} from '@angular/core';
import {ApiMonitasService} from '../../api-monitas.service';
import {NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {ToolbarComponent} from "../../settings/toolbar/toolbar.component";

@Component({
  selector: 'app-leaderboard',
  standalone: true,
    imports: [
        NgForOf,
        NgOptimizedImage,
        NgIf,
        ToolbarComponent
    ],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.css'
})
export class LeaderboardComponent implements OnInit {
  data: any = [];

  //we can sort the data by different criteria by the number of photocards or the score, we have to know what the user wants to sort by
  sortCriteria: string = 'photocards';

  constructor(private apiMonitasService: ApiMonitasService) {}

  ngOnInit(): void {
    this.apiMonitasService.getAllUsers().subscribe((data) => {
      this.data = data;
      this.sortUsers();
    });
  }

  changeSortCriteria(criteria: string): void {
    this.sortCriteria = criteria;
    this.sortUsers();
  }

  sortUsers(): void {
    this.data.sort((a: any, b: any) => {
      switch (this.sortCriteria) {
        case 'photocards':
          return (b.photoCards || 0) - (a.photoCards || 0);
        case 'score':
          return b.score - a.score;
        default:
          return 0;
      }
    });
  }

  viewAlbum(user: any): void {
    //navigate to /photocards/:user
    window.location.href = `/photocards/${user}`;
  }

}
