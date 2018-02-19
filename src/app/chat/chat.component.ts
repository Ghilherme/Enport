import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs/Observable';

//***JS frameworks
//import * as  Typed  from '../../../node_modules/typed.js/lib/typed.min.js';
import * as  Jquery  from '../../../node_modules/jquery/dist/jquery.min.js';
declare var jquery:any;
declare var $ :any;

//*** My classes
import {BotaoDecisaoComponent} from '../botao-decisao/botao-decisao.component';

import {ChatService} from './chat.service'
import Typed from '../shared/typed'

import HistoriaModel from '../shared/historia.model'
import {HistoriaService} from '../shared/historia.service'
import { identifierName } from '@angular/compiler';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [ChatService, HistoriaService]
})  
export class ChatComponent implements OnInit {

  public progresso:number = 0
  public typeSpeed : number = 20
  public spansCont: any[] =[]
  public typed = new Typed()

  public historiasJSON: HistoriaModel[]
  public historiaObjeto: HistoriaModel

  constructor(public chatService: ChatService, private historiaService: HistoriaService) {
    this.spansCont.push("typed"+ this.progresso)
 }

 //Chama JSON HTTP Async ao iniciar
  ngOnInit() {  
    this.ServiceRecuperaJSONHistorias()
  }

  //objeto global historias sera carregado
  private ServiceRecuperaJSONHistorias():void{
    this.historiaService.getHistoria()
    .subscribe((data: HistoriaModel[]) =>{
       this.historiasJSON = data
       /*
        Chamar metodo pra carregar Historias somente apos o http request responder o JSON
        primeiro parametro sempre ira passar o primeiro ID onde começa interação
       */
       this.CarregarHistorias(this.historiasJSON[0].id,this.typeSpeed)
      },
    error => console.log(error));
  }
  
  public ClicarBotaoResposta($event){    
    // $event pega o parametro do emitter
    let idProximaHistoria: string = $event

    //incrementa contagem de frases
    this.progresso++

    //Carrega as linhas com typed passando parametros
    this.CarregarHistorias(idProximaHistoria,this.typeSpeed)
  }

  private CarregarHistorias(idProximaHistoria: string, speed: number){
    // Cria objeto que faz efeito de escrita
    this.typed = new Typed()

    console.log("idproximahistoria: " + idProximaHistoria)
    //retorna objeto do tipo HistoriaModel com as propriedades
    this.historiaObjeto = this.RecuperaHistoria(idProximaHistoria)
    
    //Incrementa mais objetos <span> no array para aparecer no HTML
    if (this.progresso != 0)
    {
      this.spansCont.push("typed"+ this.progresso)
    }

    this.typed.complete = false
    
    /*
      Dar um time para o push poder bindar no HTML e ao
      chamar esse metodo ele poder encontrar o elemento ja renderizado
    */
    setTimeout(()=>this.typed.typeWriter('typed' + this.progresso, this.historiaObjeto.frase, speed),500)
  }

  /*
    Recupera qual a historia com base no ID
  */
  private RecuperaHistoria(idProximaHistoria: string): HistoriaModel{
    for(let i = 0; i < this.historiasJSON.length; i++){
      if(this.historiasJSON[i].id == idProximaHistoria){
        console.log("recuperou historia: "+this.historiasJSON[i].frase)
        return this.historiasJSON[i]
      }
    }
  }

}
