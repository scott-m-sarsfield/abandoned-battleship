import * as types from '../constants/ActionTypes';

import CPUGameFacilitator from '../utils/facilitators/CPUGameFacilitator';
import MY_SHIPS from '../utils/facilitators/ShipLayoutOne';

function updateGameStateFromFacilitator(dispatch,facilitator){
    dispatch(({
        type: types.UPDATE_GAME_STATE,
        state: facilitator.getState(),
        playerShips: facilitator.getPlayerShips(),
        opponentShips: facilitator.getOpponentShips(),
        playerShots: facilitator.getPlayerShots(),
        opponentShots: facilitator.getOpponentShots()
    }));
}

export const reportGameEvent = (evt) => ({type:types.REPORT_GAME_EVENT, event: evt});

export const startGame = () => {
    return (dispatch) => {

        let game = new CPUGameFacilitator({
            actions:{
                addGameHistory: arr=>{
                    arr.forEach(i=>{
                        dispatch(reportGameEvent(i));
                    });
                },
                setGameState:()=>{
                    //eslint-disable-next-line
                    try{
                        if(window.GAME) window.GAME.drawOpponentBoard();
                    }catch(e){/*nothing*/}
                }
            }
        });

        try{
            window.GAME = game;
        }catch(e){/*nothing*/}


        game.setShipPositions(MY_SHIPS);


        dispatch({
            type: types.START_GAME,
            facilitator: game
        });
        updateGameStateFromFacilitator(dispatch,game);
    };
};

export const shootCell = (x,y) => {
    return (dispatch,getStore) => {
        const store = getStore();
        const facilitator = store.game.facilitator;
        facilitator.shootCell(x,y);

        updateGameStateFromFacilitator(dispatch,facilitator);
    };
};
