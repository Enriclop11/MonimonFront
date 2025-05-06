import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA, MatDialog,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {NgIf} from '@angular/common';
import {ConfirmDialogComponent} from '../../../settings/confirm-dialog/confirm-dialog.component';
import {ApiMonitasService} from '../../../service/api-monitas.service';

@Component({
  selector: 'app-marketplace-info-popup',
  templateUrl: './marketplace-info-popup.component.html',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    MatInput,
    NgIf
  ],
  styleUrls: ['./marketplace-info-popup.component.css']
})
export class MarketplaceInfoPopupComponent {
  card: any;
  logedIn: boolean = false;
  user: any;
  token: string = '';

  constructor(
    public dialogRef: MatDialogRef<MarketplaceInfoPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly dialog: MatDialog,
    private readonly apiMonitasService: ApiMonitasService
  ) {
    this.card = data.card;
    this.logedIn = data.logedIn;
    this.user = data.user;
    this.token = data.token;
  }

  closePopup(): void {
    this.dialogRef.close();
  }

  buyCard(card: any) {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Comprar carta',
        message: `Estas seguro que deseas comprar la carta ${card.name} por ${card.price} monedas?`,
        showCancelButton: true
      }
    }).afterClosed().subscribe({
      next: (result: any) => {
        if (result) {
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
              this.closePopup();
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
      next: (result: any) => {
        if (result) {
          this.apiMonitasService.deleteMarketplace(offer.id, this.token).subscribe({
            next: (data) => {
              this.closePopup();
            },
            error: (error) => {
              console.error('Failed to return card:', error);
            }
          });
        }
      }
    });
  }
}
