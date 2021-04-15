import CartPopupItem from './CartPopupItem'

import { Link } from 'react-router-dom'

import { Icon, Popup, Grid, Button } from "semantic-ui-react"

const CartPopup = ({cartCount, checkoutState, onCheckout}) => {

    return (
        <Popup hoverable trigger={
            <div>
                <Icon size='big' name='shopping cart' />
                {checkoutState.paymentDue} $
            </div>

        }>
            <Popup.Content as={Grid} centered divided='vertically' columns={2} size='large' wide='verty' relaxed style={{ width: '20rem' }}>
                <Grid.Row>
                    <Grid.Column textAlign='center'>
                        {cartCount} products
                </Grid.Column>
                    <Grid.Column textAlign='center'>
                        <Link to='/cart'>Show Cart</Link>
                    </Grid.Column>
                </Grid.Row>
                {cartCount > 0 ? (checkoutState.lineItems && checkoutState.lineItems.map((item) => <CartPopupItem item={item} key={item.id} />)) : <p>Nothing in Cart</p>}
                <Grid.Row>
                    <Grid.Column>Total ammount:</Grid.Column>
                    <Grid.Column>{checkoutState.paymentDue} $</Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Button color='red' onClick={(e) => onCheckout(e)}>Checkout</Button>
                </Grid.Row>
            </Popup.Content>
        </Popup>
    );
}

export default CartPopup;