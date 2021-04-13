import React, { useEffect } from "react";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import FilterBar from './FilterBar';
import { Card, Image, Grid, Label, Item, Button, Icon } from "semantic-ui-react";
import { useShopify } from '../hooks'

const filterOptions = [
  // {
  //   key: "Most Popular",
  //   text: "Most Popular",
  //   value: "Most Popular",
  // },
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

const sortProducts = (data, sortDirection) => {
  var result = []
  if (sortDirection === 'Most Popular') {
    result = data.sort(( a, b ) => {
      return b.sold - a.sold
    })
  } else if (sortDirection === 'New Arrivals') {
    result = data.sort(( a, b) => {
      return (a.productType===null)-(b.productType===null) || -(a.productType>b.productType);
    })
  } else if (sortDirection === 'Price (Low-High)') {
    result = data.sort(( a, b) => {
      return a.variants[0].price - b.variants[0].price
    })
  } else if (sortDirection === 'Price (High-Low)') {
    result = data.sort(( a, b) => {
      return b.variants[0].price - a.variants[0].price
    })
  } else return data;
  return result;
}

const ProductGrid = (props) => {
  const { fetchProducts, products } = useShopify();
  const sort = useSelector( state => state.settings.sort )
  const view = useSelector( state => state.settings.view )

  let sortedProducts = sortProducts(products, sort)

  useEffect(() => {
    fetchProducts();
    console.log('render');
  }, [])

  const renderGrid =
    (<Grid columns={3} stackable doubling>
      {sortedProducts.map(product => {
        return (
          <Grid.Column key={product.id}>
            <Card as={Link} to={`/shop/${product.id}`} className="card" fluid>
              <Card.Content>
                {product.productType && <Label color="black" className="newBadge">NEW</Label>}
                <Image src={product.images[0].src} centered />
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
        sortedProducts.map(product => {
          return (
            <Item as={Link} to={`/shop/${product.id}`} key={product.id} >
              <Item.Image size='medium' src={product.images[0].src} />
              <Item.Content>
                <Item.Header>{product.title}</Item.Header>
                <Item.Description>{product.description}</Item.Description>
                <Item.Header color='red'><p>{product.variants[0].price} $ </p></Item.Header>
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
      { !products ? <h2>Loading...</h2> : null }
      {view === 'grid layout' && products ? renderGrid : renderItems}
    </div>
  );
}

export default ProductGrid