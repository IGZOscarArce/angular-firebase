import { Directive, ElementRef, Input } from '@angular/core';
import * as chessboard from 'angular-chessboard';

@Directive({
  selector: '[appChessboard]'
})
export class ChessboardDirective {

  myChessBoard: any;
  elm;

  constructor(el: ElementRef) {
    this.elm = el;
  }

  @Input() config: string | any;
  @Input() position: string = 'start';

  ngOnInit() {
    this.myChessBoard = chessboard(this.elm.nativeElement, this.config);
    setTimeout(_ => this.myChessBoard.position(this.position, true), 0);
  }

  ngOnChanges() {
    if (this.myChessBoard) this.myChessBoard.position(this.position);
  }

}
