import Player from "@/player/model/player";

class PlayerGameId {
  player: Player;
  gameId: number;

  constructor(player: Player, gameId: number) {
    this.player = player;
    this.gameId = gameId;
  }

  static sort(a: PlayerGameId, b: PlayerGameId): number {
    if (a.player.id < b.player.id) {
      return -1;
    } else if (a.player.id > b.player.id) {
      return 1;
    }

    if (a.gameId < b.gameId) {
      return -1;
    } else if (a.gameId > b.gameId) {
      return 1;
    } else {
      return 0;
    }
  }
}

export default PlayerGameId;
