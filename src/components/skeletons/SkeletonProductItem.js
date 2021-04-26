import SkeletonElement from './SkeletonElement'
import { Button, Grid, Header, Icon, Popup, } from 'semantic-ui-react';
import Shimmer from './Shimmer'

const SkeletonProductItem = ({ theme }) => {
    // const themeClass = theme || 'light'

    return (
        <Grid container columns={2} doubling stackable padded>
            <Grid.Row>
                <Grid.Column width={8}>
                    <Grid.Row>
                        <SkeletonElement type='carouselPhoto' />
                    </Grid.Row>
                    <Grid.Row>
                        <SkeletonElement type='carouselLabel' />
                        <SkeletonElement type='carouselLabel' />
                        <SkeletonElement type='carouselLabel' />
                        <SkeletonElement type='carouselLabel' />
                    </Grid.Row>
                </Grid.Column>
                <Grid.Column width={8}>
                    <Grid.Row>
                        <SkeletonElement type='title' />
                    </Grid.Row>
                    <Grid.Row>
                        <Header as="h1">
                            <SkeletonElement type='itemPrice' /> $
                        </Header>
                    </Grid.Row>
                    <form >
                        <Grid.Row>
                            <p> Size: Select Size</p>
                            <SkeletonElement type='label' />
                            <SkeletonElement type='label' />
                            <SkeletonElement type='label' />
                            <SkeletonElement type='label' />
                            <SkeletonElement type='label' />
                            <SkeletonElement type='label' />
                        </Grid.Row>
                        <Grid.Row>
                            <p>Quantity: select quantity</p>
                            <Grid.Column>
                                <div className="product-quantity">
                                    <label
                                        className="product-quantity__item"
                                    // onClick={decrementQuantity}
                                    >-</label>
                                    <output className="product-quantity__item" value='1'>1</output>
                                    <label
                                        className="product-quantity__item"
                                    // onClick={incrementQuantity}
                                    >+</label>
                                </div>
                            </Grid.Column>
                            <Grid.Column>
                                <p></p>
                                <Popup
                                    // disabled={size !== null ? true : false}
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
                </Grid.Column>
            </Grid.Row>
            <Grid.Row className='product__data'>
                <Grid.Column width={8}>
                    <SkeletonElement type='text' />
                    <SkeletonElement type='text' />
                    <SkeletonElement type='text' />
                    <SkeletonElement type='text' />
                    <SkeletonElement type='text' />
                    <SkeletonElement type='text' />
                </Grid.Column>
                <Grid.Column width={8}>
                    <p>Share:
                            <Icon circular link name='twitter' inverted size='small' style={{ marginLeft: '1rem' }} />
                        <Icon circular link name='facebook f' inverted size='small' />
                        <Icon circular link name='mail' inverted size='small' />
                    </p>
                </Grid.Column>
            </Grid.Row>
            <Shimmer />
        </Grid>
    );
}

export default SkeletonProductItem;