import {Component, OnInit} from '@angular/core';
import {ToolbarComponent} from "../settings/toolbar/toolbar.component";

@Component({
  selector: 'app-index',
  standalone: true,
    imports: [
        ToolbarComponent
    ],
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
