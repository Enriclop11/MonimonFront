import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Reward} from '../../../../models/reward';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-reward-display',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './reward-display.component.html',
  styleUrl: './reward-display.component.css'
})
export class RewardDisplayComponent {
  @Input() reward!: Reward;

  @Output() saveReward = new EventEmitter<Reward>();

  save() {
    this.saveReward.emit(this.reward);
  }

}
