enum GameState {
  PENDING = 'PENDING',
  LIVE = 'LIVE',
  COMPLETE = 'COMPLETE',
}

enum GameEvent {
  START = 'START',
  FINISH = 'FINISH',
}

export { GameState, GameEvent };
