import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import fade in animation
import { fadeInAnimation } from '../_animations/index';

@Component({
  selector: 'app-botao-decisao',
  templateUrl: './botao-decisao.component.html',
  styleUrls: ['./botao-decisao.component.css'],
})
export class BotaoDecisaoComponent implements OnInit {

  @Output() onVoted = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  public verificaProgresso() {
    this.onVoted.emit();
    //console.log(this.progresso)
  }

}
