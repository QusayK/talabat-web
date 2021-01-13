import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';
import { TokenStorageService } from '../../../services/token-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @ViewChild('form') form;

  constructor(private auth: AuthService, private token: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    let value = this.form.value;
    this.auth.register({first_name: value.first_name, last_name: value.last_name, email: value.email, password: value.password, phone: value.phone}).subscribe((data: HttpResponse<any>) => {
      this.token.saveToken(data.body.token);
      this.token.saveUser({id: data.body.id, role: data.body.role});

      this.router.navigate(['/']);
    });
  }
}
