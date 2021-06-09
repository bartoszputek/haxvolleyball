import Game from 'frontend/components/game';

document.addEventListener('DOMContentLoaded', () => {
  const newGameButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById('newGame');
  const joinGameButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById('joinGame');
  const roomIdInput: HTMLInputElement = <HTMLInputElement> document.getElementById('roomId');
  newGameButton.addEventListener('click', async () => {
    const game = new Game();
    const roomId = await game.start();
    if (roomIdInput) {
      roomIdInput.value = roomId;
    }
  });
  joinGameButton.addEventListener('click', async () => {
    const game = new Game();
    const roomId = roomIdInput.value;
    game.join(roomId);
  });
});
