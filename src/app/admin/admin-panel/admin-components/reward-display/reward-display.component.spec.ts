import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardDisplayComponent } from './reward-display.component';

describe('RewardDisplayComponent', () => {
  let component: RewardDisplayComponent;
  let fixture: ComponentFixture<RewardDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RewardDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RewardDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
