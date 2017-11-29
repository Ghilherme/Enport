import { Component, OnInit} from '@angular/core';

//***JS frameworks
import * as  Typed  from '../../../node_modules/typed.js/lib/typed.min.js';
import * as  Jquery  from '../../../node_modules/jquery/dist/jquery.min.js';
declare var jquery:any;
declare var $ :any;

//*** My classes
import Historia from '../shared/historia.model'
import {HISTORIA} from './historia-mock'
import BotaoDecisao from '../shared/botao-decisao.model'
import {BOTAODECISAO} from '../botao-decisao/botao-decisao-mock'
import { BotaoDecisaoComponent } from '../botao-decisao/botao-decisao.component';

import {contadorParaTeste} from '../shared/global-test.model'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  public historias: Historia[] = HISTORIA
  public botaodecisao: BotaoDecisao[] = BOTAODECISAO
  public progresso:number = 0
  public typed:any
  public countSpan:number = 1
  public botaoCarregado: BotaoDecisao[] = []
  public contadorHistorias: number = contadorParaTeste
  public flagShowButton:boolean = false

  constructor() { }

  ngOnInit() {

    this.CarregarHistorias(1,true,0, 1000, "", false,false)
  }
  
  private ClicarBotaoDecisao($event){
    this.flagShowButton = false

    // $event pega o parametro do emitter
    let iddecisao: number = $event

    //incrementa contagem de frases
    this.progresso++
    
    //incrementa contagem para os spans (+1 na frente do progresso)
    this.countSpan++

    //Carrega as linhas com typed passando parametros
    this.CarregarHistorias(iddecisao,false,0, 500, "", false,true)
  }

  private CarregarHistorias(iddecisao: number,start: boolean,typeSpeed:number, startDelay:number, cursorChar:String,loop:boolean,onStringTyped:boolean){
    let typed : string
    if(start == false){
      typed = "#typed" + this.progresso
    }
    else{
      typed = "#typed"
    }
    
    var selfchat = this
    var typ = new Typed(typed, {
      strings: ["<span id='typed"+this.progresso+"'>"+ this.AcharHistoria(iddecisao) +
                "</span><br><span id='typed"+this.countSpan+"'></span>"],
      typeSpeed: typeSpeed,
      startDelay: startDelay,
      cursorChar: cursorChar,
      loop: loop,
      onComplete: function(self) {          
          selfchat.flagShowButton = true
        },
      onStringTyped: function(){
          if (onStringTyped = true){
            $('html, body').animate({ scrollTop: $(document).height() });
          }
        }
      })
  }

  private AcharHistoria(iddecisao: number){
    let texto: string 
    let idinicial = this.historias[this.contadorHistorias].id
    let indexfinal: number = 1

  
    //Se chegou na ultima historia
    //se é o ultimo ID de historias -- tratamento especial para final com varios historias possiveis
    if(this.historias[this.contadorHistorias].id === this.historias[this.historias.length -1].id){
      //Se é o ultimo Index do array retorna o ultimo texto normalmente
      if(this.historias[this.contadorHistorias] === this.historias[this.historias.length-1]){
        texto= this.historias[this.contadorHistorias].frase
        return texto;
      }
      //senao itera no array no ultimo id de historias ate achar o iddecisao correto
      else{
        for(indexfinal = 1; this.historias[this.contadorHistorias].iddecisao !== iddecisao;indexfinal++){
          this.contadorHistorias++
        }        
        texto = this.historias[this.contadorHistorias].frase
        return texto
      }
    }
    //Meio da historia 
    else{      
      for(let contador:number = this.contadorHistorias; this.historias[contador].id == idinicial; contador++){

        if(this.historias[contador].iddecisao == iddecisao){
          texto = this.historias[contador].frase
        }
        this.contadorHistorias++
      }
      return texto;
    }

  }
}
