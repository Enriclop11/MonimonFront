import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Command} from '../../../../models/command';

@Component({
  selector: 'app-command-display',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './command-display.component.html',
  styleUrl: './command-display.component.css'
})
export class CommandDisplayComponent {
  @Input() command!: Command;

  @Output() saveCommand: EventEmitter<Command> = new EventEmitter<Command>();

  save() {
    this.saveCommand.emit(this.command);
  }

}
