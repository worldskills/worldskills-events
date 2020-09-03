import {Component, OnInit} from '@angular/core';
import {NgAuthService, RedirectHandler, User} from "@worldskills/worldskills-angular-lib";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser: User;

  constructor(
    private authService: NgAuthService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(currentUser => (this.currentUser = currentUser));
    const handler = new RedirectHandler(this.authService, this.router);
    handler.redirectOrReturn(['/events'], console.error);
  }

}
