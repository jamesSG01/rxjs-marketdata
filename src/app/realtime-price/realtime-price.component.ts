import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
@Component({
  selector: 'app-realtime-price',
  templateUrl: './realtime-price.component.html',
  styleUrls: ['./realtime-price.component.css']
})
export class RealtimePriceComponent implements OnInit {
  dataStream: WebSocketSubject<any> = webSocket('wss://ws.finnhub.io?token=c83rosiad3ide9hecq4g');
  cp: any;
  win: any; 
  lose: any; 
  mid: any;
  points: number = 0;
  counter:number = 60;

  constructor() { }

  ngOnInit(): void {
    this.dataStream.next({'type':'subscribe', 'symbol': 'BINANCE:BTCUSDT'});
    //this.dataStream.next({'type':'subscribe-news', 'symbol': 'MSFT'});
    //this.dataStream.next({'type':'subscribe-news', 'symbol': 'AMZN'});
    
    this.dataStream.asObservable().subscribe((data:any) => {
      console.log("Subscriber got data >>>>> "+ JSON.stringify(data));
      if (data.type !='ping')
        this.cp = JSON.parse(JSON.stringify(data)).data[0].p;
    });
  }
  startCountdown(seconds:any) {
    let counter = seconds;
      
  }
  game() {
    this.win = (this.cp + this.cp*0.001);
    this.lose = (this.cp - this.cp*0.001);
    this.mid = this.cp;
    console.log('Game started at price:'+this.cp)
    this.counter = 10;// game is 60s 
    const interval  = setInterval(() => {
      this.counter--;
      this.dataStream.asObservable().subscribe((data:any) => {
        if (data.type !='ping')
          this.cp = JSON.parse(JSON.stringify(data)).data[0].p;
      });
      console.log('Time left:' + this.counter+'| Win at:'+this.win+'| Lose at:'+this.lose );
      if (this.cp < this.lose ) {
        this.points-= 100;
        clearInterval(interval);
        console.log('You Lost!');
      } else if (this.cp > this.win) {
        console.log('You Won!');
        this.points+= 150;
        clearInterval(interval);
      } 
      if (this.counter <=0) {
        if(this.cp >= this.mid){
          console.log('You Won!');
          this.points+= 150;
        } else {
          console.log('You Lost!');
          this.points-= 100;
        }
        clearInterval(interval);
      }
    }, 1000);
  }
}
