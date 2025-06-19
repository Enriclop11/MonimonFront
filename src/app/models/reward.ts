export class Reward {
  name: string;
  reward: string;
  active: boolean;
  modOnly: boolean;
  cooldown: number;
  price: number;

  constructor(
    name: string,
    reward: string,
    active: boolean,
    modOnly: boolean,
    cooldown: number,
    price: number
  ) {
    this.name = name;
    this.reward = reward;
    this.active = active;
    this.modOnly = modOnly;
    this.cooldown = cooldown;
    this.price = price;
  }
}
