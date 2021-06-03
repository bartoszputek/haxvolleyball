import Game from 'frontend/components/game';

document.addEventListener('DOMContentLoaded', () => {
  const newGameButton = document.getElementById('newGame');
  newGameButton?.addEventListener('click', () => {
    const game = new Game();
    game.start();
  });
});
