import { Component, OnInit } from '@angular/core';

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


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  public historias: Historia[] = HISTORIA
  public botaodecisao: BotaoDecisao[] = BOTAODECISAO
  public progresso:number = 0
  public showBtn:boolean = false
  public typed:any
  public countSpan:number = 1
  public btnText:string
  public botaoCarregado: BotaoDecisao[] = []
  public contadorHistorias: number = 0

  
  constructor() { }

  ngOnInit() {

    this.CarregarHistorias(1,true,0, 1000, "", false,false)

    //this.CarregarBotaoDecisao()

  }
  
  private ClicarBotaoDecisao($event){
    // $event pega o parametro do emitter
    let iddecisao: number = $event
    
    //fade dos botoes
    this.EfeitoCarregarBotoes()

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
    
    var typ = new Typed(typed, {
      /*strings: ["<span id='typed"+this.progresso+"'>"+ this.historias[this.progresso].frase +
                "</span><br><span id='typed"+this.countSpan+"'></span>"],*/
      strings: ["<span id='typed"+this.progresso+"'>"+ this.AcharHistoria(iddecisao) +
                "</span><br><span id='typed"+this.countSpan+"'></span>"],
      typeSpeed: typeSpeed,
      startDelay: startDelay,
      cursorChar: cursorChar,
      loop: loop,
      onComplete: function(self) {          
          $( "#showBtn" ).fadeIn( "slow", function() {    });
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
    //let idinicial = this.historias[this.progresso].id
    let idinicial = this.historias[this.contadorHistorias].id
    //for(let contador:number = this.progresso; this.historias[contador].id == idinicial; contador++){
    for(let contador:number = this.contadorHistorias; this.historias[contador].id == idinicial; contador++){
      
      if(this.historias[contador].iddecisao == iddecisao){
        texto = this.historias[contador].frase
      }
      //console.log("idinicial: "+ idinicial)
      //console.log("contador: "+ contador) 
      //console.log("historias: ID: "+ this.historias[contador].id +" FRASE : "+ this.historias[contador].frase+" IDdecisao : "+ this.historias[contador].iddecisao)
      this.contadorHistorias++
      console.log("Historia no for  "+this.contadorHistorias)
    }
    console.log("Historia saiu for  "+this.contadorHistorias)
    return texto;

  }

  private EfeitoCarregarBotoes(){
    $( "#showBtn" ).fadeOut( "fast", function() {    });
  }

}
