import { Image, Header, Grid, Button } from 'semantic-ui-react'
import { useShopify } from '../../hooks'
import { Link } from 'react-router-dom'

const CartPopupItem = ({ item }) => {
    const { checkoutState, removeLineItem } = useShopify();

    return (
        <>
            <Grid.Row as={Link} to={`/shop/${item.variant.product.id}`}>
                <Grid.Column>
                    <Header as='h4'>{item.title}</Header>
                    <div>{`${item.quantity} x  ${item.variant.price}`}</div>
                    <div>{`size: ${item.variant.title}`}</div>
                </Grid.Column>
                <Grid.Column >
                    <Image size='tiny' src={item.variant.image.src} />
                    <Button compact size='tiny' icon='close' color='red' content='remove' onClick={() => removeLineItem(checkoutState.id, item.id)} />
                </Grid.Column>
            </Grid.Row>
        </>
    );
}

export default CartPopupItem;