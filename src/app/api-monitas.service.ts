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

  getPhotocardById(id: number): Observable<any> {
    return this.http.get(this.apiUrl + 'pokemons/' + id);
  }

  getAllUsers(): Observable<any> {
    return this.http.get(this.apiUrl + 'users');
  }

}
