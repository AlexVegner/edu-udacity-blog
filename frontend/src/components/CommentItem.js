import React from 'react';
import { Item } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Form, Dropdown, Input, Segment, TextArea, Button, Icon } from 'semantic-ui-react'

const CommentItem = ({ comment, voteAction, editComment, deleteComment, selectedId }) => {
  const date = new Date(comment.timestamp).toLocaleString();

  const handleVote = vote => {
    voteAction(comment.id, vote);
  };

  function handleEdit () {
    editComment(comment.id)
  }

  function handleDelete () {
    deleteComment(comment.id)
  }

  const containerStyle = (selectedId && comment.id === selectedId) ? {backgroundColor: '#ECF8FF', padding: 10} : null

  return (
    <Item style={containerStyle}>
      <Item.Content>
        <Item.Meta>
            <span>
              <strong>{comment.author}</strong> - {date}
            </span>
        </Item.Meta>
        <Item.Description style={styles.bodyMargin}>{comment.body}</Item.Description>

        <Button.Group floated='right'>
          <Button
            basic
            color='blue'
            icon='edit'
            onClick={() => handleEdit()}/>

          <Button
            basic
            color='red'
            icon='remove'
            onClick={() => handleDelete()}/>
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
            {comment.voteScore}
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

export default CommentItem;


const styles = {
  bodyMargin: {
    marginBottom: 10,
  },
  buttonMargin: {
    marginRight: 30,
  },
};