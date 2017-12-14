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
import {ChatService} from './chat.service'

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
  public typed:any
  public countSpan:number = 1
  public botaoCarregado: BotaoDecisao[] = []
  public contadorHistorias: number = contadorParaTeste
  public flagShowButton:boolean = false

  public spans: any[] =[]

  constructor(public chatService: ChatService) {
    this.typed="typed"+chatService.contt
    //this.spans.push("typed"+this.progresso)
    for(let x=0;x<this.historias.length;x++){
      this.spans.push("typed"+x)
    }
 }

  ngOnInit() {  
  }

  ngAfterViewInit(){
    this.CarregarHistorias(1,true, 10, 1000, "", false,false)
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
    this.CarregarHistorias(iddecisao,false, 10, 500, "", false,true)
  }

  private CarregarHistorias(iddecisao: number,start: boolean,typeSpeed:number, startDelay:number, cursorChar:String,loop:boolean,onStringTyped:boolean){
    let temp: any
    
    if(start == false){
      //typed = "#typed" + this.progresso
//      this.spans.push("typed"+this.progresso)
    }
    else{
      //typed = "#typed0"

    }
    
    
    this.typed= "typed" + this.progresso
    temp = "#typed" + this.progresso
    

    console.log("spans: " + this.spans)
    console.log(this.typed +"  /  "+this.progresso, " / temp: " +  temp)
    var selfchat = this                
    /*var typ = new Typed(typed, {
      strings: ["</span><br>"+
                "<div style='width:26px;float:left;'>"+
                "<img style='width:26px; height:26px' src='/assets/imgs/roboenport.png'>" + 
                "</div>"+
                "<span id='typed"+this.progresso+"'>"+ this.AcharHistoria(iddecisao) +  "</span>"+              
                "<br>"+
                "<span id='typed"+this.countSpan+"'>"

              ],
      */
      var typ = new Typed(temp,{
      strings: ["<img style='float:left;width:26px; height:26px' src='/assets/imgs/roboenport.png'>" + 
                "<div style='margin: 30px'>" +this.AcharHistoria(iddecisao) +"</div>"
            

    ],
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
