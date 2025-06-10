import {Component, OnInit} from '@angular/core';
import {ToolbarComponent} from "../../settings/toolbar/toolbar.component";
import {NgForOf, NgIf} from '@angular/common';
import {ApiMonitasService} from '../../service/api-monitas.service';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../settings/confirm-dialog/confirm-dialog.component';
import {ActivatedRoute} from '@angular/router';
import {MarketplaceInfoPopupComponent} from './marketplace-info-popup/marketplace-info-popup.component';

@Component({
  selector: 'app-marketplace',
  standalone: true,
  imports: [
    ToolbarComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './marketplace.component.html',
  styleUrl: './marketplace.component.css'
})
export class MarketplaceComponent implements OnInit {
  user: any = {
    username: '',
    points: 0
  }
  token: string = '';
  originalData: any = {
  }
  data: any = {

  };
  sortCriteria: string = 'index';
  logedIn: boolean = false;
  searchName: any;

  constructor(
    private readonly apiMonitasService: ApiMonitasService,
    private readonly dialog: MatDialog,
    private readonly route: ActivatedRoute
) {}

  ngOnInit(): void {
    this.getInfo();
  }

  getInfo() {
    this.route.data.subscribe((data) => {
      this.originalData = data["data"] || { username: ''};

      this.originalData = this.originalData.map((item: any, index: number) => ({
        ...item,
        initialIndex: index
      }));

      this.data = this.originalData;
      this.user = data["userData"] || { username: '', points: 0 };
      if (this.user.username !== '') {
        this.logedIn = true;
      }

      this.token = localStorage.getItem('token') || '';
    });
  }

  getNewInfo() {
    this.apiMonitasService.getMarketplace().subscribe({
      next: (data) => {
        this.originalData = data;
        this.originalData = this.originalData.map((item: any, index: number) => ({
          ...item,
          initialIndex: index
        }));
        this.data = this.originalData;
      },
      error: (error) => {
        console.error('Failed to get user info:', error);
      }
    });
  }

  changeSortCriteria(criteria: string): void {
    this.sortCriteria = criteria;
    this.sortPhotoCards({ target: { value: criteria } });
  }

  sortPhotoCards(event: any): void {
    const criteria = event.target.value;
    this.data.sort((a: any, b: any) => {
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

  search(event: any) {
    this.searchName = event.target.value.toLowerCase();

    if (this.searchName === '') {
      // If the searchName is empty, reset to originalData
      this.data = [...this.originalData];
    } else {
      // Filter the photoCards array by containing the searchName in either name or band
      this.data = this.originalData.filter((item: any) => {
        return item.name.toLowerCase().includes(this.searchName) || item.band.toLowerCase().includes(this.searchName);
      });
    }

    this.sortPhotoCards({ target: { value: this.sortCriteria } });
  }

  openInfo(offer: any) {

    this.dialog.open(MarketplaceInfoPopupComponent, {
      width: '500px',
      data: {
        card: offer,
        logedIn: this.logedIn,
        token: this.token,
        user: this.user
      }
    }).afterClosed().subscribe({
      next: (result: any) => {
        if (result) {
          this.getNewInfo();
        }
      }
    });

  }
}
