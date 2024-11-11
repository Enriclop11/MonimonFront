import {Component, ElementRef, HostBinding, OnInit, Renderer2} from '@angular/core';
import * as StompJs from '@stomp/stompjs';
import {NgIf} from '@angular/common';
import {trigger, state, style, transition, animate, keyframes} from '@angular/animations';


@Component({
  selector: 'app-combat',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './combat.component.html',
  styleUrls: ['./combat.component.css'],
  animations: [
    trigger('cardAnimation', [
      state('void', style({ opacity: 0, transform: 'translateY(-100%)' })),
      state('enter', style({ opacity: 1, transform: 'translateY(0)' })),
      state('leave', style({ opacity: 0, transform: 'translateY(100%)' })),
      transition('void => enter', [
        animate('200ms ease-in', keyframes([
          style({ opacity: 0, transform: 'translateY(-100%)', offset: 0 }),
          style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 })
        ]))
      ]),
      transition('enter => leave', [
        animate('2000ms ease-out', keyframes([
          style({ opacity: 1, transform: 'translateY(0)', offset: 0 }),
          style({ opacity: 0, transform: 'translateY(100%)', offset: 1.0 })
        ]))
      ])
    ])
  ]
})
export class CombatComponent implements OnInit {

  url = 'ws://https://kpopcardbot.onrender.com/card-websocket';
  combatActive = false;
  card1 : any;
  card2 : any;
  card1AnimationState = 'enter';
  card2AnimationState = 'enter';

  constructor(private readonly renderer: Renderer2, private readonly el: ElementRef) {}

  ngOnInit(): void {
    this.changeBackground();
    this.startWebsocket();
  }

  changeBackground() {
    //Change the background of the page to transparent
    const body = this.el.nativeElement.ownerDocument.body;
    this.renderer.setStyle(body, 'background', 'transparent');
  }

  startWebsocket() {
    const client = new StompJs.Client({
      brokerURL: this.url,
    });

    client.activate();

    client.onConnect = (frame) => {
      console.log('Connected:', frame);
      client.subscribe('/topic/card/combat', (message) => {
        this.onMessageReceived(message);
      });
    };
  }

  onMessageReceived(message: StompJs.IMessage) {
    const body = JSON.parse(message.body);

    if (body.end === true) {
      this.endCombat();
      return;
    }

    this.updateCombat(body);

    if (body.start === true) {
      this.startCombat(body);
    }

    if (body.change === true) {
      this.changeCard(body);
    }
  }

  updateCombat(body: any) {
    this.combatActive = true;

    this.card1 = body.card1;
    this.card2 = body.card2;

    if (this.card1.currentHp <= 0) {
      this.card1.currentHp = 0;
    }

    if (this.card2.currentHp <= 0) {
      this.card2.currentHp = 0;
    }

    this.setHpBar();
  }

  setHpBar() {
    //Calculate the width of the health bars
    const card1HpWidth = (this.card1.currentHp / this.card1.hp) * 100;
    const card2HpWidth = (this.card2.currentHp / this.card2.hp) * 100;

    //Set it with the this.card
    this.card1.hpWidth = card1HpWidth;
    this.card2.hpWidth = card2HpWidth;

    //Set the color of the health by the % of health left
    if (card1HpWidth < 25) {
      this.card1.hpColor = 'red';
    } else if (card1HpWidth < 50) {
      this.card1.hpColor = 'orange';
    } else {
      this.card1.hpColor = '#0f0';
    }

    if (card2HpWidth < 25) {
      this.card2.hpColor = 'red';
    } else if (card2HpWidth < 50) {
      this.card2.hpColor = 'orange';
    } else {
      this.card2.hpColor = '#0f0';
    }
  }

  endCombat() {
    this.combatActive = false;
    this.card1AnimationState = 'leave';
    this.card2AnimationState = 'leave';
    setTimeout(() => {
      this.card1 = null;
      this.card2 = null;
    }, 200);
  }

  startCombat(body: any) {
    this.combatActive = true;
    this.card1AnimationState = 'enter';
    this.card2AnimationState = 'enter';
  }

  changeCard(body: any) {
    const cardChanged = body.cardChanged;
    if (cardChanged === 1) {
      this.card1AnimationState = 'leave';
    } else {
      this.card2AnimationState = 'leave';
    }
    setTimeout(() => {
      if (cardChanged === 1) {
        this.card1 = body.card1;
        this.card1AnimationState = 'enter';
      } else {
        this.card2 = body.card2;
        this.card2AnimationState = 'enter';
      }
    }, 200);
  }

}
