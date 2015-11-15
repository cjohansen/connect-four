import react from 'react';
import dom from 'react-dom';
const {div} = react.DOM;

export default function (events, el) {
  const Piece = function ({color}) {
    return div({className: `piece ${color}`});
  };

  const Tile = function (tile) {
    return div({className: 'tile'},
               div({className: 'tile-inner'},
                   tile.color ? Piece(tile) : null));
  };

  const Col = react.createFactory(react.createClass({
    getInitialState() {
      return {active: false};
    },

    componentDidUpdate() {
      if (this.props.winner && this.state.active) {
        this.setState({active: false});
      }
    },

    render() {
      return div({
        className: 'col',
        onClick: () => {
          events.emit('placePiece', this.props.idx);
        },
        onMouseEnter: () => {
          if (!this.props.winner) {
            this.setState({active: true});
          }
        },
        onMouseLeave: () => {
          this.setState({active: false});
        }
      }, [
        this.state.active ? div({className: 'pending ' + this.props.player}) : null,
        this.props.tiles.map(Tile)
      ]);
    }
  }));

  function capitalize(str) {
    return `${str[0].toUpperCase()}${str.slice(1)}`;
  }

  const Winner = function (winner) {
    if (!winner) {
      return null;
    }
    return div({className: 'winner'},
               div({className: 'overlay'}),
               div({className: 'box'},
                   `${capitalize(winner.player)} wins!`));
  };

  const Board = function (game) {
    return div({className: 'board'},
               Winner(game.winner),
               game.pieces.map((tiles, idx) => {
                 return Col({
                   tiles,
                   idx: idx,
                   player: game.player,
                   winner: game.winner
                 });
               }));
  };

  return function (game) {
    dom.render(Board(game), el);
  };
}
