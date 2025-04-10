import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ApiMonitasService } from '../../service/api-monitas.service';

@Injectable({
  providedIn: 'root'
})
export class ToolbarResolverService implements Resolve<any> {
  constructor(private readonly apiMonitasService: ApiMonitasService) {}

  resolve(): Observable<any> {
    const token = localStorage.getItem('token') ?? '';
    if (token !== '') {
      this.apiMonitasService.getMyUser(token).subscribe({
        next: (response) => {
          return response;
        },
        error: (error) => {
          localStorage.removeItem('token');
          return of(null);
        }
      });
    }
    return of(null);
  }
}
