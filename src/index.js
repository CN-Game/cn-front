import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/Home';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import Game from './components/Game'
import WaitingRoom from './components/WaitingRoom';
import GlobalStyle from './theme/globalStyle';
import { Provider } from 'react-redux';
import store from './redux/store/store';

const Routing = () => {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/waiting-room/:id">
            <WaitingRoom />
          </Route>
          <Route path="/game/:id" component={Game} />
          <Route path="*">
            {/*<404 component />*/}
          </Route>
        </Switch>
      </Router>
    </>
  )
};

ReactDOM.render(
    <Provider store={store}>
        <Routing />
    </Provider>,
    document.getElementById('root')
);
