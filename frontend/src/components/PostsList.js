import { connect } from 'react-redux';
import { ALL_POSTS } from '../util/Constants';
import { voteOnPost } from '../actions/posts';
import React, { Component } from 'react';
import PostItem from './PostItem';
import { Item, Container, Button } from 'semantic-ui-react';
import { sortPostsBy } from '../actions/posts';
import { TIMESTAMP, VOTE_SCORE } from '../util/Constants';

class Posts extends Component {

  handleSorting = (e, target) => {
    const { sortBy } = this.props;
    sortBy(target.name);
  };

  renderOrderBy = () => {
    const { sorting } = this.props;
    return (
      <Container textAlign="center">
        <Button.Group size="small">
          <Button
            basic={sorting !== VOTE_SCORE}
            color='blue'
            name={VOTE_SCORE}
            onClick={this.handleSorting}
            active={sorting === VOTE_SCORE}
          >
            Sort by votes
          </Button>
          <Button.Or />
          <Button
            basic={sorting !== TIMESTAMP}
            color='blue'
            name={TIMESTAMP}
            onClick={this.handleSorting}
            active={sorting === TIMESTAMP}
          >
            Sort by date
          </Button>
        </Button.Group>
      </Container>
    )
  }

  render() {
    const { posts, voteAction } = this.props;
    return (
      <Container fluid>
        {this.renderOrderBy()}
        <Item.Group divided>
          {posts.map(post => (
            <PostItem key={post.id} post={post} voteAction={voteAction} />
          ))}
        </Item.Group>
      </Container>
    );
  }
}

const getPosts = (posts, field, activeCategory) => {
  switch (activeCategory) {
    case ALL_POSTS:
      return posts.slice().sort((a, b) => b[field] - a[field]);
    default:
      return posts
        .filter(post => post.category === activeCategory)
        .sort((a, b) => b[field] - a[field]);
  }
};

const mapStateToProps = state => {
  const posts = Object.keys(state.posts).map(key => state.posts[key]);
  return {
    posts: getPosts(posts, state.postsSorting, state.activeMenu),
    sorting: state.postsSorting,
  };
};

const mapDispatchToProps = dispatch => ({
  voteAction: (id, vote) => {
    dispatch(voteOnPost(id, vote));
  },
  sortBy(sortBy) {
    dispatch(sortPostsBy(sortBy));
  }
});

const PostsList = connect(mapStateToProps, mapDispatchToProps)(Posts);

export default PostsList;
