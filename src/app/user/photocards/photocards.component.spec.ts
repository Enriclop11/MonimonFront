import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotocardsComponent } from './photocards.component';

describe('PhotocardsComponent', () => {
  let component: PhotocardsComponent;
  let fixture: ComponentFixture<PhotocardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotocardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotocardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
