import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private af: AngularFireAuth,
              private router: Router) {}

  canActivate(): Promise<boolean> {
    if (this.af.auth.currentUser) {
      return Promise.resolve(true);
    }
    else {
      return <Promise<boolean>>this.af.auth
        .signInAnonymously()
        .then(_ => true);
    }
  }
}
