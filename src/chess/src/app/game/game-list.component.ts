import { Component, OnInit } from '@angular/core';
import {
  AngularFireDatabase,
  FirebaseListObservable,
  FirebaseObjectObservable
} from 'angularfire2/database';
import { Game } from './game.model';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  games$: FirebaseListObservable<Game[]>;

  constructor(private db: AngularFireDatabase) {
    this.games$ = db.list('/games');
  }

  ngOnInit() {
  }

}
