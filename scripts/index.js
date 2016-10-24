// Polyfills
require('babel-polyfill');
require('classlist-polyfill');

// Modules
const React = require('react');
const ReactDOM = require('react-dom');

ReactDOM.render(
    <div>
        <p>Oh, hey!</p>
        <img src="./images/thumbs.gif" />
    </div>,
    document.querySelector('#app')
);

async function hey() {
    console.log('Hey!');
}
