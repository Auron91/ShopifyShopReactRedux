import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import FilterBar from './FilterBar';
import AddToCart from './cart/AddToCart';
import { Card, Image, Grid, Label, Item } from "semantic-ui-react";
import { useShopify } from '../hooks'
import SkeletonGrid from "./skeletons/SkeletonGrid";

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
    result = data.sort((a, b) => {
      return b.sold - a.sold
    })
  } else if (sortDirection === 'New Arrivals') {
    result = data.sort((a, b) => {
      return (a.productType === null) - (b.productType === null) || -(a.productType > b.productType);
    })
  } else if (sortDirection === 'Price (Low-High)') {
    result = data.sort((a, b) => {
      return a.variants[0].price - b.variants[0].price
    })
  } else if (sortDirection === 'Price (High-Low)') {
    result = data.sort((a, b) => {
      return b.variants[0].price - a.variants[0].price
    })
  } else return data;
  return result;
}

// const filterProducts = (products, filterKey, filterValue) => {
//   let resp = products.filter(product => {
//     return product.metafields.filter(metafield => metafield.key === filterKey)[0].value === filterValue;
//   })
//   return resp;
// }

const ProductGrid = (props) => {
  const { collections, fetchCollections, featured, fetchCollection } = useShopify();
  const sort = useSelector(state => state.settings.sort)
  const view = useSelector(state => state.settings.view)

  useEffect(() => {
    fetchCollection(props.collection)
    // fetchCollections()
  }, [props.collection])

  // let products = collections.filter(collection => collection.id === props.collection)[0].products
  let sortedProducts = sortProducts(featured, sort)

  const skeletonArray = [1,2,3,4,5,6]
  const skeleton = (
    <Grid columns={3}>
      {skeletonArray.map((n) => <SkeletonGrid key={n} theme='light'/>)}
    </Grid>
  )

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
    (<Item.Group divided >
      {
        sortedProducts.map(product => {
          return (
            <Item key={product.id} stackable>
              <Item.Image as={Link} to={`/shop/${product.id}`} size='medium' src={product.images[0].src} />
              <Item.Content>
                <Item.Header as={Link} to={`/shop/${product.id}`}>{product.title}</Item.Header>
                <Item.Description>{product.description}</Item.Description>
                <Item.Header color='red'><p>{product.variants[0].price} $ </p></Item.Header>
                <Item.Description>
                  <AddToCart product={product} />
                </Item.Description>
              </Item.Content>
            </Item>
          )
        })
      }
    </Item.Group>)

  return (
    <div className="">
      <FilterBar options={filterOptions} />
      {!featured[0] ?  skeleton : null}

      {view === 'grid layout' && featured ? renderGrid : renderItems}
    </div>
  );
}

export default ProductGrid