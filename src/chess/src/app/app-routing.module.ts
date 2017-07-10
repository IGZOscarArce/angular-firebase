import { NgModule } from '@angular/core';
import {
  RouterModule,
  NavigationEnd,
  Router,
  Routes
} from '@angular/router';
import { AuthGuard } from './auth-guard.service';
import { GameGuard } from './game-guard.service';

import { ChessboardComponent } from './chess/chessboard/chessboard.component';
import { ChallangeComponent } from './challange/challange.component';
import { GameDetailComponent } from './game/game-detail.component';
import { GameListComponent } from './game/game-list.component';

const appRoutes: Routes = [
  {
    path: 'challange',
    canActivate: [ AuthGuard ],
    component: ChallangeComponent
  },
  {
    path: 'game/:id',
    canActivate: [ AuthGuard, GameGuard ],
    component: GameDetailComponent
  },
  {
    path: 'game',
    canActivate: [ AuthGuard ],
    component: GameListComponent
  },
  {
    path: '',
    redirectTo: '/challange',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ],
  providers: [ AuthGuard, GameGuard ]
})
export class AppRoutingModule {

  constructor(private router: Router) { }

}
