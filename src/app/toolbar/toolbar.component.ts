import { Component } from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import {MatFormField} from '@angular/material/form-field';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatAnchor, MatIconButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {Router, RouterLink} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    MatToolbar,
    MatIcon,
    MatFormField,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatIconButton,
    MatInput,
    MatAnchor,
    RouterLink,
    NgOptimizedImage
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {

  constructor(private router: Router) { }

  onSearch() {
    const input = document.querySelector('input[name="searchterm"]') as HTMLInputElement;
    const searchTerm = input.value.trim();
    if (searchTerm) {
      this.router.navigate([`/photocards/${searchTerm}`]);
    }
  }

}
