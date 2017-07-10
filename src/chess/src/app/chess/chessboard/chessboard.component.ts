import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  AngularFireDatabase,
  FirebaseListObservable,
  FirebaseObjectObservable
} from 'angularfire2/database';
import * as chess from 'angular-chess';

@Component({
  selector: 'app-chessboard',
  templateUrl: './chessboard.component.html',
  styleUrls: ['./chessboard.component.css']
})
export class ChessboardComponent implements OnInit {

  myGame$: FirebaseObjectObservable<any>;
  myChess;
  status;
  config;
  position: string;

  constructor(private route: ActivatedRoute,
              private db: AngularFireDatabase) {
    let id = this.route.snapshot.paramMap.get('id');
    this.myGame$ = db.object(`/games/${id}`);
    this.myChess = chess(this.position);
  }

  @Input('position') incomingPosition: string;
  @Input('role') myColor: string;

  ngOnInit() {
    this.config = {
      pieceTheme: '/assets/img/chesspieces/wikipedia/{piece}.png',
      draggable: true,
      moveSpeed: 'fast',
      onDragStart: this.checkTurn.bind(this),
      onDrop: this.checkMove.bind(this),
      onSnapEnd: this.updatePosition.bind(this),
      orientation: this.myColor === 'b' ? 'black' : 'white'
    };
  }

  ngOnChanges() {
    if (!this.incomingPosition) return this.myChess.reset();
    if (this.myChess.load(this.incomingPosition)) {
      this.updatePosition();
      this.updateStatus();
    } else {
      console.error('[ERROR] Loading FEN position from server', this.incomingPosition);
    }
  }

  checkTurn(source, piece, position, orientation) {
    return !this.myChess.game_over() &&
      this.myChess.turn() === this.myColor &&
      this.myColor === piece.charAt(0)
  }

  checkMove(source, target) {
    var move = this.myChess.move({
      from: source,
      to: target,
      promotion: 'q' // TODO: user choiced piece
    });
    if (move) {
      if (this.updateGame(this.myChess.fen())) {
        this.updateStatus();
      } else {
        console.error('ERROR ON MOVE', source, target);
        return 'snapback';
      }
    } else return 'snapback';
  }

  updatePosition() {
    this.position = this.myChess.fen();
  }

  updateStatus() {
    let moveColor = this.myChess.turn() === 'b' ? 'Black' : 'White';

    if (this.myChess.in_checkmate()) {
      this.status = `Game over, ${moveColor} is in checkmate.`;
    } else if (this.myChess.in_draw()) {
      this.status = 'Game over, drawn position';
    } else {
      this.status = this.myChess.in_check()
        ? `${moveColor} to move, ${moveColor} is in check`
        : `${moveColor} to move`;
    }
  }

  async updateGame(fen: string): Promise<boolean> {
    try {
      await this.myGame$.update({fen: this.myChess.fen()});
      return true;
    } catch (error) {
      return false;
    }
  }

}
