import React from 'react';
import { Dropdown, Grid, Header, Segment, Icon } from 'semantic-ui-react';
import { toggleView, toggleSort } from '../redux/actions';
import { connect } from 'react-redux';


class FilterBar extends React.Component {
  state = {}

  render() {
    return (
      <Segment>
        <Grid>
          <Grid.Column width={2} className="vertical-align-middle">
            <Header as="h4" >Sort by:</Header>
          </Grid.Column>
          <Grid.Column width={4}>
            <Dropdown
              className='filterDropdown'
              placeholder="Most popular"
              fluid
              selection
              options={this.props.options}
              value={this.props.sort}
              onChange={(e, data) => {this.props.toggleSort(data.value)}}
            />
          </Grid.Column>
          <Grid.Column width={8}>

          </Grid.Column>
          <Grid.Column width={2} className="vertical-align-middle" >
            <Icon
              link
              name='grid layout'
              size='big'
              color={this.props.view === 'grid layout' ? 'blue' : 'grey'}
              onClick={() => {this.props.toggleView('grid layout')}}
            />
            <Icon
              link
              name='list layout'
              size='big'
              color={this.props.view === 'list layout' ? 'blue' : 'grey'}
              onClick={() => this.props.toggleView('list layout')}
            />
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
    view: state.settings.view,
    sort: state.settings.sort
  }
}

export default connect(mapStateToProps, { toggleView, toggleSort })(FilterBar);