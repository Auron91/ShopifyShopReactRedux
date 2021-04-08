import React, { Component } from 'react';
import { Grid, Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchProduct } from '../redux/actions';

class ProductItem extends Component {
    componentDidMount() {
        console.log(this.props.match.params.id);
        this.props.fetchProduct(this.props.match.params.id)
        console.log(this.props.product)
    }

    render() {
        if(!this.props.product) {
            return <div className="">Loading ...</div>
        }
        return (
            <Container>
                <Grid>
                    <Grid.Column width={8}>
                    Item
                    </Grid.Column>
                </Grid>
            </Container>
        );
    }
}

const mapStateToProps = ((state, ownProps) => {
    return { product: state.shopifyState.products[ownProps.match.params.id]};
})
export default connect(mapStateToProps, { fetchProduct })(ProductItem);