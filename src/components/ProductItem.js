import React, { useEffect, useState } from 'react';
import { Button, Grid, Header, Icon } from 'semantic-ui-react';
import { useShopify } from '../hooks';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import _ from 'lodash';
import '../App.scss'

const ProductItem = (props) => {
    const { fetchProduct } = useShopify();
    const [product, setProduct] = useState([]);
    const [active, setActive] = useState();
    const [quanity, setQuanity] = useState(1);

    useEffect(() => {
        fetchProduct(props.match.params.id).then((response) => {
            setProduct(response);
        });
        console.log('render');
    }, [])

    const toggleActive = (e) => {
        setActive(e.target.value)
    }
    const decrementQuanity = () => {
        if (quanity === 1) {
            setQuanity(1)
        } else {
            setQuanity(quanity - 1)
        }
    }
    const incrementQuanity = () => {
        setQuanity(quanity + 1)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e);
    }

    if (_.isEmpty(product)) {
        return <div className="">Loading...</div>
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
                        <form onSubmit={handleSubmit}>
                            <Grid.Row>
                                <p> Size: Select Size</p>
                                <div className="product-variants">
                                    {product.variants.map((variant) => {
                                        return (
                                            <label
                                                key={variant.id}
                                                name={variant.id}
                                                className={active === variant.id ? "product-variants__label on" : "product-variants__label"}
                                            >
                                                <input
                                                    onClick={toggleActive}
                                                    type="radio" className="products-variant__radio"
                                                    name='variant'
                                                    value={variant.id}
                                                />
                                                {variant.title}
                                            </label>
                                        )
                                    })}
                                </div>
                            </Grid.Row>
                            <Grid.Row>
                                <p>Quanity: select quanity</p>
                                <Grid.Column>
                                    <div className="product-quanity">
                                        <label
                                            className="product-quanity__item"
                                            onClick={decrementQuanity}
                                        >-</label>
                                        <output className="product-quanity__item" value={quanity}>{quanity}</output>
                                        <label
                                            className="product-quanity__item"
                                            onClick={incrementQuanity}
                                        >+</label>
                                    </div>
                                </Grid.Column>
                                <Grid.Column>
                                    <p></p>
                                    <Button color='red' style={{ paddingLeft: '1rem' }}>
                                        Add to the cart
                                <Icon name='shopping cart' style={{ paddingLeft: '1rem' }} />
                                    </Button>
                                </Grid.Column>
                            </Grid.Row >
                        </form>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row className='product__data'>
                    <Grid.Column width={8}>
                        {product.description}
                    </Grid.Column>
                    <Grid.Column width={8}></Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}
export default ProductItem;