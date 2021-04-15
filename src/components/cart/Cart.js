
import { useEffect, useState } from "react";
import { Grid, Image, Button } from "semantic-ui-react";
import { useShopify } from "../../hooks";
import Quantity from "./Quantity";


const Cart = () => {
    const [items, setItems] = useState(null)
    const { checkoutState, removeLineItem, updateQuantity } = useShopify();

    useEffect(() => {
        setItems(checkoutState.lineItems);
    })

    const handleUpdateQuantity = (itemId, quantity) => {
        console.log('updated');
        updateQuantity(itemId, quantity, checkoutState.id)
    }

    return (
        <Grid columns={6} divided='vertically'>
            <Grid.Row textAlign='center'>
                <Grid.Column>Image</Grid.Column>
                <Grid.Column>Product</Grid.Column>
                <Grid.Column>Price</Grid.Column>
                <Grid.Column>Ammount</Grid.Column>
                <Grid.Column>Total</Grid.Column>
                <Grid.Column>Remove</Grid.Column>
            </Grid.Row>
            {items && items.map((item) => {
                return (
                    <Grid.Row key={item.id} textAlign='center' verticalAlign='middle'>
                        <Grid.Column as={Image} src={item.variant.image.src} size='tiny' />
                        <Grid.Column>{item.title}</Grid.Column>
                        <Grid.Column>{item.variant.price}</Grid.Column>
                        <Grid.Column>
                            <Quantity item={item} handleUpdateQuantity={handleUpdateQuantity} />
                        </Grid.Column>
                        <Grid.Column>{item.variant.price * item.quantity}</Grid.Column>
                        <Grid.Column>
                            <Button compact size='tiny' icon='close' color='red' content='remove' onClick={() => removeLineItem(checkoutState.id, item.id)} />
                        </Grid.Column>
                    </Grid.Row>
                )
            })}
        </Grid>
    );
}

export default Cart;