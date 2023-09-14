import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  username = ''
  password = ''

  errorMsg = 'Invalid details'
  signInErrorMsg = false;

  constructor(
    private router: Router){

  }

  signin(){
    if(this.username === 'Joe' && this.password === 'pass'){
      this.signInErrorMsg = false;
      this.router.navigate(['dashboard']);
      console.log(this.username, this.password)
    } else {
      this.signInErrorMsg = true;
      console.log(this.username, this.password)
    }
  }

}
