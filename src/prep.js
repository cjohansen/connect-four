import {times} from './fn';

export default function (game) {
  return {
    winner: game.getWinner(),
    player: game.getCurrentPlayer(),
    pieces: times(game.cols, col => {
      return times(game.rows, row => {
        const column = game.pieces[col];
        return {color: column && column[game.rows - row - 1]};
      });
    })
  };
}
