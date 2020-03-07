import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Route, HashRouter as Router, Switch } from 'react-router-dom'
import Game from './components/Game'
import WaitingRoom from './components/WaitingRoom';
import GlobalStyle from './theme/globalStyle';

const Routing = () => {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/waiting-room/:id">
            <WaitingRoom />
          </Route>
          <Route path="/game/:id" component={Game} />
        </Switch>
      </Router>
    </>
  )
}

ReactDOM.render(<Routing />, document.getElementById('root'));
