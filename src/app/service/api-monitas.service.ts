import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment} from '../../environments/environment';

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
    console.log('setting password ' + password + ' ' + token);
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

}
