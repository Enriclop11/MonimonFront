import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from '../../settings/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { ToolbarComponent } from '../../settings/toolbar/toolbar.component';
import { FormsModule } from '@angular/forms';
import { ApiMonitasService } from '../../service/api-monitas.service';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-photocards',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, ToolbarComponent, FormsModule, MatProgressSpinner],
  templateUrl: './photocards.component.html',
  styleUrls: ['./photocards.component.css']
})
export class PhotocardsComponent implements OnInit {
  user: string = '';
  token: string = '';
  originalData: any = {
    username: '',
    photoCards: []
  }
  data: any = {
    username: '',
    photoCards: []
  };
  sortCriteria: string = 'index';
  myPage: boolean = false;
  searchName: any;

  constructor(
    private readonly apiMonitasService: ApiMonitasService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.data = data['data'];
      this.originalData = { ...this.data };
      this.myPage = data['data'].myPage;
      this.token = localStorage.getItem('token') || '';
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

  async confirmDelete(card: any, price: number): Promise<boolean> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {
        title: 'Confirmar Eliminación',
        message: 'Estás seguro de que deseas eliminar la carta de ' + card.name + ' por ' + price + ' monedas?',
        showCancelButton: true
      }
    });

    const result = await firstValueFrom(dialogRef.afterClosed());
    return result === true;
  }

  async deleteCard(card: any) {
    let priceHttp = this.apiMonitasService.getCardPrice(card.id);
    let price = await firstValueFrom(priceHttp);

    const confirmed = await this.confirmDelete(card, price);
    if (confirmed) {
      this.apiMonitasService.deleteCard(this.token, card.id).subscribe({
        next: (data) => {
          this.dialog.open(ConfirmDialogComponent, {
            width: '250px',
            data: {
              title: 'Carta Eliminada',
              message: 'La carta de ' + card.name + ' ha sido eliminada',
              showCancelButton: false
            }
          });

          this.data.score += price;
          this.data.photoCards = this.data.photoCards.filter((item: any) => item.id !== card.id);
        },
        error: (error) => {
          alert('Error deleting card');
        }
      });
    }
  }

  selectCard(card: any) {
    this.apiMonitasService.setSelectedCard(this.token, card.id).subscribe({
      next: (data) => {
        this.dialog.open(ConfirmDialogComponent, {
          width: '250px',
          data: {
            title: 'Carta Seleccionada',
            message: 'La carta de ' + card.name + ' ha sido seleccionada',
            showCancelButton: false
          }
        });
      },
      error: (error) => {
        alert('Error selecting card');
      }
    });
  }

  search(event: any) {
    this.searchName = event.target.value.toLowerCase();

    if (this.searchName === '') {
      this.data.photoCards = [...this.originalData.photoCards];
    } else {
      this.data.photoCards = this.originalData.photoCards.filter((item: any) => {
        return item.name.toLowerCase().includes(this.searchName) || item.band.toLowerCase().includes(this.searchName);
      });
    }

    this.sortPhotoCards({ target: { value: this.sortCriteria } });
  }

  async offerCard(card: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {
        title: 'Offer Card',
        message: 'Enter the price for the card:',
        showCancelButton: true,
        showInput: true
      }
    });

    const result = await firstValueFrom(dialogRef.afterClosed());
    if (result.confirmed) {
      const price = parseFloat(result.inputValue);
      if (!isNaN(price)) {
        this.apiMonitasService.offerMarketplace(card.id, price, this.token).subscribe({
          next: (data) => {
            this.dialog.open(ConfirmDialogComponent, {
              width: '250px',
              data: {
                title: 'Card Offered',
                message: 'The card has been offered for ' + price + ' coins.',
                showCancelButton: false
              }
            });
          },
          error: (error) => {
            console.log(error);
            alert('Error offering card');
          }
        });
      } else {
        alert('Invalid price entered');
      }
    }
  }
}
