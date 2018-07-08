import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Item, Form, Dropdown, Input, Segment, TextArea, Button, Icon } from 'semantic-ui-react'
import * as ReadableApi from '../util/ReadableApi'


export default class PostItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      comments: [],
    };
  }

  componentDidMount() {
    this.refreshComments()
  }

  handleVote = vote => {
    this.props.voteAction(this.props.post.id, vote)
  };

  handleEditPost () {
    this.props.editPost(this.props.post.id)
  }

  handleDeletePost () {
    this.props.deletePost(this.props.post.id)
  }

  refreshComments = () => {
    ReadableApi.getPostComments(this.props.post.id).then(comments => this.setState({comments}))
  }

  render() {
    const { post } = this.props
    const postDate = new Date(post.timestamp).toLocaleString();
    const commentsCount = this.state.comments.length
    return (
      <Item>
        <Item.Content>
          <Link to={`/post/${post.id}`}>
            <Item.Header className="ui header">{post.title}</Item.Header>
            <Item.Meta>
            <span>
              <strong>{post.author}</strong> - {postDate}
            </span>
              <span>
            </span>
            </Item.Meta>
          </Link>
          <Item.Description style={styles.bodyMargin}>{post.body}</Item.Description>
          <Button.Group floated='right'>

            <Button
              basic
              color='blue'
              icon='edit'
              onClick={() => this.handleEditPost()}/>

            <Button
              basic
              color='red'
              icon='remove'
              onClick={() => this.handleDeletePost()}/>
          </Button.Group>

          <Button.Group floated='right' style={styles.buttonMargin}>
            <Button
              basic
              color='blue'
              icon='thumbs up'
              onClick={() => this.handleVote('upVote')} />

            <Button
              basic
              color='blue'
            >
              {post.voteScore}
            </Button>
            <Button
              basic
              color='blue'
              icon='thumbs down'
              onClick={() => this.handleVote('downVote')} />
          </Button.Group >

          <Link to={`/post/${post.id}`}>
            <Button
              style={styles.buttonMargin}
              floated='right'
              basic
              color='blue'
              content='Comments'
              icon='comments'
              label={{ as: 'a', basic: true, color: 'blue', pointing: 'left', content: commentsCount }}
            />
          </Link>


        </Item.Content>
      </Item>
    );
  }
};

const styles = {
  bodyMargin: {
    marginBottom: 10,
  },
  buttonMargin: {
    marginRight: 30,
  },
};