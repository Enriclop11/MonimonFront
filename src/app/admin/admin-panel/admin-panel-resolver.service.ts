import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ApiMonitasService } from '../../service/api-monitas.service';
import {forkJoin, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminPanelResolverService implements Resolve<any> {
  constructor(private readonly apiMonitasService: ApiMonitasService) {}

  resolve(): Observable<any> {
    const token = localStorage.getItem('token') ?? '';
    if (token === '') {
      return of(null);
    }

    return forkJoin({
      commands: this.apiMonitasService.getCommands(token),
      rewards: this.apiMonitasService.getRewards(token),
      events: this.apiMonitasService.getEvents(token),
      discordCommands: this.apiMonitasService.getDiscordCommands(token)
    });
  }
}
