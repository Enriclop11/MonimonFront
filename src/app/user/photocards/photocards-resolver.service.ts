import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map, Observable, forkJoin, of } from 'rxjs';
import { ApiMonitasService } from '../../service/api-monitas.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PhotocardsResolverService implements Resolve<any> {
  constructor(private apiMonitasService: ApiMonitasService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const user = route.paramMap.get('user') || '';
    const token = localStorage.getItem('token') || '';

    const userInfo$ = this.apiMonitasService.getUserInfo(user).pipe(
      map(data => {
        data.photoCards = data.photoCards.map((item: any, index: number) => ({
          ...item,
          initialIndex: index
        }));
        return data;
      })
    );

    const myUser$ = this.apiMonitasService.getMyUser(token).pipe(
      catchError(() => of(null))
    );

    return forkJoin([userInfo$, myUser$]).pipe(
      map(([userInfo, myUser]) => {
        const myPage = myUser && myUser.username === user;
        return { ...userInfo, myPage };
      })
    );
  }
}
