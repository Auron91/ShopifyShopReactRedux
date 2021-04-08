import React, { Component } from "react";
import { Container, Icon, Input, Image, Menu, Label } from "semantic-ui-react";
import { Link } from 'react-router-dom'

export default class Header extends Component {
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
    return (
      <Menu>
        <Container>
          <Menu.Item>
            <Image src='/images/logo.jpg' size='tiny' />
          </Menu.Item>
          <Menu.Item
            as={Link}
            to='/'
            name='home'
            active={activeItem === 'home'}
            onClick={this.handleItemClick}>
          </Menu.Item>
          <Menu.Item
            as={Link}
            to='/shop'
            name='shop'
            active={activeItem === 'shop'}
            onClick={this.handleItemClick}
          />

          <Menu.Menu position='right'>
            <Menu.Item>
              <Input icon='search' placeholder='Search..' />
            </Menu.Item>
            <Menu.Item>
              <Label className="shopingCartLabel" color='red'>2</Label>
              <Icon size='big' name='shopping cart' />
                569.98 $
              </Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>
    );
  }
}
