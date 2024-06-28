import Game from './Game'

window.onload = () => {
  const game = Game.getInstance();
  game.start();
};