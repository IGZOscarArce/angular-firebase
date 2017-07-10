import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  AngularFireDatabase,
  FirebaseListObservable,
  FirebaseObjectObservable
} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Game } from './game.model';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit {

  myGame$: FirebaseObjectObservable<Game>;
  position: string;
  role: string = '';

  constructor(private af: AngularFireAuth,
              private route: ActivatedRoute,
              private db: AngularFireDatabase) {
    let id = this.route.snapshot.paramMap.get('id');
    this.myGame$ = db.object(`/games/${id}`);
  }

  ngOnInit() {
    this.myGame$.subscribe(game => {
      if (game.white_uid === this.af.auth.currentUser.uid) this.role = 'w';
      else if (game.black_uid === this.af.auth.currentUser.uid) this.role = 'b';
      this.position = game.fen;
    });
  }

}
