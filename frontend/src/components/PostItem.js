import React from 'react';
import { Item } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Form, Dropdown, Input, Segment, TextArea, Button, Icon } from 'semantic-ui-react'

const PostItem = ({ post, voteAction, editPost, deletePost }) => {
  const postDate = new Date(post.timestamp).toLocaleString();

  const handleVote = vote => {
    voteAction(post.id, vote);
  };

  function handleEditPost () {
    editPost(post.id)
  }

  function handleDeletePost () {
    deletePost(post.id)
  }

  return (
    <Item>
      <Item.Content>
        <Link to="/postform">
          <Item.Header className="ui header">{post.title}</Item.Header>
          <Item.Meta>
            <span>
              <strong>{post.author}</strong> - {postDate}
            </span>
          </Item.Meta>
        </Link>
        <Item.Description style={styles.bodyMargin}>{post.body}</Item.Description>

        <Button.Group floated='right'>
          <Button
            basic
            color='blue'
            icon='edit'
            onClick={() => handleEditPost()}/>

          <Button
            basic
            color='red'
            icon='remove'
            onClick={() => handleDeletePost()}/>
        </Button.Group>

        <Button.Group floated='right' style={styles.buttonMargin}>
          <Button
            basic
            color='blue'
            icon='thumbs up'
            onClick={() => handleVote('upVote')} />

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
            onClick={() => handleVote('downVote')} />
        </Button.Group >

      </Item.Content>
    </Item>
  );
};

export default PostItem;


const styles = {
  bodyMargin: {
    marginBottom: 10,
  },
  buttonMargin: {
    marginRight: 30,
  },
};