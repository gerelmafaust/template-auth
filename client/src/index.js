import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
// import 'font-awesome/css/font-awesome.min.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import './styles/style.css';

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('root')
);
registerServiceWorker();
