import React, { Component } from 'react';
import { Menu, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchCategories } from '../actions/categories';
import { ALL_POSTS, CREATE_POST } from '../util/Constants'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'


class MainMenu extends Component {
  componentWillMount() {
    this.props.fetchMenuItens();
  }

  render() {
    const { categories, activeMenu } = this.props;
    console.log('__this.props.location.pathname', this.props.location.pathname)
    const path = this.props.location.pathname
    return (
      <Menu color="blue">
        <Link to="/">
          <Menu.Item name={ALL_POSTS} active={path === '/'}>
            All
          </Menu.Item>
        </Link>
        {
          categories.map(category => (
            <Link to={'/topic/'+category.path} key={category.path}>
              <Menu.Item name={category.name} active={path.includes("/topic/") && category.path === activeMenu}>
                {category.name}
              </Menu.Item>
            </Link>
          ))
        }
        <Menu.Menu position='right'>
          <Link to="/create-post">
            <Menu.Item position='right' name={CREATE_POST} active={path === '/create-post'}>
              Create Post
            </Menu.Item>
          </Link>
        </Menu.Menu>
      </Menu>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories,
    activeMenu: state.activeMenu
  };
};

const mapDispatchToProps = dispatch => ({
  fetchMenuItens() {
    dispatch(fetchCategories());
  }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainMenu));
