/* jshint esversion:6 */

var React = require('react');
var ReactDOMServer = require('react-dom/server');

import Main from '../../src/components/Main';
import {Provider} from 'react-redux';
import store from '../../src/store';

let main = React.createElement(
    Provider,
    {store:store},
    React.createElement(Main)
);

export default {
    content: ReactDOMServer.renderToString(main)
};
