import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = true;
  user_id: number;

  constructor(private token: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.token.getToken();
    this.user_id = this.token.getUser().id;
  }

  onLogOut() {
    this.token.logOut();

    this.router.navigate(['/auth']);
  }
}
