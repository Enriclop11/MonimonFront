import {Component, OnInit} from '@angular/core';
import {ToolbarComponent} from "../../settings/toolbar/toolbar.component";
import {NgForOf, NgIf} from '@angular/common';
import {ApiMonitasService} from '../../service/api-monitas.service';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../settings/confirm-dialog/confirm-dialog.component';
import {ActivatedRoute} from '@angular/router';

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
      console.log(data);
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

  buyCard(card: any) {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Comprar carta',
        message: `Estas seguro que deseas comprar la carta ${card.name} por ${card.price} monedas?`,
        showCancelButton: true
      }
    }).afterClosed().subscribe({
      next: (result) => {
        if (result) {

          console.log('User points:', this.user.score);
          console.log('Card price:', card.price);
          if (this.user.score < card.price) {
            this.dialog.open(ConfirmDialogComponent, {
              data: {
                title: 'Comprar carta',
                message: `No tienes suficientes monedas para comprar la carta ${card.name}.`
              }
            });
            return;
          }

          this.apiMonitasService.buyMarketplace(card.id, this.token).subscribe({
            next: (data) => {
              this.getNewInfo();
            },
            error: (error) => {
              console.error('Failed to buy card:', error);
            }
          });
        }
      }
    });
  }

  returnCard(offer: any) {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Retirar carta',
        message: `Estas seguro que deseas retirar la carta ${offer.name} del mercado?`,
        showCancelButton: true
      }
    }).afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.apiMonitasService.deleteMarketplace(offer.id, this.token).subscribe({
            next: (data) => {
              this.getNewInfo();
            },
            error: (error) => {
              console.error('Failed to return card:', error);
            }
          });
        }
      }
    });
  }

  search(event: any) {
    this.searchName = event.target.value.toLowerCase();

    if (this.searchName === '') {
      // If the searchName is empty, reset to originalData
      this.data.photoCards = [...this.originalData.photoCards];
    } else {
      // Filter the photoCards array by containing the searchName in either name or band
      this.data.photoCards = this.originalData.photoCards.filter((item: any) => {
        return item.name.toLowerCase().includes(this.searchName) || item.band.toLowerCase().includes(this.searchName);
      });
    }

    this.sortPhotoCards({ target: { value: this.sortCriteria } });
  }

}
