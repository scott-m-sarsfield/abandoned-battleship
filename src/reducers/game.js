import {
    START_GAME,
    UPDATE_GAME_STATE
} from '../constants/ActionTypes';


const initialState = {
    facilitator: null
};

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

        default:
            break;
    }

    return state;
}
