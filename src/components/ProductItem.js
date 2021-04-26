import React, { useEffect, useState } from 'react';
import { Button, Grid, Header, Icon, Popup } from 'semantic-ui-react';
import SkeletonProductItem from './skeletons/SkeletonProductItem'
import { useShopify } from '../hooks';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import _ from 'lodash';
import '../App.scss'

const ProductItem = (props) => {
    const { fetchProduct, addVariant, checkoutState } = useShopify();
    const [product, setProduct] = useState([]);
    const [size, setSize] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        fetchProduct(props.match.params.id).then((response) => {
            setProduct(response);
        });
        return () => setProduct([])
    }, [props.match.params.id])

    const toggleSize = (e) => {
        setSize(e.target.value)
    }
    const decrementQuantity = () => {
        if (quantity === 1) {
            setQuantity(1)
        } else {
            setQuantity(quantity - 1)
        }
    }
    const incrementQuantity = () => {
        setQuantity(quantity + 1)
    }

    const handleSubmit = (e, size, quantity) => {

        e.preventDefault();
        if(size) {
            const itemsToAdd = [
                { variantId: size, quantity: quantity }
            ]
            const checkoutId = checkoutState.id
            addVariant(checkoutId, itemsToAdd);
        }
    }

    if (_.isEmpty(product)) {
        return <SkeletonProductItem />
    } else {
        return (
            <Grid container columns={2} doubling stackable padded>
                <Grid.Row>
                    <Grid.Column width={8}>
                        <Carousel>
                            {product && product.images.map(image => {
                                return (
                                    <div key={image.id}>
                                        <img src={image.src} alt="" />
                                    </div>
                                )
                            })}
                        </Carousel>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Grid.Row>
                            <Header as="h1">{product.title}</Header>
                        </Grid.Row>
                        <Grid.Row>
                            <Header as="h1">
                                {product.variants[0].price} $
                        </Header>
                        </Grid.Row>
                        <form onSubmit={(e) => handleSubmit(e, size, quantity)}>
                            <Grid.Row>
                                <p> Size: Select Size</p>
                                <div className="product-variants">
                                    {product.variants.map((variant) => {
                                        return (
                                            <label
                                                key={variant.id}
                                                name={variant.id}
                                                className={size === variant.id ? "product-variants__label on" : variant.available ? "product-variants__label" : "product-variants__label disabled"}
                                            >
                                                <input
                                                    onClick={toggleSize}
                                                    disabled = {!variant.available}
                                                    type="radio" className="products-variant__radio"
                                                    name='variant'
                                                    value={variant.id}
                                                />
                                                {variant.selectedOptions[0].value}
                                            </label>
                                        )
                                    })}
                                </div>
                            </Grid.Row>
                            <Grid.Row>
                                <p>Quantity: select quantity</p>
                                <Grid.Column>
                                    <div className="product-quantity">
                                        <label
                                            className="product-quantity__item"
                                            onClick={decrementQuantity}
                                        >-</label>
                                        <output className="product-quantity__item" value={quantity}>{quantity}</output>
                                        <label
                                            className="product-quantity__item"
                                            onClick={incrementQuantity}
                                        >+</label>
                                    </div>
                                </Grid.Column>
                                <Grid.Column>
                                    <p></p>
                                    <Popup
                                    disabled = {size !== null? true : false }
                                    style={{backgroundColor: 'yellow'}} trigger={
                                        <Button
                                            color='red'
                                            style={{ paddingLeft: '1rem' }}
                                        >
                                            Add to the cart
                                <Icon name='shopping cart' style={{ paddingLeft: '1rem' }} />
                                        </Button>
                                    }>
                                    <Popup.Content>Select size</Popup.Content>
                                    </Popup>
                                </Grid.Column>
                            </Grid.Row >
                        </form>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row className='product__data'>
                    <Grid.Column width={8}>
                        {product.description}
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <p>Share:
                            <Icon circular link name='twitter' inverted size='small' style={{ marginLeft: '1rem' }} />
                            <Icon circular link name='facebook f' inverted size='small' />
                            <Icon circular link name='mail' inverted size='small' />
                        </p>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}
export default ProductItem;