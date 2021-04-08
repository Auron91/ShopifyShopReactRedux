import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { Card, Image, Grid, Label, Item, Button, Icon } from "semantic-ui-react";
import { Link } from 'react-router-dom';
import FilterBar from './FilterBar';
// import { fetchProducts } from '../redux/reducers/shopifyReducer';
// import { getProducts } from ''
import { useShopify } from '../hooks'
import _ from "lodash";

const filterOptions = [
  {
    key: "Most Popular",
    text: "Most Popular",
    value: "Most Popular",
  },
  {
    key: "New Arrivals",
    text: "New Arrivals",
    value: "New Arrivals",
  },
  {
    key: "Price (Low-High)",
    text: "Price (Low-High)",
    value: "Price (Low-High)",
  },
  {
    key: "Price (High-Low)",
    text: "Price (High-Low)",
    value: "Price (High-Low)",
  },
];


const ProductGrid = (props) => {
  const { fetchProducts } = useShopify();

  useEffect(() => {
    fetchProducts();
    // this.props.getProducts();
    console.log(props.products);
  }, [])

  const renderGrid =
    (<Grid columns={3} stackable>
      {props.products.map(product => {
        return (
          <Grid.Column key={product.id}>
            <Card as={Link} to={`/shop/${product.id}`} className="card">
              <Card.Content>
                {product.isNew && <Label color="black" className="newBadge">NEW</Label>}
                <Image src={product.images[0].src} />
                <Card.Header floated='left'>{product.title}</Card.Header>
                <Card.Meta textAlign='right'>{product.variants[0].price}$</Card.Meta>
              </Card.Content>
            </Card>
          </Grid.Column>
        )
      })
      }
    </Grid >)

  const renderItems =
    (<Item.Group divided>
      {
        props.products.map(product => {
          return (
            <Item key={product.id}>
              <Item.Image size='medium' src={product.images[0].src} />
              <Item.Content>
                <Item.Header>{product.title}</Item.Header>
                <Item.Description>{product.description}</Item.Description>
                <Item.Header color='red'>{product.variants[0].price} $</Item.Header>
                <Item.Extra>
                  <Button primary floated='right'>
                    Add to cart
                    <Icon name='right chevron' />
                  </Button>
                </Item.Extra>
              </Item.Content>
            </Item>
          )
        })
      }
    </Item.Group>)




  return (
    <div className="">
      <FilterBar options={filterOptions} />
      {props.view === 'grid layout' && props.products ? renderGrid : renderItems}
    </div>
  );
}


const mapStateToProps = (state) => {
  return {
    products: state.shopifyState.products,
    view: state.settings.view,
    sort: state.settings.sort
  };
}

export default connect(mapStateToProps, {  })(ProductGrid)