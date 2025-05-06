export class EventObject {
  name: string;
  active: boolean;
  minCooldown: number;
  maxCooldown: number;

  constructor(
    name: string,
    active: boolean,
    minCooldown: number,
    maxCooldown: number
  ) {
    this.name = name;
    this.active = active;
    this.minCooldown = minCooldown;
    this.maxCooldown = maxCooldown;
  }

}
