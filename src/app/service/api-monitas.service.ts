import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment} from '../../environments/environment';
import {Command} from '../models/command';
import {Reward} from '../models/reward';
import {EventObject} from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class ApiMonitasService {

  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  getUserInfo(user: string): Observable<any> {
    return this.http.get(this.apiUrl + 'users/' + user);
  }

  getAllUsers(): Observable<any> {
    return this.http.get(this.apiUrl + 'users');
  }

  getToken(username: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl + 'token', {username, password}, {responseType: 'json'});
  }

  getMyUser(token: string): Observable<any> {
    return this.http.post(this.apiUrl + 'myuser', "", {headers: {Authorization: 'Bearer ' + token}});
  }

  setPassword(token: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl + 'changePassword', {password}, {
      headers: {Authorization: 'Bearer ' + token},
      responseType: 'json'
    });
  }

  setSelectedCard(token: string, cardId: number): Observable<any> {
    return this.http.post(this.apiUrl + 'selectCard', {cardId}, {headers: {Authorization: 'Bearer ' + token}});
  }

  deleteCard(token: string, cardId: number): Observable<any> {
    return this.http.delete(this.apiUrl + 'deleteCard/' + cardId, {headers: {Authorization: 'Bearer ' + token}});
  }

  sendLoginTwitch(code: string): Observable<any> {
    return this.http.post(this.apiUrl + 'loginTwitch', {code}, {responseType: 'json'});
  }

  getCardPrice(cardId: number): Observable<any> {
    return this.http.get(this.apiUrl + 'photoCards/price/' + cardId);
  }

  getMarketplace(): Observable<any> {
    return this.http.get(this.apiUrl + 'marketplace');
  }

  offerMarketplace(cardId: number, price: number, token: string): Observable<any> {
    return this.http.post(this.apiUrl + 'marketplace/offer', {
      cardId,
      price
    }, {headers: {Authorization: 'Bearer ' + token}, responseType: 'json'});
  }

  buyMarketplace(offerId: number, token: string): Observable<any> {
    return this.http.post(this.apiUrl + 'marketplace/buy', {
      offerId
    }, {headers: {Authorization: 'Bearer ' + token}, responseType: 'json'});
  }

  deleteMarketplace(offerId: number, token: string): Observable<any> {
    return this.http.delete(this.apiUrl + 'marketplace/delete/' + offerId, {headers: {Authorization: 'Bearer ' + token}});
  }

  getCommands(token: string): Observable<any> {
    return this.http.get(this.apiUrl + 'admin/commands', {headers: {Authorization: 'Bearer ' + token}});
  }

  getRewards(token: string): Observable<any> {
    return this.http.get(this.apiUrl + 'admin/rewards', {headers: {Authorization: 'Bearer ' + token}});
  }

  getEvents(token: string): Observable<any> {
    return this.http.get(this.apiUrl + 'admin/events', {headers: {Authorization: 'Bearer ' + token}});
  }

  saveCommand(token: string, command: Command): Observable<any> {
    return this.http.post(
      this.apiUrl + 'admin/command/edit',
      command,
      {headers: {Authorization: 'Bearer ' + token}, responseType: 'json'}
    );
  }

  saveReward(token: string, reward: Reward): Observable<any> {
    return this.http.post(
      this.apiUrl + 'admin/reward/edit',
      reward,
      {headers: {Authorization: 'Bearer ' + token}, responseType: 'json'}
    );
  }

  saveEvent(token: string, event:EventObject): Observable<any> {
    return this.http.post(
      this.apiUrl + 'admin/event/edit',
      event,
      {headers: {Authorization: 'Bearer ' + token}, responseType: 'json'}
    );
  }
}
