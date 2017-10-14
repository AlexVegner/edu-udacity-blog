import React, { Component} from 'react';
import { Form, Input, Segment, TextArea, Button, Label, Item } from 'semantic-ui-react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../actions/categories';
import { createPost, editPost, voteOnPost, deletePost  } from '../actions/posts';
import uuid from 'uuid/v1';
import * as ReadableApi from '../util/ReadableApi'
import { voteOnComment } from '../util/ReadableApi'
import { deleteComment } from '../util/ReadableApi'
import CommentItem from './CommentItem'

class PostDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      beforeSubmit: true,
      post: {
        id: typeof this.props.match !== 'undefined' ? this.props.match.params.post_id : null,
        title: '',
        author: '',
        category: '',
        body: '',
      },
      comments: [],
      editComment: this.getEmptyComment(),
      editCommentErrors: {}
    };
  }

  componentWillMount() {
    this.refreshPost()
    this.refreshComments()
  }

  componentDidMount() {
  }

  getEmptyComment = () => {
    return {
      body:	'',
      author:	'',
    }
  }


  handlePostVote = vote => {
    this.props.votePostAction(this.state.post.id, vote);
    this.refreshPost()
  };

  refreshPost = () => {
    console.log('__refreshPost')
    ReadableApi.getPost(this.state.post.id).then(post => {
      console.log('__post', post)
      this.setState({post})
    })
  }

  refreshComments = () => {
    ReadableApi.getPostComments(this.state.post.id).then(comments => this.setState({comments}))
  }

  handleEditPost = () => {
    this.props.history.push(`/edit-post/${this.state.post.id}`)
  }

  handleDeletePost = () => {
    this.props.deletePost(this.state.post.id)
    this.props.history.push(`/`)
  }

  handleCommentVote = (commentId, vote) => {
    ReadableApi.voteOnComment(commentId, vote).then(() => this.refreshComments())
  };

  handleEditComment = (comment) => {
    this.setState({
      editComment: comment,
    })
  }

  handleDeleteComment = (comment) => {
    ReadableApi.deleteComment(comment.id).then(() => this.refreshComments())
  }

  handleUpdateComment = () => {
    const {author, body} = this.state.editComment

    this.setState({editCommentErrors: {
      author: !author,
      body: !body
    }})

    if (!author || !body) return

    if (this.state.editComment.id) {
      const comment = {
        ...this.state.editComment,
      }
      ReadableApi.createComment(comment).then(() => {
        this.setState({editComment: this.getEmptyComment()})
        this.refreshComments()
      })
    } else {
      const comment = {
        ...this.state.editComment,
        id: this.state.editComment.id ? this.state.editComment.id : uuid(),
        timestamp: new Date().getTime(),
        voteScore: 0,
        parentId: this.state.post.id
      }
      ReadableApi.createComment(comment).then(() => {
        this.setState({editComment: this.getEmptyComment()})
        this.refreshComments()
      })
    }
  }

  render() {
    const postDate = new Date(this.state.post.timestamp).toLocaleString();
    const currentCommentId = this.state.editComment.id
    return (
      <div style={styles.container}>

        <h1 style={styles.header}>POST DETAILS</h1>
        <Item>
          <Item.Content>
            <Link to="/postform">
              <Item.Header className="ui header">{this.state.post.title}</Item.Header>
              <Item.Meta>
            <span>
              <strong>{this.state.post.author}</strong> - {postDate}
            </span>
              </Item.Meta>
            </Link>
            <Item.Description style={styles.bodyMargin}>{this.state.post.body}</Item.Description>

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
                onClick={() => this.handlePostVote('upVote')} />

              <Button
                basic
                color='blue'
              >
                {this.state.post.voteScore}
              </Button>
              <Button
                basic
                color='blue'
                icon='thumbs down'
                onClick={() => this.handlePostVote('downVote')} />
            </Button.Group >

          </Item.Content>
        </Item>

        <Form.Field inline>
          <Label
            basic
            style={{marginLeft: 10, marginRight: 8}}
            pointing='right'
            color={this.state.editCommentErrors.author ? 'red' : null}>
              Author:
          </Label>
          <Input

            placeholder='Enter Author'
            value={this.state.editComment.author}
            onChange={(event) => {
              this.setState({
                editComment: {
                  ...this.state.editComment,
                  author: event.target.value
                },
              });
            }} />

          <Label
            basic
            style={{marginLeft: 10, marginRight: 8}}
            pointing='right'
            color={this.state.editCommentErrors.body ? 'red' : null}>
            Comment:
          </Label>
          <Input
            style={{}}
            placeholder='Enter Comment'
            value={this.state.editComment.body}
            onChange={(event) => {
              this.setState({
                editComment: {
                  ...this.state.editComment,
                  body: event.target.value
                },
              });
            }} />
          <Button style={{marginLeft: 20} } color='blue' onClick={this.handleUpdateComment}>{'Send comment'}</Button>
          {(!this.state.beforeSubmit && this.state.post.author === '') && (<Label basic color='red' pointing='left'>Please enter a value</Label>)}
        </Form.Field>

        {(this.state.comments.length > 0) && (<h4 style={styles.subHeader}>COMMENTS</h4>)}

        <Item.Group divided>
          {this.state.comments.map(comment => (
            <CommentItem
              style={{backgroundColor: '8ED1FC'}}
              key={comment.id}
              comment={comment}
              voteAction={(commentId, vote) => this.handleCommentVote(commentId, vote)}
              editComment={() => this.handleEditComment(comment)}
              deleteComment={() => this.handleDeleteComment(comment)}
              selectedId={currentCommentId}/>
          ))}
        </Item.Group>
      </div>)
  }

  // handleCreatePost = () => {
  //   console.log('____handleCreatePost')
  //
  //   this.setState({beforeSubmit: false});
  //
  //   const {title, author, category, body} = this.state.post
  //
  //   if(!title || !body || !author || !category) {
  //     return
  //   }
  //
  //   const post = {
  //     ...this.state.post,
  //     id: this.state.post.id ? this.state.post.id : uuid(),
  //     timestamp: new Date().getTime(),
  //     voteScore: this.state.post.id ? this.state.post.voteScore : 0,
  //   }
  //
  //
  //   console.log('this.state.post.id', this.state.post.id)
  //
  //
  //   if (this.state.post.id) {
  //     console.log('editPost')
  //     this.props.editPost(post, this.props.history);
  //   } else {
  //     console.log('createPost')
  //     this.props.createPost(post, this.props.history);
  //   }
  // }
}

const mapStateToProps = state => {
  return {
    categories: state.categories,
  };
};

const mapDispatchToProps = dispatch => ({
  createPost(post, history) {
    dispatch(createPost(post, history));
  },
  votePostAction: (id, vote) => {
    dispatch(voteOnPost(id, vote));
  },
  voteCommentAction: (id, vote) => {
    dispatch(voteOnComment(id, vote));
  },
  deletePost: (id) => {
    console.log('deletePost', id)
    dispatch(deletePost(id));
  },
  deleteComment: (id) => {
    dispatch(deleteComment(id));
  },

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetails));

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    justifyContent: 'center'
  },
  subHeader: {
    display: 'flex',
    justifyContent: 'center',
    color: 'grey'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    color: 'grey'
  },
  input: {
  },
  dropdown: {
  },
  textArea: {
    display: 'flex',
    width: '80%',
    minHeight: 80,
  },
  buttonSegment: {
    display: 'flex',
    justifyContent: 'center'
  },
  error: {
    borderColor: 'red'
  },
  bodyMargin: {
    marginBottom: 10,
  },
  buttonMargin: {
    marginRight: 30,
  },
  leftMargin: {
    marginLeft: 10,
  }
};