import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiMonitasService } from '../../service/api-monitas.service';

@Injectable({
  providedIn: 'root'
})
export class AdminPanelResolverService implements Resolve<any> {
  constructor(private readonly apiMonitasService: ApiMonitasService) {}

  resolve(): Observable<any> {
    const token = localStorage.getItem('token') ?? '';
    if (token === '') {
      return new Observable((observer) => {
        observer.next(null);
        observer.complete();
      });
    }

    let commands = this.apiMonitasService.getCommands(token);
    let rewards = this.apiMonitasService.getRewards(token);
    let events = this.apiMonitasService.getEvents(token);

    return new Observable((observer) => {
      commands.subscribe((commandsData) => {
        rewards.subscribe((rewardsData) => {
          events.subscribe((eventsData) => {
            observer.next({ commands: commandsData, rewards: rewardsData, events: eventsData });
            observer.complete();
          });
        });
      });
    });
  }
}
