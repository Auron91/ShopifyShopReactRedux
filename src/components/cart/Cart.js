import { useEffect, useState } from "react";
import { Grid, Image, Button, Container } from "semantic-ui-react";
import { Link } from 'react-router-dom';
import { useShopify } from "../../hooks";
import Quantity from "./Quantity";


const Cart = () => {
    const [items, setItems] = useState(null)
    const { checkoutState, removeLineItem, updateQuantity } = useShopify();

    useEffect(() => {
        setItems(checkoutState.lineItems);
    }, [checkoutState, items])

    const handleUpdateQuantity = (itemId, quantity) => {
        updateQuantity(itemId, quantity, checkoutState.id)
    }

    const openCheckout = (e) => {
        e.preventDefault()
        window.open(checkoutState.webUrl) // opens checkout in a new window
        // window.location.replace(checkoutState.webUrl) // opens checkout in same window
    }

    return (
        <Container>
            <Grid columns={6} divided='vertically' >
                <Grid.Row textAlign='center'>
                <Grid.Column>Product</Grid.Column>
                <Grid.Column>Price</Grid.Column>
                <Grid.Column>Ammount</Grid.Column>
                <Grid.Column>Total</Grid.Column>
                <Grid.Column>Remove</Grid.Column>
            </Grid.Row>
                {items && items.map((item) => {
                    return (
                        <Grid.Row key={item.id} textAlign='center' verticalAlign='middle'>
                            <Grid.Column mobile={8} largeScreen={4}>
                                <Image as={Link} to={`/shop/${item.variant.product.id}`} src={item.variant.image.src} />
                            </Grid.Column>
                            <Grid.Column as={Link} to={`/shop/${item.variant.product.id}`} mobile={8} largeScreen={4} >{item.title}</Grid.Column>
                            <Grid.Column mobile={8} largeScreen={2}>{item.variant.price}$</Grid.Column>
                            <Grid.Column mobile={8} largeScreen={2}>
                                <Quantity item={item} handleUpdateQuantity={handleUpdateQuantity} />
                            </Grid.Column>
                            <Grid.Column mobile={8} largeScreen={2}>{"Total: " + item.variant.price * item.quantity + "$"}</Grid.Column>
                            <Grid.Column mobile={8} largeScreen={2}>
                                <Button compact size='tiny' icon='close' color='red' content='remove' onClick={() => removeLineItem(checkoutState.id, item.id)} />
                            </Grid.Column>
                        </Grid.Row>
                    )
                })}
                <Grid.Row textAlign='center' verticalAlign='middle'>
                    <Grid.Column></Grid.Column>
                    <Grid.Column></Grid.Column>
                    <Grid.Column></Grid.Column>
                    <Grid.Column></Grid.Column>
                    <Grid.Column as='h3' mobile={8}>{`Total: ${checkoutState.paymentDue}`}</Grid.Column>
                    <Grid.Column mobile={8}>
                        {checkoutState.requiresShipping && <Button color='red' onClick={(e) => openCheckout(e)}>Checkout</Button>}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    );
}

export default Cart;