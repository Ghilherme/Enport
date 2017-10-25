import { Component, OnInit } from '@angular/core';

//***JS frameworks
import * as  Typed  from '../../../node_modules/typed.js/lib/typed.min.js';
import * as  Jquery  from '../../../node_modules/jquery/dist/jquery.min.js';
declare var jquery:any;
declare var $ :any;

//*** My classes
import Historia from '../shared/historia.model'
import {HISTORIA} from './historia-mock'


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  public historias: Historia[] = HISTORIA
  public progresso:number = 0
  public showBtn:boolean = false
  public typed:any
  public countSpan:number = 1
  public btnText:string

  
  constructor() { }

  ngOnInit() {
    console.log("countspan: "+ this.countSpan)
    console.log("size array: "+ this.historias.length)
    console.log("progresso: "+ this.progresso)
    //texto para o botao-decisao
    this.btnText = "Próximo"
    this.typed = new Typed("#typed", {
    strings: ["<span id='typed"+this.progresso+"'>"+ this.historias[this.progresso].frase +
              "</span><br><span id='typed"+this.countSpan+"'></span>"],
    typeSpeed: 0,
    startDelay: 1000,
    cursorChar: "",
    loop: false,
    onComplete: function(self) {          
        $( "#showBtn" ).fadeIn( "slow", function() {    });
      },
    })  
    
  }

  private onVoted() {
    //sumir botao apos click
    $( "#showBtn" ).fadeOut( "fast", function() {    });
    //incrementa contagem de frases
    this.progresso++
    //incrementa contagem para os spans (+1 na frente do progresso)
    this.countSpan++

    if(this.progresso < this.historias.length){
      //chegou no fim da historia
      if (this.countSpan == this.historias.length){
        this.btnText = "Fim!"
      } else{
        this.btnText = "Próximo"
      }
      console.log("countspan: "+ this.countSpan)
      console.log("size array: "+ this.historias.length)
      console.log("progresso: "+ this.progresso)
      
      //instancia nova variavel typed    
      var typ = new Typed("#typed" + this.progresso, {
        strings: ["<span id='typed"+this.progresso+"'>"+ this.historias[this.progresso].frase +
                  "</span><br><span id='typed"+this.countSpan+"'></span>"],
        typeSpeed: 0,
        startDelay: 500,
        cursorChar: "",
        loop: false,
        onComplete: function(self) {          
            $( "#showBtn" ).fadeIn( "slow", function() {    });
          },
        onStringTyped: function(){
            $('html, body').animate({ scrollTop: $(document).height() });
          }
      })
    } 

  }

}
