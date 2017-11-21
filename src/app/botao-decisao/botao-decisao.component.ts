import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import fade in animation
import { fadeInAnimation } from '../_animations/index';

import BotaoDecisao from '../shared/botao-decisao.model'
import {BOTAODECISAO} from '../botao-decisao/botao-decisao-mock'

@Component({
  selector: 'app-botao-decisao',
  templateUrl: './botao-decisao.component.html',
  styleUrls: ['./botao-decisao.component.css'],
})
export class BotaoDecisaoComponent implements OnInit {

  @Output() onVoted = new EventEmitter<boolean>();
  @Output() ClicarBotaoDecisao = new EventEmitter<number>();
  public cargaDeBotoes: BotaoDecisao[] = BOTAODECISAO
  public botaoCarregado : BotaoDecisao[] =[]
  @Input() progresso: number
  public ContadorProgressoBotao: number =0 

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){
    this.CarregarBotao()
  }

  public CarregarBotao(){
    
    //Limpa array para poder iniciar novamente a construção de botões
    if(this.botaoCarregado.length !== 0){
      
      this.botaoCarregado.length = 0
      
    }
    
    //let idinicial = this.cargaDeBotoes[this.progresso].id
    let idinicial = this.cargaDeBotoes[this.ContadorProgressoBotao].id
    //for(let contador:number = this.progresso; this.cargaDeBotoes[contador].id == idinicial; contador++){
    for(let contador:number = this.ContadorProgressoBotao; this.cargaDeBotoes[contador].id == idinicial; contador++){

      this.botaoCarregado.push({
            id: this.cargaDeBotoes[contador].id,
            texto: this.cargaDeBotoes[contador].texto,
            iddecisao: this.cargaDeBotoes[contador].iddecisao
        })
        //console.log("botao carregado: ID"+ this.botaoCarregado[contador].id +" Texto"+ this.botaoCarregado[contador].texto+" IDdecisao "+ this.botaoCarregado[contador].iddecisao)
        this.ContadorProgressoBotao++

    }
    console.log("SAIU FOR contador progresso botao  "+this.ContadorProgressoBotao)

  }

  public verificaProgresso(iddecisao :number) {
    this.ClicarBotaoDecisao.emit(iddecisao)
  }

}
