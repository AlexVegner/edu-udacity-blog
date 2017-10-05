import React from 'react';
import { Item } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Button from 'semantic-ui-react/dist/es/elements/Button/Button'

const PostItem = ({ post, voteAction }) => {
  const postDate = new Date(post.timestamp).toLocaleString();

  const handleVote = vote => {
    voteAction(post.id, vote);
  };

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
        <Item.Description>{post.body}</Item.Description>
        <Item.Extra>
          <Button
            floated="right"
            basic
            color='blue'
            content='Like'
            icon='heart'
            label={{ basic: true, color: 'blue', pointing: 'left', content: post.voteScore }}
            onClick={() => handleVote('upVote')}
          />
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};

export default PostItem;
