import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {

  goToPhotocards(): void {
    let searchTerm = (<HTMLInputElement>document.getElementById('searchTerm')).value;
    if (searchTerm) {
      window.location.href = '/photocards/' + searchTerm;
    }
  }
}
