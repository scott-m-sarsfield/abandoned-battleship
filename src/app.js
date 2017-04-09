var React = require('react');
var ReactDOM = require('react-dom');

import {Provider} from 'react-redux';
import store from './store';

import Main from './components/Main';

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
