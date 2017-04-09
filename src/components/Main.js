/* jshint esversion:6 */

var React = require('react');

import Board from './game/Board';

class Main extends React.Component{

    static get propTypes(){
        return {
            something: React.PropTypes.number
        };
    }

    handleClick(){
        window.alert("I was clicked.");
    }

    render(){
        return (
            <div>
                <div>Opponent</div>
                <Board ships={this.props.ships.opponentShips} shots={this.props.shots.playerShots} />
                <div>You</div>
                <Board ships={this.props.ships.playerShips} shots={this.props.shots.opponentShots} />
            </div>
        );
    }
}

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions';
const mapStateToProps = state => ({
    shots:state.shots,
    ships:state.ships
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions,dispatch)
});

export default connect(mapStateToProps,mapDispatchToProps)(Main);
