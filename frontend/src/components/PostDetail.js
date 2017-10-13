// import React from 'react';
// import { Form, Dropdown, Input, Segment, TextArea, Button, Label } from 'semantic-ui-react'
//
//
// class PostDetail extends Component {
//
//   componentWillMount() {
//     const postId = this.props.match.params.post_id;
//     if (category) {
//       this.props.activate(category);
//       this.props.fetchPosts(category);
//     } else {
//       this.props.fetchPosts();
//       this.props.activate(ALL_POSTS);
//     }
//   }
//
//
//   render () {
//     return (
//       <div style={styles.container}>
//
//         <h1 style={styles.header}>CREATE POST</h1>
//         <Form>
//           <Segment.Group>
//             <Segment>
//               <h4 style={styles.label}>Title:</h4>
//               <Form.Field inline>
//                 <Input
//                   style={styles.input}
//                   placeholder='Enter Title'
//                   value={post.title}
//                 />
//               </Form.Field>
//             </Segment>
//             <Segment>
//               <h4 style={styles.label}>Author:</h4>
//
//               <Form.Field inline>
//                 <Input
//                   style={styles.input}
//                   placeholder='Enter Author'
//                   value={post.author}/>
//               </Form.Field>
//             </Segment>
//             <Segment>
//               <h4 style={styles.label}>Category:</h4>
//               <Form.Field inline>
//                 <Dropdown
//                   style={styles.dropdown}
//                   button
//                   basic
//                   floating
//                   value={post.category}
//                 />
//               </Form.Field>
//
//             </Segment>
//             <Segment>
//               <h4 style={styles.label}>Body:</h4>
//
//               <Form.Field>
//               <TextArea
//                 style={styles.textArea}
//                 placeholder='Enter Body'
//                 value={post.body}
//                 onChange={(event) => {
//                   this.setState({body: event.target.value});
//                 }} />
//               </Form.Field>
//             </Segment>
//             <Segment style={styles.buttonSegment}>
//               <Button color='blue' onClick={this.handleCreatePost}>Create</Button>
//
//             </Segment>
//           </Segment.Group>
//         </Form>
//       </div>
//     );
//   }
//
//
// };
//
// export default PostDetail;
//
//
// const styles = {
//   container: {
//     display: 'flex',
//     flexDirection: 'column',
//   },
//   header: {
//     display: 'flex',
//     justifyContent: 'center'
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//   },
//   label: {
//     color: 'grey'
//   },
//   input: {
//   },
//   dropdown: {
//   },
//   textArea: {
//     display: 'flex',
//     width: '80%',
//     minHeight: 80,
//   },
//   buttonSegment: {
//     display: 'flex',
//     justifyContent: 'center'
//   },
//   error: {
//     borderColor: 'red'
//   }
// };