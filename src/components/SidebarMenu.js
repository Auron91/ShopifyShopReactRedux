import React, { useEffect, useState } from "react";
import { Divider, Header, List, Segment } from "semantic-ui-react";
import { useShopify } from '../hooks'
import { useDispatch } from 'react-redux'

const readSizes = (products) => {
  let sizes = []

  // reading all available sizes of all products
  sizes = products.map((product) => {
    return product.variants.map(variant => {
      return variant.available ? variant.selectedOptions[0].value : null
    })
  }).flat();

  // delecte duplicates, nulls, sort
  sizes = sizes.filter((a, index, arr) => {
    return arr.indexOf(a) === index && a !== null
  }).sort((a, b) => {
    return a - b
  })
  return sizes
}

const Sidebar = () => {
  const { featured, handleSizeFilter } = useShopify()
  const dispatch = useDispatch()
  const [sizes, setSizes] = useState([])
  const [filterSizes, setFilterSizes] = useState([])
  const [colors, setColors] = useState([])

  // dynamic filter
  useEffect(() => {
    setSizes(readSizes(featured));
    setFilterSizes([])
  }, [featured])

  useEffect(() => {
    dispatch(handleSizeFilter(featured, filterSizes))

  },[filterSizes])

  const handleSizeClick = (e) => {
    if (e.target.checked) {
      setFilterSizes([...filterSizes, e.target.value])
    } else {
      setFilterSizes(filterSizes.filter(size => size !== e.target.value))
    }
  }

  return (
    <Segment>
      <Header as='h2'>Filter</Header>
      <List>
        <List.Item>Men</List.Item>
        <List.Item>Women</List.Item>
        <Divider />
        <List.Item>
          <Header as='h2' style={{marginBottom: '1rem'}}>Filter Sizes:</Header>
          <div className="product-variants">
            {sizes.map((item, i) => {
              return (
                <label
                  key={i}
                  name={item}
                  className={filterSizes.includes(item) ? "product-variants__label on" : "product-variants__label"}
                >
                  <input
                    onClick={(e) => handleSizeClick(e)}
                    type="checkbox" className="products-variant__radio"
                    name='variant'
                    value={item}
                  />
                  {item}
                </label>
              )
            })}
          </div>
        </List.Item>
      </List>
    </Segment>
  );
}

export default Sidebar;


