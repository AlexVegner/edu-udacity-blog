import React, { Component} from 'react';
import { Form, Dropdown, Input, Segment, TextArea, Button, Label } from 'semantic-ui-react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import { fetchCategories } from '../actions/categories';
import { createPost, editPost } from '../actions/posts';
import uuid from 'uuid/v1';
import * as ReadableApi from '../util/ReadableApi'

class CreatePost extends Component {

  constructor(props) {
    super(props);
    this.state = {
      beforeSubmit: true,
      post: {
        title: '',
        author: '',
        category: '',
        body: '',
      }
    };
  }

  componentWillMount() {
    this.props.fetchCategories();
    const postId = typeof this.props.match !== 'undefined' ? this.props.match.params.post_id : null
    console.log('___postId', this.props.match)
    if (postId) {
      ReadableApi.getPost(postId).then(post => this.setState({post}))
    }
  }

  componentDidMount() {
    this.props.fetchCategories();
  }

  render() {
    const selectCategories = this.props.categories.map((category) => {
     return  { key: category.path, text: category.name, value: category.path }
    })

    console.log(this.state)
    return (
      <div style={styles.container}>

        <h1 style={styles.header}>{this.state.post.id ? 'EDIT POST' : 'CREATE POST'}</h1>
        <Form>
          <Segment.Group>
          <Segment>
            <h4 style={styles.label}>Title:</h4>
            <Form.Field inline>
              <Input
                style={styles.input}
                placeholder='Enter Title'
                value={this.state.post.title}
                onChange={(event) => {
                  this.setState({
                    post: {
                      ...this.state.post,
                      title: event.target.value
                    },
                  });
                }}
              />
              {(!this.state.beforeSubmit && this.state.post.title === '') && (<Label basic color='red' pointing='left'>Please enter a value</Label>)}
            </Form.Field>
          </Segment>
          <Segment>
            <h4 style={styles.label}>Author:</h4>

            <Form.Field inline>
              <Input
                style={styles.input}
                placeholder='Enter Author'
                value={this.state.post.author}
                onChange={(event) => {
                  this.setState({
                    post: {
                      ...this.state.post,
                      author: event.target.value
                    },
                  });
                }} />
              {(!this.state.beforeSubmit && this.state.post.author === '') && (<Label basic color='red' pointing='left'>Please enter a value</Label>)}
            </Form.Field>
          </Segment>
          <Segment>
            <h4 style={styles.label}>Category:</h4>
            <Form.Field inline>
              <Dropdown
                style={styles.dropdown}
                button
                basic
                floating
                options={selectCategories}
                value={this.state.post.category}
                onChange={(event, data) => {
                  const { name, value } = data
                  console.log('__value', value)
                  this.setState({
                    post: {
                      ...this.state.post,
                      category: value,
                    },
                  });
                }} />
              {(!this.state.beforeSubmit && this.state.post.category === '') && (<Label basic color='red' pointing='left'>Please enter a value</Label>)}
            </Form.Field>

          </Segment>
          <Segment>
            <h4 style={styles.label}>Body:</h4>

            <Form.Field>
              <TextArea
                style={styles.textArea}
                placeholder='Enter Body'
                value={this.state.post.body}
                onChange={(event) => {
                  this.setState({
                    post: {
                      ...this.state.post,
                      body: event.target.value,
                    },
                  });
                }} />
              {(!this.state.beforeSubmit && this.state.post.body === '') && (<Label basic color='red' pointing>Please enter a value</Label>)}
            </Form.Field>
          </Segment>
          <Segment style={styles.buttonSegment}>
            <Button color='blue' onClick={this.handleCreatePost}>{this.state.post.id ? 'Save' : 'Create'}</Button>

          </Segment>
        </Segment.Group>
      </Form>
    </div>)
  }

  handleCreatePost = () => {
    console.log('____handleCreatePost')

    this.setState({beforeSubmit: false});

    const {title, author, category, body} = this.state.post

    if(!title || !body || !author || !category) {
      return
    }

    const post = {
      ...this.state.post,
      id: this.state.post.id ? this.state.post.id : uuid(),
      timestamp: new Date().getTime(),
      voteScore: this.state.post.id ? this.state.post.voteScore : 0,
    }


    console.log('this.state.post.id', this.state.post.id)


    if (this.state.post.id) {
      console.log('editPost')
      this.props.editPost(post, this.props.history);
    } else {
      console.log('createPost')
      this.props.createPost(post, this.props.history);
    }
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchCategories() {
    dispatch(fetchCategories());
  },
  createPost(post, history) {
    dispatch(createPost(post, history));
  },
  editPost(post, history) {
    dispatch(editPost(post, history));
  }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreatePost));

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    justifyContent: 'center'
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
  }
};