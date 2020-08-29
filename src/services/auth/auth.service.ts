import {Injectable} from '@angular/core';
import {AuthService as WsAuthService, NgAuthService as UserService, User} from '@worldskills/worldskills-angular-lib';
import {BehaviorSubject} from 'rxjs';
import {share} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

export interface AuthStatus {
  isLoggedIn: boolean;
  user: User;
  authenticated: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authStatus = new BehaviorSubject<AuthStatus>({
    isLoggedIn: false,
    user: undefined,
    authenticated: false,
  });

  constructor(
    private authService: WsAuthService,
    private userService: UserService,
    private http: HttpClient,
  ) {
    this.authStatus.next({
      isLoggedIn: this.userService.isLoggedIn(),
      user: undefined,
      authenticated: false,
    });
    this.userService.currentUser.subscribe((user: User) => {
      this.authStatus.next({
        isLoggedIn: true,
        user,
        authenticated: true
      });
    });
    if (this.userService.isLoggedIn()) {
      this.userService.loadUserProfile(user => {
        if (this.userService.isLoggedIn()) {
          this.logout().subscribe({
            error: () => {
              this.login();
            },
            next: () => {
              this.login();
            }
          });
        } else {
          this.login();
        }
      }, err => console.error(err));
    }
  }

  login() {
    this.userService.login();
  }

  logout() {
    const observable = this.authService.logout().pipe(share());
    observable.subscribe({
      complete: () => {
        this.authStatus.next({
          isLoggedIn: false,
          user: undefined,
          authenticated: false
        });
      }
    });
    return observable;
  }

}
