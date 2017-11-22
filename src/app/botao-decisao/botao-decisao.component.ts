import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

// import fade in animation
import { fadeInAnimation } from '../_animations/index';

import BotaoDecisao from '../shared/botao-decisao.model'
import {BOTAODECISAO} from '../botao-decisao/botao-decisao-mock'

@Component({
  selector: 'app-botao-decisao',
  templateUrl: './botao-decisao.component.html',
  styleUrls: ['./botao-decisao.component.css'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({ opacity: 0}),
          animate('500ms', style({ opacity: 1}))
        ]),
        transition(':leave', [
          style({ opacity: 1}),
          animate('500ms', style({ opacity: 0}))
        ])
      ]
    )
  ]
})
export class BotaoDecisaoComponent implements OnInit {

  @Output() onVoted = new EventEmitter<boolean>();
  @Output() ClicarBotaoDecisao = new EventEmitter<number>();
  public cargaDeBotoes: BotaoDecisao[] = BOTAODECISAO
  public botaoCarregado : BotaoDecisao[] =[]
  public ContadorProgressoBotao: number = 0

  @Input() flagShowButton: boolean

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){
    if (this.flagShowButton ==true){this.CarregarBotao()}    
  }

  public CarregarBotao(){
    
    //Limpa array para poder iniciar novamente a construção de botões
    if(this.botaoCarregado.length !== 0){
      this.botaoCarregado.length = 0
    }

    let idinicial = this.cargaDeBotoes[this.ContadorProgressoBotao].id
    //Se chegou na ultima historia
    if(this.cargaDeBotoes[this.ContadorProgressoBotao].id === this.cargaDeBotoes[this.cargaDeBotoes.length-1].id){
      this.botaoCarregado.push({
        id: 0,
        texto: 'Fim!',
        iddecisao: 0
      })
    }
    else{
      for(let contador:number = this.ContadorProgressoBotao; this.cargaDeBotoes[contador].id == idinicial; contador++){

        this.botaoCarregado.push({
          id: this.cargaDeBotoes[contador].id,
          texto: this.cargaDeBotoes[contador].texto,
          iddecisao: this.cargaDeBotoes[contador].iddecisao
        })
        this.ContadorProgressoBotao++
      }
    }
  }

  public verificaProgresso(iddecisao :number) {
    this.ClicarBotaoDecisao.emit(iddecisao)
  }

}
