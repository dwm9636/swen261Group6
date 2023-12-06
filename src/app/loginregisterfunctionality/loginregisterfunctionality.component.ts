import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './loginregisterfunctionality.component.html',
  styleUrls: ['./loginregisterfunctionality.component.css'],
})
export class LoginregisterfunctionalityComponent {
  user = { username: '', password: '' };
  loginMessage = "";
  constructor(private authService: AuthService) {}

  login() {
    this.authService.login(this.user).subscribe(
      (response) => {
        console.log('Login successful:', response);
        this.loginMessage = "Login Successful!"
        // Handle success, e.g., navigate to home page
      },
      (error) => {
        console.error('Login failed:', error);
        this.loginMessage = "Login Failed!"
        // Handle error, e.g., display an error message
      }
    );
  }
}