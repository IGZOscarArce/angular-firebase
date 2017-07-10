import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AngularFireDatabase,
  FirebaseListObservable,
  FirebaseObjectObservable
} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as chess from 'angular-chess';

@Component({
  selector: 'app-challange',
  templateUrl: './challange.component.html',
  styleUrls: ['./challange.component.css']
})
export class ChallangeComponent implements OnInit {

  myUid: string;
  challanges$: FirebaseListObservable<any[]>;
  myChallange$: FirebaseObjectObservable<any>;
  myChallangeSusbscription: any;
  myGame$: FirebaseObjectObservable<any>;
  myChallange = {
    color: '',
    time: 300,
    increase: 0,
    challenging: null
  };

  constructor(private af: AngularFireAuth,
              private router: Router,
              private db: AngularFireDatabase) {
    this.myUid = this.af.auth.currentUser.uid;
    this.challanges$ = db.list('/challanges');
    this.myChallange$ = db.object(`/challanges/${this.myUid}`);
    this.myChallange.challenging = this.af.auth.currentUser.isAnonymous
      ? `Anonymous-${this.myUid}`
      : this.af.auth.currentUser.displayName;
    this.myGame$ = db.object(`/games/${this.myUid}`);
  }

  ngOnInit() {
  }

  acceptChallenge(challange: any) {
    challange.color = challange.color ||
      Math.floor(Math.random()*2) ? 'w' : 'b'
    this.db
      .object(`/games/${challange.$key}`)
      .set({
        white: challange.color === 'w' ? challange.challenging : `Anonymous-${this.myUid}`,
        white_uid: challange.color === 'w' ? challange.$key : this.myUid,
        black: challange.color === 'b' ? challange.challenging : `Anonymous-${this.myUid}`,
        black_uid: challange.color === 'b' ? challange.$key : this.myUid,
        fen: chess().fen(),
        time: challange.time,
        increase: challange.increase,
        w_time: challange.time,
        b_time: challange.time
      })
      .then(_ => {
        this.myChallange$.remove();
        this.db
          .object(`/challanges/${challange.$key}`)
          .remove()
          .then(_ => this.router.navigate(['/game', challange.$key]))
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  }

  createChallenge() {
    this.myChallange$.set(this.myChallange);
    this.myChallangeSusbscription = this.myChallange$.subscribe(challange => {
      if (!challange.$exists()) {
        this.router.navigate(['/game', this.myUid]);
      } else {
        this.myChallange = challange.$exists() ? challange : this.myChallange;
      }
    });
  }

  removeChallenge() {
    this.myChallangeSusbscription.unsubscribe();
    this.myChallange$.remove();
  }

}
