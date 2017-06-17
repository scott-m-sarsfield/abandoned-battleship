import {
    START_GAME,
    UPDATE_GAME_STATE,
    REPORT_GAME_EVENT
} from '../constants/ActionTypes';


const initialState = {
    facilitator: null,
    state: null,
    playerShips: {},
    opponentShips: {},
    playerShots: [],
    opponentShots: [],

    history:[]
};


const PLAYER_COLOR = "#6bf";
const OPPONENT_COLOR = "#f66";

function history(state=[],action){
    console.log(action);

    function concatNewArray(arr,item){
        var ns = [].concat(arr);
        ns.push(item);
        return ns;
    }

    function getPlayerColor(player){
        return (player === "PLAYER") ? PLAYER_COLOR : OPPONENT_COLOR;
    }

    function intToAlpha(i){
        return String.fromCharCode('A'.charCodeAt(0)+i);
    }

    function formatCoordinate(x,y){
        return "[" + intToAlpha(x) + "," + y + "]";
    }

    switch(action.type){

        case "GAME_STARTED":
            return concatNewArray(state,{
                message: "Game Started."
            });

        case "SHOT_HIT":
        case "SHOT_MISS":
            return concatNewArray(state,{
                message: action.player + (action.type === "SHOT_HIT" ? " hit" : " missed") +  " @ " + formatCoordinate(action.x,action.y),
                color: getPlayerColor(action.player)
            });

        case "SHIP_SUNK":
            return concatNewArray(state,{
                message: action.player + " sunk " + action.ship.type,
                color: getPlayerColor(action.player)
            });

        case "GAME_OVER":
            return concatNewArray(state,{
                message:"Game Over. -- " + action.player + " wins!"
            });


        default:
            return state;
    }
}

export function game(state=initialState,action){

    let facilitator;

    switch(action.type){
        case START_GAME:
            facilitator = action.facilitator;
            return {
                ...state,
                facilitator
            };

        case UPDATE_GAME_STATE:
            return {
                ...state,
                state: action.state,
                playerShips: action.playerShips,
                opponentShips: action.opponentShips,
                playerShots: action.playerShots,
                opponentShots: action.opponentShots,
            };

        case REPORT_GAME_EVENT:
            return {
                ...state,
                history: history(state.history, action.event)
            };

        default:
            break;
    }

    return state;
}
