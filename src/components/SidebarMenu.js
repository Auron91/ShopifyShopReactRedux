import React, { useEffect, useState } from "react";
import { Header, List, Segment } from "semantic-ui-react";
import { useShopify } from '../hooks'

const Sidebar = () => {
  const { featured } = useShopify()
  const [sizes, setSizes] = useState([])
  const [colors, setColors] = useState([])

  const readSizes = (products) => {
    let sizes = []
    // products.forEach(product => {
     sizes = products[0].variants.map(variant => {
        return variant.available ?  variant.selectedOptions[0].value : null
      })
    // })
    return sizes
  }

  useEffect(()=>{
     setSizes(readSizes(featured));
  },[])
  console.log(sizes);

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

export default Sidebar;


