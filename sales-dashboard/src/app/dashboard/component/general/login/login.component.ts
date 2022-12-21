import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../service/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastService} from "../../../service/toast/toast.service";

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
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {}

  tryLogin(): boolean {
    this.route.queryParams
      .subscribe( params => {

        let url = '';
        if (params['href'] != null) {
          url = params['href'];
        }

        this.authService.authenticate(this.username, this.password)
          .subscribe( (authData: any) => {

            if (authData.ok) {
              this.toastService.showToast('success', 'Logged in. Hello!');
              this.router.navigate([url]);
            }

          } );

    });
    return false;
  }

}
