import GameController from 'frontend/components/gameController';

export default class GameLogger {
  private newGameButton: HTMLButtonElement;

  private joinGameButton: HTMLButtonElement;

  private roomIdInput: HTMLInputElement;

  private loggerContainer: HTMLDivElement;

  private readTeamScore: HTMLSpanElement;

  private blueTeamScore: HTMLSpanElement;

  constructor() {
    this.newGameButton = <HTMLButtonElement> document.getElementById('newGame');
    this.joinGameButton = <HTMLButtonElement> document.getElementById('joinGame');
    this.roomIdInput = <HTMLInputElement> document.getElementById('roomId');
    this.loggerContainer = <HTMLDivElement> document.getElementById('logger');
    this.readTeamScore = <HTMLSpanElement> document.getElementById('red-team-score');
    this.blueTeamScore = <HTMLSpanElement> document.getElementById('blue-team-score');
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

  addMessage(text: string): void {
    const message = document.createElement('div');
    message.classList.add('logger-message');
    message.innerHTML = text;
    this.loggerContainer.appendChild(message);
    this.loggerContainer.scrollTop = this.loggerContainer.scrollHeight;
  }

  addError(text: string): void {
    const message = document.createElement('div');
    message.classList.add('logger-message', 'logger-alert');
    message.innerHTML = text;
    this.loggerContainer.appendChild(message);
    this.loggerContainer.scrollTop = this.loggerContainer.scrollHeight;
  }

  setScore(points: [string, string]):void {
    this.readTeamScore.innerHTML = points[0];
    this.blueTeamScore.innerHTML = points[1];
  }
}
