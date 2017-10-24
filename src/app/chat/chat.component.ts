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

  
  

  constructor() { }

  ngOnInit() {  
    //this.chamaTyping(0)
    var typed = new Typed("#typed", {
      strings: [this.historias[this.progresso].frase],
      typeSpeed: 0,
      backSpeed: 0,
      backDelay: 500,
      startDelay: 1000,
      loop: false,
      onComplete: function(self) {          
          $( "#showBtn" ).fadeIn( "slow", function() {    });
        },
    })  
  }

  private onVoted() {
    this.progresso++
    console.log(this.progresso)

    let typed = new Typed("#typed", {
      strings: [this.historias[this.progresso].frase],
      typeSpeed: 0,
      backSpeed: 0,
      backDelay: 500,
      startDelay: 1000,
      loop: false,
      onComplete: function(self) {          
          $( "#showBtn" ).fadeIn( "slow", function() {    });
        },
    })
    
  }

}
