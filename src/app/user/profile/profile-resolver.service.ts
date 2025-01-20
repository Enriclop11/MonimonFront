import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ApiMonitasService } from '../../service/api-monitas.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileResolverService implements Resolve<any> {
  constructor(private apiMonitasService: ApiMonitasService) {}

  resolve(): Observable<any> {
    const token = localStorage.getItem('token') || '';
    if (token !== '') {
      return this.apiMonitasService.getMyUser(token);
    }
    return of(null);
  }
}
