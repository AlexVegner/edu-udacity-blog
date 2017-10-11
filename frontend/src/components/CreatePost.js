import React, { Component} from 'react';
import { Form, Dropdown, Input, Segment, TextArea, Button, Label } from 'semantic-ui-react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import { fetchCategories } from '../actions/categories';
import { createPost } from '../actions/posts';
import uuid from 'uuid/v1';

class CreatePost extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      author: '',
      category: '',
      body: '',
      beforeSubmit: true,
    };
  }

  componentWillMount() {
    this.props.fetchCategories();
  }

  render() {
    const selectCategories = this.props.categories.map((category) => {
     return  { key: category.path, text: category.name, value: category.path }
    })

    console.log(this.state)
    return (
      <div style={styles.container}>

        <h1 style={styles.header}>CREATE POST</h1>
        <Form>
          <Segment.Group>
          <Segment>
            <h4 style={styles.label}>Title:</h4>
            <Form.Field inline>
              <Input
                style={styles.input}
                placeholder='Enter Title'
                value={this.state.title}
                onChange={(event) => {
                  this.setState({title: event.target.value});
                }}
              />
              {(!this.state.beforeSubmit && this.state.title === '') && (<Label basic color='red' pointing='left'>Please enter a value</Label>)}
            </Form.Field>
          </Segment>
          <Segment>
            <h4 style={styles.label}>Author:</h4>

            <Form.Field inline>
              <Input
                style={styles.input}
                placeholder='Enter Author'
                value={this.state.author}
                onChange={(event) => {
                  this.setState({author: event.target.value});
                }} />
              {(!this.state.beforeSubmit && this.state.author === '') && (<Label basic color='red' pointing='left'>Please enter a value</Label>)}
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
                value={this.state.category}
                onChange={(event, data) => {
                  const { name, value } = data
                  this.setState({category: value});
                }} />
              {(!this.state.beforeSubmit && this.state.category === '') && (<Label basic color='red' pointing='left'>Please enter a value</Label>)}
            </Form.Field>

          </Segment>
          <Segment>
            <h4 style={styles.label}>Body:</h4>

            <Form.Field>
              <TextArea
                style={{...styles.textArea, ...((!this.state.beforeSubmit && this.state.body === '') ? styles.error : {})}}
                placeholder='Enter Body'
                value={this.state.body}
                onChange={(event) => {
                  this.setState({body: event.target.value});
                }}
                error={!this.state.beforeSubmit && this.state.body === ''} />
              {(!this.state.beforeSubmit && this.state.body === '') && (<Label basic color='red' pointing>Please enter a value</Label>)}
            </Form.Field>
          </Segment>
          <Segment style={styles.buttonSegment}>
            <Button color='blue' onClick={this.handleCreatePost}>Create</Button>

          </Segment>
        </Segment.Group>
      </Form>
    </div>)
  }

  handleCreatePost = () => {

    this.setState({beforeSubmit: false});

    const {title, author, category, body} = this.state

    if(!title) {
      //this.msg.error('You need to name your post.')
      //return
    }

    if(!body) {
      //this.msg.error('You can\'t post a blank page (:')
      //return
    }

    if(!author) {
      //this.msg.error('You need to inform the author')
      //return
    }

    if(!category) {
      //this.msg.error('You need to inform a category')
      //return
    }

    // const post = {
    //   id: uuid(),
    //   title,
    //   body,
    //   author,
    //   category,
    //   timestamp: new Date().getTime(),
    //   voteScore: 0
    // }
    //
    // this.props.createPost(post);
    //
    // this.props.history.push("/")
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
  createPost() {
    dispatch(createPost());
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
    width: '50%'
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