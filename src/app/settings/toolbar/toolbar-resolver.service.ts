import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiMonitasService } from '../../service/api-monitas.service';

@Injectable({
  providedIn: 'root'
})
export class ToolbarResolverService implements Resolve<any> {
  constructor(private readonly apiMonitasService: ApiMonitasService) {}

  resolve(): Observable<any> {
    const token = localStorage.getItem('token') ?? '';
    if (token !== '') {
      return this.apiMonitasService.getMyUser(token).pipe(
        map((response) => {
          console.log('ToolbarResolverService response:', response);
          return response;
        }),
        catchError((error) => {
          console.error('Error in ToolbarResolverService:', error);
          localStorage.removeItem('token');
          return of(null);
        })
      );
    }
    return of(null);
  }
}
