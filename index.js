import {play} from './src/game';
import createUI from './src/ui';
import prep from './src/prep';
import {EventEmitter} from 'events';

const game = play(7, 7, ['yellow', 'red']);
const events = new EventEmitter();
const render = createUI(events, document.getElementById('app'));

events.on('placePiece', col => {
  game.placePiece(col);
  render(prep(game));
});

render(prep(game));
