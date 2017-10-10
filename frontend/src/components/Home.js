import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import { ALL_POSTS } from '../util/Constants';
import { activateMenu } from '../actions/menu';
import { fetchAllPosts } from '../actions/posts';
import SortedPosts from './PostsList';

class Home extends Component {

  componentWillMount() {
    const category = this.props.match.params.category;
    if (category) {
      this.props.activate(category);
      this.props.fetchPosts(category);
    } else {
      this.props.fetchPosts();
      this.props.activate(ALL_POSTS);
    }
  }

  componentWillReceiveProps(nextProps) {
    const category = nextProps.match.params.category;
    if (category) {
      this.props.activate(category);
      this.props.fetchPosts(category);
    } else {
      this.props.fetchPosts();
      this.props.activate(ALL_POSTS);
    }
  }

  render() {
    return (
      <Container fluid>
        <SortedPosts />
      </Container>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  activate(menu) {
    dispatch(activateMenu(menu));
  },
  fetchPosts() {
    dispatch(fetchAllPosts());
  }
});

export default connect(null, mapDispatchToProps)(Home);
