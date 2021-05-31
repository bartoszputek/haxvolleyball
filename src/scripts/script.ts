import { io } from 'socket.io-client';
import GameBoard from './gameBoard';

const socket = io();

document.addEventListener('DOMContentLoaded', () => {
  const gameBoard = new GameBoard();

  console.log('Hello world');
});
