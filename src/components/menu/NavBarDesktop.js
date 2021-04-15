import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Icon, Input, Image, Menu, Label } from "semantic-ui-react"

import { toggleMobileNav } from '../../redux/actions/index'
import { useShopify } from "../../hooks";
import CartPopup from '../cart/CartPopup';

const NavBarDesktop = (props) => {
    const dispatch = useDispatch();
    const { cartStatus, checkoutState, setCount } = useShopify();
    const { leftItems } = props;
    const [activeItem, setActiveItem] = useState(null);

    const cartCount = useSelector(state => state.shopifyState.cartCount)
    const mobileNav = useSelector(state => state.settings.mobileNav)

    const handleItemClick = (e, { name }) => setActiveItem(name)

    useEffect(() => {
        function getCount() {
            let lineItems =
                checkoutState.lineItems && checkoutState.lineItems.length > 0
                    ? checkoutState.lineItems
                    : []
            let count = 0
            lineItems.forEach((item) => {
                count += item.quantity
                return count
            })

            setCount(count)
        }

        getCount()
    }, [cartStatus, checkoutState])


    const openCheckout = (e) => {
        e.preventDefault()
        // window.open(checkoutState.webUrl) // opens checkout in a new window
        window.location.replace(checkoutState.webUrl) // opens checkout in same window
    }

    return (
        <Menu className="desktop-nav" secondary>
            <Container className="navbar">
                <Menu.Item>
                    <Image src='/images/logo.jpg' size='tiny' />
                </Menu.Item>
                <Menu.Item>
                    <button className={mobileNav ? "hamburger--active" : "hamburger"} color='white' onClick={() => dispatch(toggleMobileNav())}>
                        <span className="hamburger__box">
                            <span className="hamburger__inner"></span>
                        </span>
                    </button>
                </Menu.Item>
                {leftItems.map((item) => {
                    return (
                        <Menu.Item
                            as={item.as}
                            to={item.to}
                            name={item.key}
                            key={item.key}
                            active={activeItem === item.key}
                            onClick={handleItemClick}
                        />)
                })}
                <Menu.Menu position='right'>
                    <Menu.Item>
                        <Input icon='search' placeholder='Search..' />
                    </Menu.Item>
                    <Menu.Item>
                        <Icon name='user' size='big' />
                    </Menu.Item>
                    <Menu.Item>
                        {cartCount > 0 ? <Label circular size='mini' className="shopingCartLabel" color='red'>{cartCount}</Label> : null}
                        <CartPopup cartCount={cartCount} checkoutState={checkoutState} onCheckout={openCheckout}/>
                    </Menu.Item>
                </Menu.Menu>
            </Container>
        </Menu>
    );
}

export default NavBarDesktop;
