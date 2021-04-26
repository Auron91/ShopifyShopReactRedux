import { Container, Menu, Image, Label, Icon, Button } from "semantic-ui-react";
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Hamburger from './Hamburger'

const MobileNav = (props) => {
    const { leftItems } = props;

    const cartCount = useSelector(state => state.shopifyState.cartCount)
    return (
        <>
            <Hamburger leftItems={leftItems} />
            <Menu className="mobile-nav" secondary>
                <Container className="navbar">
                    <Menu.Item as={Link} to='/' >
                        <Image src='/images/logo.jpg' size='tiny' />
                    </Menu.Item>
                    <Menu.Menu position='right'>
                        <Menu.Item as={Button} icon='search' size='huge' />
                        <Menu.Item as={Button} icon='user' size='huge' />
                        <Menu.Item as={Link} to='/cart'>
                            <Label className="shopingCartLabel" color='red'>{cartCount}</Label>
                            <Icon size='big' name='shopping cart' />
                        </Menu.Item>
                    </Menu.Menu>
                </Container>
            </Menu>
        </>
    );
}

export default MobileNav;