import { io } from 'socket.io-client';
import Game from 'scripts/game';

const socket = io();

document.addEventListener('DOMContentLoaded', () => {
  const game = new Game();

  console.log('Hello world');
});
