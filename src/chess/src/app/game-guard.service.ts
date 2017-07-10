import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Game } from './game/game.model';

import * as firebase from 'firebase/app';

@Injectable()
export class GameGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Promise<boolean> {
    return <Promise<boolean>>firebase
      .database()
      .ref(`/games/${route.params.id}`)
      .once('value')
      .then(snapshot => {
        let game = <Game>snapshot.val();
        if (game && game.white_uid && game.black_uid) return true;
        this.router.navigate(['game']);
        return false;
      });
  }
}
