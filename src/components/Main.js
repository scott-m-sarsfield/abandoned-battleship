/* jshint esversion:6 */

var React = require('react');

import Board from './game/Board';
import ShipStatusPanel from './game/ShipStatusPanel';

class Main extends React.Component{

    constructor(props){
        super(props);

        props.actions.startGame();
    }

    static get propTypes(){
        return {
            playerShips: React.PropTypes.object,
            playerShots: React.PropTypes.array,
            opponentShips: React.PropTypes.object,
            opponentShots: React.PropTypes.array
        };
    }

    handleClick(){
        window.alert("I was clicked.");
    }

    handleShoot(x,y){
        this.props.actions.shootCell(x,y);
    }

    render(){
        const {playerShips,opponentShips,playerShots,opponentShots} = this.props;
        return (
            <div>
                <div>Opponent</div>
                <Board ships={opponentShips} shots={playerShots} onShoot={this.handleShoot.bind(this)}/>
                <ShipStatusPanel ships={opponentShips} />

                <div>You</div>
                <Board ships={playerShips} shots={opponentShots} />
                <ShipStatusPanel ships={playerShips} />
            </div>
        );
    }
}

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions';
const mapStateToProps = state => ({
    playerShips: state.game.playerShips,
    playerShots: state.game.playerShots,
    opponentShips: state.game.opponentShips,
    opponentShots: state.game.opponentShots
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions,dispatch)
});

export default connect(mapStateToProps,mapDispatchToProps)(Main);
