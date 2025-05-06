export class Reward {
  name: string;
  reward: string;
  active: boolean;
  modOnly: boolean;
  cooldown: number;

  constructor(
    name: string,
    reward: string,
    active: boolean,
    modOnly: boolean,
    cooldown: number
  ) {
    this.name = name;
    this.reward = reward;
    this.active = active;
    this.modOnly = modOnly;
    this.cooldown = cooldown;
  }
}
