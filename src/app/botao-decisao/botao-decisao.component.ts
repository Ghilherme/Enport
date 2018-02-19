import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

// import fade in animation
import { fadeInAnimation } from '../_animations/index';

import BotaoDecisao from '../shared/botao-decisao.model'

import HistoriaModel from '../shared/historia.model'
import {HistoriaService} from '../shared/historia.service'

@Component({
  selector: 'app-botao-decisao',
  templateUrl: './botao-decisao.component.html',
  styleUrls: ['./botao-decisao.component.css'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({ opacity: 0}),
          animate('200ms', style({ opacity: 1}))
        ]),
        transition(':leave', [
          style({ opacity: 1}),
          animate('200ms', style({ opacity: 0}))
        ])
      ]
    )
  ],
  providers: [HistoriaService]
})
export class BotaoDecisaoComponent implements OnInit {

  @Output() ClicarBotaoResposta = new EventEmitter<string>();
  
  @Input() montarInteracao: boolean

  @Input() historiaObjeto: HistoriaModel

  public botaoCarregado : BotaoDecisao[] =[]
  public ContadorProgressoBotao: number = 0
  public historias: HistoriaModel[]

  public mostrarBotoes: boolean = false


  constructor(private historiaService: HistoriaService) { }

  ngOnInit() {
  }

  //Carrega botoesa partir desse metodo
  ngOnChanges(){
    if (this.montarInteracao ==true){
      this.MontarInteracaoHistoria()
    }    
  }

  private MontarInteracaoHistoria(){
    switch(this.historiaObjeto.tipo){
      case("chat"):
        //proxima historia
        console.log("objeto: " + this.historiaObjeto.proximapergunta)
        this.verificaProgresso(this.historiaObjeto.proximapergunta)

        break;
      case("pergunta"):
        //criar botões de resposta

        break;

      case("texto"):
        //Criar txtbox e guardar input

        break;

      case("fim"):
        //Final da historia

        break;

    }

  }


  /*
  public CarregarBotao(){
    console.log(this.historiaObjeto)
    
    //Limpa array para poder iniciar novamente a construção de botões
    if(this.botaoCarregado.length !== 0){
      this.botaoCarregado.length = 0
    }

    let idinicial = this.cargaDeBotoes[this.ContadorProgressoBotao].id
    //Se chegou na ultima historia
    if(this.cargaDeBotoes[this.ContadorProgressoBotao].id === this.cargaDeBotoes[this.cargaDeBotoes.length-1].id){
      this.botaoCarregado.push({
        id: 0,
        frase: 'Fim!',
        idProximaPergunta: 0
      })
    }
    else{
      for(let contador:number = this.ContadorProgressoBotao; this.cargaDeBotoes[contador].id == idinicial; contador++){

        this.botaoCarregado.push({
          id: this.cargaDeBotoes[contador].id,
          frase: this.cargaDeBotoes[contador].frase,
          idProximaPergunta: this.cargaDeBotoes[contador].idProximaPergunta
        })
        this.ContadorProgressoBotao++
      }
    }
  }
  */

  public verificaProgresso(idProximaHistoria :string) {
    console.log("Botao Verifica progresso: " + idProximaHistoria)
    this.ClicarBotaoResposta.emit(idProximaHistoria)
  }

}
