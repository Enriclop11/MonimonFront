import {Component, EventEmitter, Input, Output} from '@angular/core';
import {EventObject} from '../../../../models/event';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-event-display',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './event-display.component.html',
  styleUrl: './event-display.component.css'
})
export class EventDisplayComponent {
  @Input() event!: EventObject;

  @Output() saveEvent: EventEmitter<EventObject> = new EventEmitter<EventObject>();

  save() {
    this.saveEvent.emit(this.event);
  }
}
