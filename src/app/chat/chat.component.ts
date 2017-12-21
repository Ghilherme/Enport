import { Component, OnInit} from '@angular/core';

//***JS frameworks
//import * as  Typed  from '../../../node_modules/typed.js/lib/typed.min.js';
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
import {ChatService} from './chat.service'
import Typed from '../shared/typed'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [ChatService]
})  
export class ChatComponent implements OnInit {

  public historias: Historia[] = HISTORIA
  public botaodecisao: BotaoDecisao[] = BOTAODECISAO
  public progresso:number = 0
  public botaoCarregado: BotaoDecisao[] = []
  public contadorHistorias: number = contadorParaTeste 
  public typeSpeed : number = 20

  public spansCont: any[] =[]

  public typed = new Typed()

  constructor(public chatService: ChatService) {
    this.spansCont.push("typed"+ this.progresso)
 }

  ngOnInit() {  
  }

  ngAfterViewInit(){
    this.CarregarHistorias(1,this.typeSpeed)
  }

  
  private ClicarBotaoDecisao($event){    
    // $event pega o parametro do emitter
    let iddecisao: number = $event

    //incrementa contagem de frases
    this.progresso++

    //Carrega as linhas com typed passando parametros
    this.CarregarHistorias(iddecisao,this.typeSpeed)
  }

  private CarregarHistorias(iddecisao: number, speed: number){
    this.typed = new Typed()
    let texto: string = this.AcharHistoria(iddecisao)
    if (this.progresso != 0)
    {
      this.spansCont.push("typed"+ this.progresso)
    }
    
    /*
      Dar um time para o push poder bindar no HTML e ao
      chamar esse metodo ele poder encontrar o elemento ja renderizado
    */
    setTimeout(()=>this.typed.typeWriter('typed' + this.progresso, texto, speed),500)

  }

  
  
  private AcharHistoria(iddecisao: number){
    let texto: string 
    let idinicial = this.historias[this.contadorHistorias].id

  
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
        for(let indexfinal = 1; this.historias[this.contadorHistorias].iddecisao !== iddecisao;indexfinal++){
          this.contadorHistorias++
        }        
        texto = this.historias[this.contadorHistorias].frase
        return texto
      }
    }
    //Fluxo normal da historia
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
