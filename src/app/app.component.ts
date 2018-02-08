import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  ngOnInit(): void{

    var config = {
      apiKey: "AIzaSyA9CdLFCC9IpBW6DBnzzNSF2mgMzwAUwMc",
      authDomain: "enport-f1e72.firebaseapp.com",
      databaseURL: "https://enport-f1e72.firebaseio.com",
      projectId: "enport-f1e72",
      storageBucket: "enport-f1e72.appspot.com",
      messagingSenderId: "485196813786"
    };
    
    firebase.initializeApp(config);
  }

}
