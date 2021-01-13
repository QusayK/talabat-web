import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';
import { TokenStorageService } from '../../../services/token-storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('form') form;

  constructor(private auth: AuthService,
              private token: TokenStorageService,
              private router: Router
              ) { }

  ngOnInit(): void {

  }

  onSubmit() {
    let value = this.form.value;
    this.auth.login({email: value.email, password: value.password}).subscribe((data: HttpResponse<any>) => {
      this.token.saveToken(data.body.token);
      this.token.saveUser({id: data.body.id, role: data.body.role});

      this.router.navigate(['/']);
    });
  }
}
