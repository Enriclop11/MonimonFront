export class Photocard {

  id: number;
  idolID: number;
  name: string;
  apiName: string;
  fullName: string;
  band: string;
  photo: string;
  hp: number;
  defense: number;
  attack: number;
  type: string;
  type2: string;
  popularity: number;
  initialIndex: number;

  constructor(
    id: number,
    idolID: number,
    name: string,
    apiName: string,
    fullName: string,
    band: string,
    photo: string,
    hp: number,
    defense: number,
    attack: number,
    type: string,
    type2: string,
    popularity: number,
    initialIndex: number
  ) {
    this.id = id;
    this.idolID = idolID;
    this.name = name;
    this.apiName = apiName;
    this.fullName = fullName;
    this.band = band;
    this.photo = photo;
    this.hp = hp;
    this.defense = defense;
    this.attack = attack;
    this.type = type;
    this.type2 = type2;
    this.popularity = popularity;
    this.initialIndex = initialIndex;
  }

}
