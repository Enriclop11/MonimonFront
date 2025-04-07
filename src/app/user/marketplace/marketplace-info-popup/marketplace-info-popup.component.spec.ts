import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketplaceInfoPopupComponent } from './marketplace-info-popup.component';

describe('MarketplaceInfoPopupComponent', () => {
  let component: MarketplaceInfoPopupComponent;
  let fixture: ComponentFixture<MarketplaceInfoPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketplaceInfoPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketplaceInfoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
