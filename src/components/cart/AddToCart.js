import { useState } from 'react'
import { useShopify } from '../../hooks'
import { Button, Grid, Icon, Popup } from 'semantic-ui-react';

const AddToCart = (props) => {
    const { addVariant, checkoutState } = useShopify();
    // const quanitySelector = props.quanitySelector;
    const product = props.product;
    // console.log(props.product);
    const [size, setSize] = useState(null);

    const toggleSize = (e) => {
        setSize(e.target.value)
    }

    const handleSubmit = (e, size) => {
        e.preventDefault();
        if (size) {
            const itemsToAdd = [
                { variantId: size, quantity: 1 }
            ]
            const checkoutId = checkoutState.id
            addVariant(checkoutId, itemsToAdd);
        }
    }

    return (
        <form onSubmit={(e) => handleSubmit(e, size)}>
            <Grid.Row>
                <div className="product-variants">
                    {product.variants.map((variant) => {
                        return (
                            <label
                                key={variant.id}
                                name={variant.id}
                                className={size === variant.id ? "product-variants__label on" : "product-variants__label"}
                            >
                                <input
                                    onClick={toggleSize}
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
                <Grid.Column>
                    <Popup
                        disabled={size !== null ? true : false}
                        style={{ backgroundColor: 'yellow' }} trigger={
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
    );
}

export default AddToCart;