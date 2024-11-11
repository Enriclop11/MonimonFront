import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PhotocardsComponent } from './user/photocards/photocards.component';
import { IndexComponent } from './index/index.component';
import { ToolbarComponent } from './settings/toolbar/toolbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, PhotocardsComponent, IndexComponent, ToolbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Monimon';
}
