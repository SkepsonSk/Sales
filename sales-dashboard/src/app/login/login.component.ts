import { Component, OnInit } from '@angular/core';
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public username: string = '';
  public password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  tryLogin(): void {

    this.authService.authenticate(this.username, this.password)
      .subscribe( (authData: any) => {

        if (authData.ok) {
          alert('Logged In!');
          this.router.navigate(['']);
        }

      } );

  }

}
