import {Component, input, OnInit} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import {MatFormField} from '@angular/material/form-field';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatAnchor, MatIconButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NgIf, NgOptimizedImage} from '@angular/common';
import {ApiMonitasService} from '../../service/api-monitas.service';

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
    NgOptimizedImage,
    NgIf
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent implements OnInit {

  username: string = 'LOGIN';
  image: string = '';

  constructor(
    private readonly router: Router,
    private readonly apiMonitasService: ApiMonitasService,
    private readonly route: ActivatedRoute
) { }

  onSearch() {
    const input = document.querySelector('input[name="searchterm"]') as HTMLInputElement;
    const searchTerm = input.value.trim();
    if (searchTerm) {
      this.router.navigate([`/photocards/${searchTerm}`]);
    }
  }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      const userData = data['userData'];
      this.username = userData.username;
      this.image = userData.avatar;
    });
  }

}
