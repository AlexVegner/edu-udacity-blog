import React from 'react';
import { Provider } from 'react-redux';
import { Router, BrowserRouter, Route } from 'react-router-dom';
import MainMenu from './MainMenu';
import Home from '../components/Home';
import PostDetail from './PostDetail';
import PostForm from './PostForm';
import { Container } from 'semantic-ui-react';
import configureStore from '../store/configureStore';
import createHistory from 'history/createBrowserHistory'
import { createBrowserHistory } from 'history';

const history = createHistory() // <-- createHistory() call
const store = configureStore(createBrowserHistory) // <-- createHistory() response passed to create store

const App = () => {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Container>
          <MainMenu />
          <Route exact path="/" component={Home} />
          <Route exact path="/create-post" component={PostForm} />
          <Route exact path="/edit-post/:post_id" component={PostForm} />
          <Route exact path="/topic/:category" component={Home} />
          <Route exact path="/post/:post_id" component={PostDetail} />
        </Container>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
