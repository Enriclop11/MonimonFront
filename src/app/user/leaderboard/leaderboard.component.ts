import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {ToolbarComponent} from "../../settings/toolbar/toolbar.component";
import {ActivatedRoute} from '@angular/router';

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
  leaderBoard: any = [];
  sortCriteria: string = 'photocards';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.data = data['data'];
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

    this.leaderBoard = this.data.slice(0, 20);
  }

  viewAlbum(user: any): void {
    //navigate to /photocards/:user
    window.location.href = `/photocards/${user}`;
  }

}
