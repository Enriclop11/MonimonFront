import { Component, OnInit } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiMonitasService } from '../api-monitas.service';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {firstValueFrom} from 'rxjs';

@Component({
  selector: 'app-photocards',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './photocards.component.html',
  styleUrls: ['./photocards.component.css']
})
export class PhotocardsComponent implements OnInit {
  user: string = '';
  token: string = '';
  data: any = {
    username: '',
    photoCards: []
  };
  sortCriteria: string = 'index';
  myPage: boolean = false;

  constructor(
    private readonly apiMonitasService: ApiMonitasService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private dialog: MatDialog
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

    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token') || '';
      this.apiMonitasService.getMyUser(this.token).subscribe({
        next: (data) => {
          if (data.username === this.user) {
            this.myPage = true;
            console.log('This is my page');
          }
        },
        error: (error) => {
          console.error('Failed to fetch user info:', error);
        }
      });
    }
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

  async confirmDelete(): Promise<boolean> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {
        title: 'Confirmar Eliminación',
        message: '¿Estás seguro de que deseas eliminar esta carta?',
        showCancelButton: true
      }
    });

    const result = await firstValueFrom(dialogRef.afterClosed());
    return result === true;
  }

  async deleteCard(card: any) {
    const confirmed = await this.confirmDelete();
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
          })

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
}
