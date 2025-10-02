import {Component, OnInit} from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations';
import {Reward} from '../../models/reward';
import {Command} from '../../models/command';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiMonitasService} from '../../service/api-monitas.service';
import {RewardDisplayComponent} from './admin-components/reward-display/reward-display.component';
import {CommandDisplayComponent} from './admin-components/command-display/command-display.component';
import {ToolbarComponent} from '../../settings/toolbar/toolbar.component';
import {FormsModule} from '@angular/forms';
import {User} from '../../models/user';
import {EventObject} from '../../models/event';
import {EventDisplayComponent} from './admin-components/event-display/event-display.component';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [
    ToolbarComponent,
    FormsModule,
    CommandDisplayComponent,
    RewardDisplayComponent,
    EventDisplayComponent,
  ],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css',
  animations: [
    trigger('slideToggle', [
      state('hidden', style({ height: '0px', overflow: 'hidden', opacity: 0 })),
      state('visible', style({ height: '*', opacity: 1 })),
      transition('hidden <=> visible', [animate('300ms ease-in-out')]),
    ]),
  ],
})
export class AdminPanelComponent implements OnInit {
  token: string = '';
  user: User | null = null;

  commands: Command[] = [];
  rewards: Reward[] = [];
  events: EventObject[] = [];
  discordCommands: Command[] = [];

  showCommands: boolean = false;
  showRewards: boolean = false;
  showEvents: boolean = false;
  showDiscordCommands: boolean = false;

  constructor(
    private readonly apiMonitasService: ApiMonitasService,
    private readonly route: ActivatedRoute,
    private readonly rotuer: Router,
  ) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('token') || '';

    this.route.data.subscribe({
      next: (data: any) => {

        if (!data['data']) {
          this.rotuer.navigate(['/']);
        }

        this.commands = data['data'].commands || [];
        this.rewards = data['data'].rewards || [];
        this.events = data['data'].events || [];
        this.discordCommands = data['data'].discordCommands || [];
        this.user = data['userData'] || null;

        if (!this.user) {
          this.rotuer.navigate(['/']);
        }

        if (this.user && !this.user.moderator) {
          this.rotuer.navigate(['/']);
        }
      },
      error: () => {
        this.rotuer.navigate(['/']);
      }
    });
  }

  saveCommand(command: Command): void {
    this.apiMonitasService.saveCommand(this.token, command).subscribe((response: any) => {
      if (response) {
        this.commands = response;
      } else {
        console.error('Error saving command');
      }
    });
  }

  saveReward(reward: Reward): void {
    this.apiMonitasService.saveReward(this.token, reward).subscribe((response: any) => {
      if (response) {
        this.rewards = response;
      } else {
        console.error('Error saving reward');
      }
    });
  }

  saveEvent(eventObject: EventObject) {
    this.apiMonitasService.saveEvent(this.token, eventObject).subscribe((response: any) => {
      if (response) {
        this.events = response;
      } else {
        console.error('Error saving event');
      }
    });
  }

  saveDiscordCommand(command: Command): void {
    this.apiMonitasService.saveDiscordCommand(this.token, command).subscribe((response: any) => {
      if (response) {
        this.discordCommands = response;
      } else {
        console.error('Error saving Discord command');
      }
    });
  }
}
