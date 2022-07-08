import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/App";

function Example() {
    return (
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}

export default Example;

if (document.getElementById('app')) {
    ReactDOM.render(<Example />, document.getElementById('app'));
}
