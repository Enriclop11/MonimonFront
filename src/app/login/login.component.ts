import {Component, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiMonitasService} from '../api-monitas.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  username: any;
  password: any;
  errorMessage: any;

  constructor(
    private readonly apiMonitasService: ApiMonitasService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      window.location.href = '/profile';
    }
  }


  login() {
    this.apiMonitasService.getToken(this.username, this.password).subscribe({
      next: (data) => {
        console.log('Got token:', data.token);
        localStorage.setItem('token', data.token);

        window.location.href = 'profile';
      },
      error: (error) => {
        console.error('Error:', error);
        this.errorMessage = error.error.message;
      }
    });
  }

}
