import { Container, Menu, Sidebar, Image, Label, Icon, Button } from "semantic-ui-react";
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toggleMobileNav } from '../../redux/actions/index'

const MobileNav = (props) => {
    const { leftItems } = props;
    const visible = useSelector(state => state.settings.mobileNav)
    const dispatch = useDispatch();

    return (
        <>
            <Menu className="mobile-nav" secondary>
                <Container className="navbar">
                    <Menu.Item as={Link} to='/' >
                        <Image src='/images/logo.jpg' size='tiny' />
                    </Menu.Item>
                    <Menu.Item>
                        <button className={visible ? "hamburger--active" : "hamburger"} color='white' onClick={() => dispatch(toggleMobileNav())}>
                            <span className="hamburger__box">
                                <span className="hamburger__inner"></span>
                            </span>
                        </button>
                    </Menu.Item>
                    <Menu.Menu position='right'>
                        <Menu.Item as={Button} icon='search' size='huge' />
                        <Menu.Item as={Button} icon='user' size='huge' />
                        <Menu.Item as={Button}>
                            <Label className="shopingCartLabel" color='red'>2</Label>
                            <Icon size='big' name='shopping cart' />
                        </Menu.Item>
                    </Menu.Menu>
                </Container>
            </Menu>
            <Sidebar
                as={Menu}
                animation='overlay'
                direction='right'
                visible={visible}
                vertical
                size='large'
                className="mobile-nav__sidebar"
            >
                <Menu>
                    <Menu.Item>
                        <Image src='/images/logo.jpg' size='tiny' />
                    </Menu.Item>
                    <Menu.Item>
                        <Label className="shopingCartLabel" color='red'>2</Label>
                        <Icon size='big' name='shopping cart' style={{margin: '0.5rem'}}/>
                    </Menu.Item>
                </Menu>
                {leftItems.map((item) => {
                    return (
                        <Menu.Item
                            as={item.as}
                            to={item.to}
                            name={item.key}
                            key={item.key}
                        />)
                })}
            </Sidebar>
        </>
    );
}

export default MobileNav;