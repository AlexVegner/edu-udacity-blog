import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import MainMenu from './MainMenu';
import Home from '../components/Home';
import PostDetail from './PostDetail';
import CreatePost from './CreatePost';
import { Container } from 'semantic-ui-react';

const App = ({ store }) => {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Container>
          <MainMenu />
          <Route exact path="/" component={Home} />
          <Route exact path="/create-post" component={CreatePost} />
          <Route exact path="/topic/:category" component={Home} />
          <Route exact path="/topic/:category/:post_id" component={PostDetail} />
        </Container>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
