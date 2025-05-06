export class Command {
    name: string;
    command: string;
    description: string;
    active: boolean;
    modOnly: boolean;
    price: number;
    cooldown: number;

    constructor(
        name: string,
        command: string,
        description: string,
        active: boolean,
        modOnly: boolean,
        price: number,
        cooldown: number
    ) {
        this.name = name;
        this.command = command;
        this.description = description;
        this.active = active;
        this.modOnly = modOnly;
        this.price = price;
        this.cooldown = cooldown;
    }
}

