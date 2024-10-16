import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiMonitasService } from '../api-monitas.service';

@Component({
  selector: 'app-photocards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './photocards.component.html',
  styleUrls: ['./photocards.component.css']
})
export class PhotocardsComponent implements OnInit {
  user: string = '';
  data: any = {
    username: '',
    photoCards: []
  };
  sortCriteria: string = 'index';

  constructor(
    private readonly apiMonitasService: ApiMonitasService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.user = params.get('user') || '';
      this.apiMonitasService.getUserInfo(this.user).subscribe(
        (data) => {
          if (Array.isArray(data.photoCards)) {
            this.data = data;
            this.data.photoCards = data.photoCards.map((item: any, index: number) => ({
              ...item,
              initialIndex: index
            }));
          } else {
            console.error('photoCards is not an array:', data.photoCards);
          }
        },
        (error) => {
          console.error('Failed to fetch user info:', error);
          this.router.navigate(['/']);
        }
      );
    });
  }

  changeSortCriteria(criteria: string): void {
    this.sortCriteria = criteria;
    this.sortPhotoCards({ target: { value: criteria } });
  }

  sortPhotoCards(event: any): void {
    const criteria = event.target.value;
    this.data.photoCards.sort((a: any, b: any) => {
      switch (criteria) {
        case 'index':
          return a.initialIndex - b.initialIndex;
        case 'idolID':
          return a.idolID - b.idolID;
        case 'group':
          return a.band.localeCompare(b.band);
        case 'attack':
          return b.attack - a.attack;
        case 'defense':
          return b.defense - a.defense;
        case 'hp':
          return b.hp - a.hp;
        default:
          return 0;
      }
    });
  }
}
