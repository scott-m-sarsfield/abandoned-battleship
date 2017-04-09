var React = require('react'); // eslint-disable-line
var ReactDOM = require('react-dom');

import {Provider} from 'react-redux';
import store from './store';

import Main from './components/Main';

import GameFacilitator from './utils/facilitators/CPUGameFacilitator';
window.GAME = new GameFacilitator({
    actions:{
        addGameHistory: arr=>{
            arr.forEach(i=>{
                // eslint-disable-next-line
                console.log(i);
            });
        },
        setGameState:()=>{
            //eslint-disable-next-line
            if(window.GAME) window.GAME.drawOpponentBoard();
        }
    }

});

window.onload = ()=>{
    ReactDOM.render(
        (
            <Provider store={store}>
                <Main />
            </Provider>
        )
        ,document.getElementById('content')
    );
};
