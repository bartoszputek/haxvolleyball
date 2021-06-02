import Game from 'frontend/game';

document.addEventListener('DOMContentLoaded', () => {
  const newGameButton = document.getElementById('newGame');
  newGameButton?.addEventListener('click', () => {
    const game = new Game();
  });
});
