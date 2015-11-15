import {assert} from 'chai';
import {createGame, placePiece, play} from '../src/game';

describe('Connect four', () => {
  describe('create game', () => {
    it('creates game', () => {
      const game = createGame(7, 7);

      assert.deepEqual(game.rows, 7);
      assert.deepEqual(game.cols, 7);
    });
  });

  describe('placePiece', () => {
    let game;

    beforeEach(() => {
      game = createGame(7, 7);
    });

    it('places piece of given color', () => {
      placePiece(game, 0, 'red');

      assert.equal(game.pieces[0][0], 'red');
    });

    it('places piece in last column', () => {
      placePiece(game, 6, 'red');

      assert.equal(game.pieces[6][0], 'red');
    });

    it('places pieces on top of each other', () => {
      placePiece(game, 6, 'red');
      placePiece(game, 6, 'yellow');

      assert.equal(game.pieces[6][0], 'red');
      assert.equal(game.pieces[6][1], 'yellow');
    });

    it('cannot place piece in full column', () => {
      placePiece(game, 6, 'red');
      placePiece(game, 6, 'yellow');
      placePiece(game, 6, 'red');
      placePiece(game, 6, 'yellow');
      placePiece(game, 6, 'red');
      placePiece(game, 6, 'yellow');
      placePiece(game, 6, 'red');

      assert.throws(() => {
        placePiece(game, 6, 'yellow');
      });
    });

    it('cannot place piece in non-existent columns', () => {
      assert.throws(() => {
        placePiece(game, -1, 'yellow');
      });

      assert.throws(() => {
        placePiece(game, 7, 'yellow');
      });
    });

    it('wins with four horizontal pieces', () => {
      placePiece(game, 3, 'red');
      placePiece(game, 2, 'red');
      placePiece(game, 1, 'red');
      placePiece(game, 0, 'red');

      assert.deepEqual(game.winner, {player: 'red'});
    });

    it('wins with four horizontal pieces leftwards', () => {
      placePiece(game, 0, 'red');
      placePiece(game, 1, 'red');
      placePiece(game, 2, 'red');
      placePiece(game, 3, 'red');

      assert.deepEqual(game.winner, {player: 'red'});
    });

    it('wins when completing four horizontal pieces', () => {
      placePiece(game, 2, 'red');
      placePiece(game, 3, 'red');
      placePiece(game, 0, 'red');
      placePiece(game, 1, 'red');

      assert.deepEqual(game.winner, {player: 'red'});
    });

    it('wins with four vertical pieces', () => {
      placePiece(game, 0, 'red');
      placePiece(game, 0, 'red');
      placePiece(game, 0, 'red');
      placePiece(game, 0, 'red');

      assert.deepEqual(game.winner, {player: 'red'});
    });

    it('wins with four north-east diagonal pieces', () => {
      placePiece(game, 0, 'red');
      placePiece(game, 1, 'yellow');
      placePiece(game, 1, 'red');
      placePiece(game, 3, 'yellow');
      placePiece(game, 3, 'red');
      placePiece(game, 3, 'yellow');
      placePiece(game, 3, 'red');
      placePiece(game, 2, 'yellow');
      placePiece(game, 2, 'yellow');
      placePiece(game, 2, 'red');

      assert.deepEqual(game.winner, {player: 'red'});
    });

    it('wins with four south-west diagonal pieces', () => {
      placePiece(game, 3, 'yellow');
      placePiece(game, 3, 'red');
      placePiece(game, 3, 'yellow');
      placePiece(game, 3, 'red');
      placePiece(game, 2, 'yellow');
      placePiece(game, 2, 'yellow');
      placePiece(game, 2, 'red');
      placePiece(game, 1, 'yellow');
      placePiece(game, 1, 'red');
      placePiece(game, 0, 'red');

      assert.deepEqual(game.winner, {player: 'red'});
    });

    it('wins with four north-west diagonal pieces', () => {
      placePiece(game, 0, 'red');
      placePiece(game, 0, 'yellow');
      placePiece(game, 0, 'red');
      placePiece(game, 0, 'yellow');
      placePiece(game, 1, 'red');
      placePiece(game, 1, 'red');
      placePiece(game, 1, 'yellow');
      placePiece(game, 2, 'red');
      placePiece(game, 2, 'yellow');
      placePiece(game, 3, 'yellow');

      assert.deepEqual(game.winner, {player: 'yellow'});
    });

    it('wins with four wouth-east diagonal pieces', () => {
      placePiece(game, 3, 'yellow');
      placePiece(game, 2, 'red');
      placePiece(game, 2, 'yellow');
      placePiece(game, 1, 'red');
      placePiece(game, 1, 'red');
      placePiece(game, 1, 'yellow');
      placePiece(game, 0, 'red');
      placePiece(game, 0, 'yellow');
      placePiece(game, 0, 'red');
      placePiece(game, 0, 'yellow');

      assert.deepEqual(game.winner, {player: 'yellow'});
    });

    it('cannot place pieces after a winner has been chosen', () => {
      placePiece(game, 0, 'red');
      placePiece(game, 1, 'red');
      placePiece(game, 2, 'red');
      placePiece(game, 3, 'red');
      placePiece(game, 4, 'red');

      assert.isUndefined(game.pieces[4][0]);
    });
  });

  describe('play', () => {
    let game;

    beforeEach(() => {
      game = play(7, 7, ['red', 'yellow'], 0);
    });

    it('sets the initial player', () => {
      assert.equal(game.getCurrentPlayer(), 'red');
    });

    it('places a piece for the current player', () => {
      game.placePiece(0);

      assert.equal(game.pieces[0][0], 'red');
    });

    it('swaps player after placing piece', () => {
      game.placePiece(0);
      assert.equal(game.getCurrentPlayer(), 'yellow');

      game.placePiece(0);
      assert.equal(game.getCurrentPlayer(), 'red');

      assert.equal(game.pieces[0][0], 'red');
      assert.equal(game.pieces[0][1], 'yellow');
    });

    it('reveals the winning player', () => {
      game.placePiece(0);
      game.placePiece(0);
      game.placePiece(1);
      game.placePiece(1);
      game.placePiece(2);
      game.placePiece(2);
      game.placePiece(3);

      assert.equals(game.getWinner(), 'red');
    });
  });
});
