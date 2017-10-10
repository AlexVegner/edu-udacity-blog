import React, { Component} from 'react';
import { Form, Dropdown, Input, Segment, TextArea, Button } from 'semantic-ui-react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import { fetchCategories } from '../actions/categories';

class CreatePost extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      author: '',
      category: '',
      body: '',
    };
  }

  componentWillMount() {
    this.props.fetchMenuItens();
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
            <Input
              style={styles.input}
              placeholder='Enter Title'
              value={this.state.title}
              onChange={(event) => {
                this.setState({title: event.target.value});
              }} />
          </Segment>
          <Segment>
            <h4 style={styles.label}>Author:</h4>
            <Input
              style={styles.input}
              placeholder='Enter Author'
              value={this.state.author}
              onChange={(event) => {
                this.setState({author: event.target.value});
              }} />
          </Segment>
          <Segment>
            <h4 style={styles.label}>Category:</h4>
            <Dropdown
              style={styles.input}
              button
              basic
              floating
              options={selectCategories}
              value={this.state.category}
              onChange={(event, data) => {
                const { name, value } = data
                this.setState({category: value});
              }
            // ...
          }
            />
          </Segment>
          <Segment>
            <h4 style={styles.label}>Body:</h4>
            <TextArea
              style={styles.textArea}
              placeholder='Enter Body'
              value={this.state.body}
              onChange={(event) => {
                this.setState({body: event.target.value});
              }} />
          </Segment>
          <Segment style={styles.buttonSegment}>
            <Button color='blue'>Create</Button>

          </Segment>
        </Segment.Group>
      </Form>
    </div>)
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchMenuItens() {
    dispatch(fetchCategories());
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
  textArea: {
    display: 'flex',
    width: '80%',
    minHeight: 80
  },
  buttonSegment: {
    display: 'flex',
    justifyContent: 'center'
  }
};