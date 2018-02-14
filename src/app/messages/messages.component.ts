import { Component, OnInit } from '@angular/core';
// #TODO - import MessageService;

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(/* inject message service */) {}

  ngOnInit() {
  }

}
