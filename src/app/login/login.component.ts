import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginError: boolean = false;

  constructor(private router: Router) {}

  onLogin(form: any) {
    const username = form.value.username;
    const password = form.value.password;

    
    if (username === 'admin' && password === 'admin') {
      console.log("udername",username);
      this.router.navigate(['/shop'],{queryParams:{username : username}});  

    } else {
      this.loginError = true;  
    }
  }
}
