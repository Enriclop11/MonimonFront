import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiMonitasService {

  private apiUrl = 'https://kpopcardbot.onrender.com/'; // Replace with your API URL
  //private apiUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  getAllPhotocards(): Observable<any> {
    return this.http.get(this.apiUrl + 'pokemons');
  }

  getUserInfo(user: string): Observable<any> {
    return this.http.get(this.apiUrl + 'users/' + user);
  }

  getAllUsers(): Observable<any> {
    return this.http.get(this.apiUrl + 'users');
  }

  getToken(username: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl + 'token', { username, password }, { responseType: 'json' });
  }

  getMyUser(token: string): Observable<any> {
    return this.http.post(this.apiUrl + 'myuser',"" , {headers: {Authorization: 'Bearer ' + token}});
  }

  setPassword(token: string, password: string): Observable<any> {
    console.log('setting password ' + password + ' ' + token);
    return this.http.post(this.apiUrl + 'changePassword', {password}, {headers: {Authorization: 'Bearer ' + token}, responseType: 'json'});
  }

  setSelectedCard(token: string, cardId: number): Observable<any> {
    return this.http.post(this.apiUrl + 'selectCard', {cardId}, {headers: {Authorization: 'Bearer ' + token}});
  }

  deleteCard(token: string, cardId: number): Observable<any> {
    return this.http.delete(this.apiUrl + 'deleteCard/' + cardId, {headers: {Authorization: 'Bearer ' + token}});
  }

  sendLoginTwitch(code: string): Observable<any> {
    return this.http.post(this.apiUrl + 'loginTwitch', {code}, { responseType: 'json' });
  }

}
