import { Container, Icon, Input, Image, Menu, Label } from "semantic-ui-react"
    ;
    import { useState } from 'react'
    import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { toggleMobileNav } from '../../redux/actions/index'

const NavBarDesktop = (props) => {
    const { leftItems } = props;
    const dispatch = useDispatch();
    const [activeItem, setActiveItem] = useState(null)

    const mobileNav = useSelector(state => state.settings.mobileNav)

    const handleItemClick = (e, { name }) => setActiveItem(name)

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
                            active= {activeItem === item.key}
                            onClick={handleItemClick}
                        />)
                })}
                <Menu.Menu position='right'>
                    <Menu.Item>
                        <Input icon='search' placeholder='Search..' />
                    </Menu.Item>
                    <Menu.Item>
                        <Label className="shopingCartLabel" color='red'>2</Label>
                        <Icon size='big' name='shopping cart' />
                569.98 $
              </Menu.Item>
                </Menu.Menu>
            </Container>
        </Menu>
    );
}

export default NavBarDesktop;
