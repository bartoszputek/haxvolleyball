import GameController from 'frontend/components/gameController';

export default class GameLogger {
  private newGameButton: HTMLButtonElement;

  private joinGameButton: HTMLButtonElement;

  private roomIdInput: HTMLInputElement;

  constructor() {
    this.newGameButton = <HTMLButtonElement> document.getElementById('newGame');
    this.joinGameButton = <HTMLButtonElement> document.getElementById('joinGame');
    this.roomIdInput = <HTMLInputElement> document.getElementById('roomId');
  }

  setupListeners(gameController: GameController): void {
    this.newGameButton.addEventListener('click', () => {
      gameController.createGame();
    });
    this.joinGameButton.addEventListener('click', () => {
      const roomId = this.roomIdInput.value;
      gameController.joinGame(roomId);
    });
  }

  setRoomId(roomId: string): void {
    this.roomIdInput.value = roomId;
  }
}
