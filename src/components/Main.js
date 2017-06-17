/* jshint esversion:6 */

var React = require('react');

import Board from './game/Board';
import ShipStatusPanel from './game/ShipStatusPanel';

import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';


class MessageArea extends React.Component{

    constructor(){
        super();
    }

    static get propTypes(){
        return {
            history: React.PropTypes.array
        };
    }

    render(){

        const {history,...other} = this.props;

        return (
            <div {...other}>
                <pre style={{padding:'0 0.5em',color:'#0f0'}}>
                    {
                        history.map((h,i)=>(
                            <span key={i} style={{color:h.color||"inherit"}}>
                                {h.message}
                                <br />
                            </span>
                        ))
                    }
                </pre>
            </div>
        );
    }
}


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
            opponentShots: React.PropTypes.array,
            gameHistory: React.PropTypes.array,
            gameState: React.PropTypes.string
        };
    }

    handleClick(){
        window.alert("I was clicked.");
    }

    handleShoot(x,y){
        this.props.actions.shootCell(x,y);
    }

    render(){
        const {
            playerShips,
            opponentShips,
            playerShots,
            opponentShots,
            gameHistory,
            gameState
        } = this.props;

        const HeaderBar = (props) => (
            <Toolbar>
                <ToolbarGroup>
                    <ToolbarTitle text={"Battleship"+" -- "+props.gameState}/>
                </ToolbarGroup>
            </Toolbar>
        );

        const BoardArea = (props) => (
            <div {...props}>
                <Paper style={{position:'absolute',left:'3em',top:'3em', zIndex:1, background:'white'}} zDepth={2}>
                    <div>Opponent</div>
                    <Board ships={opponentShips} shots={playerShots} onShoot={this.handleShoot.bind(this)}/>
                </Paper>

                <Paper style={{position:'absolute',bottom:'3em',right:'3em',zIndex:0}} zDepth={2}>
                    <div>You</div>
                    <Board ships={playerShips} shots={opponentShots} />
                </Paper>
            </div>
        );

        const StatusArea = (props) => (
            <div {...props}>
                Opponent
                <ShipStatusPanel ships={opponentShips} />
                You
                <ShipStatusPanel ships={playerShips} />
            </div>
        );

        const DashboardArea = (props) => (
            <div {...props}>
                <Toolbar>
                    <ToolbarGroup>
                        <div>Sector</div>
                        <div>F9</div>
                    </ToolbarGroup>
                    <ToolbarGroup>
                        <button style={{padding:'0.5em 1em',fontSize:'1.1em',textTransform:'uppercase'}}>Fire</button>
                    </ToolbarGroup>
                </Toolbar>
            </div>
        );

        return (
            <div>
                <HeaderBar gameState={gameState}/>
                <BoardArea style={{position:'absolute',left:0,top:'56px',bottom:'56px',right:'600px'}}/>
                <MessageArea style={{position:'absolute',right:0,width:'300px',top:'56px',bottom:0,background:'#262626'}} history={gameHistory}/>
                <StatusArea style={{position:'absolute',right:'300px',width:'300px',top:'56px',bottom:0,background:'orange'}} />
                <DashboardArea style={{position:'absolute',bottom:0,height:'56px',left:0,right:'600px'}} />
            </div>
        );
    }
}


// WrappedMain


var injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const WrappedMain = (props) => (
    <MuiThemeProvider>
        <Main {...props} />
    </MuiThemeProvider>
);



import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions';
const mapStateToProps = state => ({
    gameState: state.game.state,
    playerShips: state.game.playerShips,
    playerShots: state.game.playerShots,
    opponentShips: state.game.opponentShips,
    opponentShots: state.game.opponentShots,
    gameHistory: state.game.history
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions,dispatch)
});

export default connect(mapStateToProps,mapDispatchToProps)(WrappedMain);
