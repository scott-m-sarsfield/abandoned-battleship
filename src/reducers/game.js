import {
    START_GAME
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
                facilitator,

                state: facilitator.getState(),
                playerShips: facilitator.getPlayerShips(),
                opponentShips: facilitator.getOpponentShips(),
                playerShots: facilitator.getPlayerShots(),
                opponentShots: facilitator.getOpponentShots()
            };

        default:
            break;
    }

    // don't go any further w/o facilitator
    if(!state.facilitator) return state;

    return {
        ...state,

        state: state.facilitator.getState(),
        playerShips: state.facilitator.getPlayerShips(),
        opponentShips: state.facilitator.getOpponentShips(),
        playerShots: state.facilitator.getPlayerShots(),
        opponentShots: state.facilitator.getOpponentShots()
    };
}
