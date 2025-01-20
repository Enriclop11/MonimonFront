import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiMonitasService } from '../../service/api-monitas.service';

@Injectable({
  providedIn: 'root'
})
export class MarketplaceResolverService implements Resolve<any> {
  constructor(private apiMonitasService: ApiMonitasService) {}

  resolve(): Observable<any> {
    return this.apiMonitasService.getMarketplace();
  }
}
