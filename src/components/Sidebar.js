import React, { Component } from "react";
import { Header, List, Segment } from "semantic-ui-react";

export default class Sidebar extends Component {
  render() {
    return (
      <Segment>
        <Header as='h2'>Shoes</Header>
        <List>
            <List.Item>Men</List.Item>
            <List.Item>Women</List.Item>
        </List>
      </Segment>
    );
  }
}
