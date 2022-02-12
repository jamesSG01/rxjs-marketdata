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
  constructor() { }

  ngOnInit(): void {
     this.dataStream.next({'type':'subscribe', 'symbol': 'BINANCE:LRCUSDT'});
    //this.dataStream.next({'type':'subscribe-news', 'symbol': 'MSFT'});
    //this.dataStream.next({'type':'subscribe-news', 'symbol': 'AMZN'});
    
    this.dataStream.asObservable().subscribe((data:any) => {
      console.log("Subscriber got data >>>>> "+ JSON.stringify(data));
      this.cp = JSON.parse(JSON.stringify(data)).data[0].p;
    });
  }

}
