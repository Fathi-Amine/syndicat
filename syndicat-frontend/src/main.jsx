import React from 'react'
import {Provider} from 'react-redux'
import store, {persistor} from "./Store.js";
import ReactDOM from 'react-dom/client'
import {BrowserRouter as Router} from "react-router-dom";
import App from './App.jsx'
import './index.css'
import {PersistGate} from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Router>
                <App />
              </Router>
        </PersistGate>
    </Provider>
)
