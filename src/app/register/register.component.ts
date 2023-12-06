import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user = { username: '', password: '' };
  registrationMessage = "";
  constructor(private authService: AuthService) {}

  register() {
    this.authService.register(this.user).subscribe(
      (response) => {
        console.log('Registration successful:', response);
        this.registrationMessage = "Registration Successful!"
        // Handle success, e.g., navigate to login page
      },
      (error) => {
        console.error('Registration failed:', error);
        this.registrationMessage = "Registration failed!"
        // Handle error, e.g., display an error message
    
      }
    );
  }
}