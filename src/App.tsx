import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import './App.css';

import {RoomProvider} from './context/roomContext';
import Lobby from './components/lobby';

function App() {

    return (
        <RoomProvider>
            <Router>
                <Switch>
                    <Route path="/room/:roomId">
                        <Lobby />
                    </Route>
                    <Route path="/">
                        <Lobby />
                    </Route>
                </Switch>
            </Router>
        </RoomProvider>
    );
}

export default App;
