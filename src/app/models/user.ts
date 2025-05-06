export class User {
  id: number;
  twitchId: string;
  username: string;
  dcUsername: string | null;
  score: number;
  avatar: string;
  moderator: boolean = false;

  constructor(
    id: number,
    twitchId: string,
    username: string,
    dcUsername: string | null,
    score: number,
    avatar: string
  ) {
    this.id = id;
    this.twitchId = twitchId;
    this.username = username;
    this.dcUsername = dcUsername;
    this.score = score;
    this.avatar = avatar;
  }
}
